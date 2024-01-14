import { FC, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { DeclinedDealData, getDeclinedDeals } from "../../api/DeclinedDeals";
import { formatCurrency, formatPercentage } from "../../utils/Misc";

const StyledGridContainer = styled(Box)`
  width: 100%;
`;

const DeclinedDealsBreakdown: FC = () => {
  const [data, setData] = useState<DeclinedDealData[]>([]);

  useEffect(() => {
    getDeclinedDeals()
      .then((data) => setData(data))
      .catch((e) => console.error(e));
  }, []);

  const columns: GridColDef[] = [
    { field: "dealName", headerName: "Deal Name", flex: 1, minWidth: 200 },
    { field: "declineReason", headerName: "Decline Reason", flex: 1 },
    {
      field: "proposalAmount",
      headerName: "Proposal Amount",
      type: "number",
      flex: 1,
      valueGetter: (params: GridValueGetterParams<DeclinedDealData, number>) =>
        params.value && formatCurrency(params.value),
    },
    {
      field: "currentInvestedPercentage",
      headerName: "Current Invested (%)",
      type: "number",
      flex: 1,
      valueGetter: (params: GridValueGetterParams<DeclinedDealData, number>) =>
        params.value && formatPercentage(params.value),
    },
  ];

  return (
    <StyledGridContainer>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(data) => (data as DeclinedDealData).dealId}
        hideFooter
      />
    </StyledGridContainer>
  );
};

export default DeclinedDealsBreakdown;
