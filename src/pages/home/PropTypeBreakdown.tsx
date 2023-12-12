import { FC, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { getRealEstateData, PropertyData } from "../../api/RealEstateData";
import { formatCurrency } from "../../utils/Misc";

const StyledGridContainer = styled(Box)`
  width: 100%;
`;

const PropTypeBreakdown: FC = () => {
  const [data, setData] = useState<Array<PropertyData>>([]);

  useEffect(() => {
    getRealEstateData().then((data) => {
      // const sortedData = data.sort((a, b) =>
      //   a.dealName.localeCompare(b.dealName)
      // );
      setData(data);
    });
  }, []);

  const columns: GridColDef[] = [
    { field: "propertyType", headerName: "Property Type", flex: 1 },
    {
      field: "minAmount",
      headerName: "Min Amount",
      type: "number",
      flex: 1,
      valueGetter: (params) => formatCurrency(params.value),
    },
    {
      field: "currentInvested",
      headerName: "Current Invested",
      type: "number",
      flex: 1,
      valueGetter: (params) => formatCurrency(params.value),
    },
    {
      field: "totalAllocated",
      headerName: "Total Allocated",
      type: "number",
      flex: 1,
      valueGetter: (params) => formatCurrency(params.value),
    },
    {
      field: "maxAmount",
      headerName: "Max Amount",
      type: "number",
      flex: 1,
      valueGetter: (params) => formatCurrency(params.value),
    },
  ];

  return (
    <StyledGridContainer>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(data) => data.propertyId}
        hideFooter
      />
    </StyledGridContainer>
  );
};

export default PropTypeBreakdown;
