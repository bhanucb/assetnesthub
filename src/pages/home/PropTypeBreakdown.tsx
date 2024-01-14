import { FC, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { getRealEstateData, PropertyData } from "../../api/RealEstateData";
import { formatCurrency } from "../../utils/Misc";
import useMobile from "../../hooks/UseMobile";

const StyledGridContainer = styled(Box)`
  width: 100%;
`;

const PropTypeBreakdown: FC = () => {
  const [data, setData] = useState<PropertyData[]>([]);
  const { isMobile } = useMobile();

  useEffect(() => {
    getRealEstateData()
      .then((data) => {
        // const sortedData = data.sort((a, b) =>
        //   a.dealName.localeCompare(b.dealName)
        // );
        setData(data);
      })
      .catch((e) => console.error(e));
  }, []);

  function formatCurrencyInGrid(
    params: GridValueGetterParams<PropertyData, number>
  ) {
    return params.value && formatCurrency(params.value);
  }

  const columns: GridColDef[] = [
    {
      field: "propertyType",
      headerName: "Prop. Type",
      flex: 1,
      minWidth: isMobile ? 150 : undefined,
    },
    {
      field: "minAmount",
      headerName: "Min Amt",
      type: "number",
      flex: 1,
      minWidth: isMobile ? 150 : undefined,
      valueGetter: formatCurrencyInGrid,
    },
    {
      field: "currentInvested",
      headerName: "Current Inv.",
      type: "number",
      flex: 1,
      minWidth: isMobile ? 150 : undefined,
      valueGetter: formatCurrencyInGrid,
    },
    {
      field: "totalAllocated",
      headerName: "Total Alloc.",
      type: "number",
      flex: 1,
      minWidth: isMobile ? 150 : undefined,
      valueGetter: formatCurrencyInGrid,
    },
    {
      field: "maxAmount",
      headerName: "Max Amt",
      type: "number",
      flex: 1,
      minWidth: isMobile ? 150 : undefined,
      valueGetter: formatCurrencyInGrid,
    },
  ];

  return (
    <StyledGridContainer>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(data) => (data as PropertyData).propertyId}
        hideFooter
      />
    </StyledGridContainer>
  );
};

export default PropTypeBreakdown;
