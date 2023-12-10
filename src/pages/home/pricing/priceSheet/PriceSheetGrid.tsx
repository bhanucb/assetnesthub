import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ColDef,
  ColumnApi,
  ColumnRowGroupChangedEvent,
  FirstDataRenderedEvent,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
} from "ag-grid-community";
import { portfolioOverviewColDefs } from "./columnDefinitions/PortfolioOverviewColDefs";
import { transactionHistoryColDefs } from "./columnDefinitions/TransactionHistoryColDefs";
import { usePricingData } from "../../UsePricingData";
import AppSnackbar, { useSnackbar } from "../../../../components/AppSnackbar";
import { useAppSelector } from "../../../../state/Store";
import { resizeColumns } from "../../../../utils/Grid";
import AppGrid from "../../../../components/AppGrid";
import Box from "@mui/material/Box";
import DisplaySelector from "./DisplaySelector";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import RecentFilters from "./RecentFilters";
import useGridFilter from "./UseGridFilter";

const StyledPricingSheetGrid = styled("div")`
  height: 100%;
  display: flex;
  flex-direction: column;

  .top-bar {
    height: 48px;
    display: flex;
    align-items: center;
  }

  .grid {
    flex: 1;
  }

  .option {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 8px;

    .label {
      padding-right: 8px;
    }
  }
`;

const PriceSheetGrid: FC = () => {
  const { open, message, duration, severity, closeMessage } = useSnackbar();
  const columnApi = useRef<ColumnApi>();
  const gridApi = useRef<GridApi>();
  const { getPricingData } = usePricingData();
  const { display, activeFilter } = useAppSelector(
    (state) => state.pricingSheet
  );
  const [columnDefs] = useState<Array<ColDef>>(portfolioOverviewColDefs);
  const { handleFilterChanged, setFilterInGrid } = useGridFilter({ gridApi });
  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: true,
      enableRowGroup: true,
      filter: "agMultiColumnFilter",
      floatingFilter: true,
      menuTabs: ["generalMenuTab", "filterMenuTab"],
    }),
    []
  );

  const handleGridReady = useCallback((e: GridReadyEvent) => {
    gridApi.current = e.api;
    columnApi.current = e.columnApi;
  }, []);

  const handleFirstDataRendered = useCallback(
    (e: FirstDataRenderedEvent) => {
      resizeColumns(e.columnApi);
      setFilterInGrid(activeFilter);
    },
    [activeFilter, setFilterInGrid]
  );

  const handleGridColumnsChanged = useCallback(() => {
    if (columnApi.current === undefined) return;

    resizeColumns(columnApi.current);
  }, []);

  function handleColumnRowGroupChanged(event: ColumnRowGroupChangedEvent) {
    const { columnApi } = event;

    resizeColumns(columnApi);
  }

  function getRowId(params: GetRowIdParams) {
    return params.data.id;
  }

  useEffect(() => {
    const subscription = getPricingData(
      (snap) => gridApi.current?.setRowData(snap),
      (streamData) => {
        const { add, update } = streamData;
        gridApi.current?.applyTransactionAsync({ add, update });
      }
    );

    return () => subscription?.unsubscribe();
  }, [gridApi, getPricingData]);

  useEffect(() => {
    switch (display) {
      case "pricingSheet":
        gridApi.current?.setColumnDefs(portfolioOverviewColDefs);
        break;
      case "pcMain":
        gridApi.current?.setColumnDefs(transactionHistoryColDefs);
        break;
    }
  }, [display]);

  return (
    <StyledPricingSheetGrid>
      <Box className="top-bar">
        <Box className="option">
          <Typography variant="caption" className="label">
            Display
          </Typography>
          <DisplaySelector />
        </Box>
        <Box className="option">
          <RecentFilters />
        </Box>
      </Box>
      <Box className="grid">
        <AppGrid
          columnHoverHighlight={true}
          rowSelection="multiple"
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          skipHeaderOnAutoSize={true}
          rowGroupPanelShow="always"
          singleClickEdit={true}
          suppressCopyRowsToClipboard={true}
          getRowId={getRowId}
          onGridReady={handleGridReady}
          onFirstDataRendered={handleFirstDataRendered}
          onGridColumnsChanged={handleGridColumnsChanged}
          onColumnRowGroupChanged={handleColumnRowGroupChanged}
          onFilterChanged={handleFilterChanged}
        />
      </Box>
      <AppSnackbar
        open={open}
        message={message}
        duration={duration}
        severity={severity}
        onClose={closeMessage}
      />
    </StyledPricingSheetGrid>
  );
};

export default PriceSheetGrid;
