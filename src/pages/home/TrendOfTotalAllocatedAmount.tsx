import { FC, useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  getTotalAllocatedAmounts,
  RealEstateAllocatedAmount,
} from "../../api/TotalAllocatedAmounts";
import dayjs from "dayjs";
import { formatCurrency } from "../../utils/Misc";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledChartContainer = styled(ResponsiveContainer)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .chart {
    height: 95% !important;
  }

  .tooltip {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

function ToolTopFormatter({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (active && payload?.length) {
    return (
      <Paper elevation={0}>
        <Box p={1} className="tooltip">
          <Box>{dayjs(label as string).format("YYYY-MM-DD")}</Box>
          <Box>{formatCurrency(payload[0].value ?? 0)}</Box>
        </Box>
      </Paper>
    );
  }

  return null;
}

const TrendOfTotalAllocatedAmount: FC = () => {
  const [data, setDate] = useState<RealEstateAllocatedAmount[]>([]);

  useEffect(() => {
    getTotalAllocatedAmounts()
      .then((data) => setDate(data))
      .catch((e) => console.error(e));
  }, []);

  const formatDate = (date: string): string => {
    return dayjs(date).format("YY MMM");
  };

  return (
    <StyledChartContainer>
      <LineChart
        className="chart"
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(tick: string) => formatDate(tick)}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickFormatter={(tick: number) => formatCurrency(tick, true)}
          tick={{ fontSize: 12 }}
        />
        <Tooltip content={<ToolTopFormatter />} />
        <Legend formatter={() => "Total Amount"} />
        <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" />
      </LineChart>
    </StyledChartContainer>
  );
};

export default TrendOfTotalAllocatedAmount;
