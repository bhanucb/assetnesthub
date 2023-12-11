import { FC, useEffect, useState } from "react";
import { getRealEstateData, PropertyData } from "../../api/RealEstateData";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "../../utils/Misc";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const StyledChartContainer = styled(ResponsiveContainer)`
  //width: 100%;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  .chart {
    height: 95% !important;
  }

  .tooltip {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

function ToolTopFormatter({
  active,
  payload,
  label,
}: TooltipProps<string, string>) {
  if (active && payload && payload.length) {
    const { minAmount, maxAmount, currentInvested, totalAllocated } = payload[0]
      .payload as PropertyData;

    return (
      <Paper elevation={0}>
        <Box p={1} className="tooltip">
          <Typography variant="body1">{label}</Typography>
          <Typography variant="caption">
            Min Amount: {formatCurrency(minAmount)}
          </Typography>
          <Typography variant="caption">
            Max Amount: {formatCurrency(maxAmount)}
          </Typography>
          <Typography variant="caption">
            Current Invested: {formatCurrency(currentInvested)}
          </Typography>
          <Typography variant="caption">
            Total Allocated: {formatCurrency(totalAllocated)}
          </Typography>
        </Box>
      </Paper>
    );
  }

  return null;
}

const InvAmountByPropType: FC = () => {
  const [data, setData] = useState<Array<PropertyData>>([]);

  useEffect(() => {
    getRealEstateData().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <StyledChartContainer>
      <BarChart
        className="chart"
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="propertyType" />
        <YAxis tickFormatter={(tick) => formatCurrency(tick, true)} />
        <Tooltip content={<ToolTopFormatter />} />
        <Legend />
        <Bar dataKey="minAmount" fill="#8884d8" name="Min Amount" />
        <Bar
          dataKey="currentInvested"
          fill="#ffc658"
          name="Current Invested Amount"
        />
        <Bar
          dataKey="totalAllocated"
          fill="#ff7300"
          name="Total Allocated Amount"
        />
        <Bar dataKey="maxAmount" fill="#82ca9d" name="Max Amount" />
      </BarChart>
    </StyledChartContainer>
  );
};

export default InvAmountByPropType;
