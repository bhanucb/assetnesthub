import { FC, ReactElement } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PercentIcon from "@mui/icons-material/Percent";
import { formatCurrency } from "../../utils/Misc";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const StyledGrid = styled(Grid)`
  height: 100%;
  width: 100%;

  .card {
    height: 100%;
    width: 100%;
  }
  .card-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

type ItemProps = {
  value: string;
  text: string;
  icon: ReactElement;
};

const Item: FC<ItemProps> = ({ value, text, icon }) => {
  return (
    <Card className="card">
      <CardContent className="card-content">
        {icon}
        <Typography variant="h5">{value}</Typography>
        <Typography variant="caption">{text}</Typography>
      </CardContent>
    </Card>
  );
};

const Summary: FC = () => {
  return (
    <StyledGrid container>
      <Grid xs={6} pr={1} pb={1} pl={2} pt={2}>
        <Item
          value={formatCurrency(3673242)}
          text="Committment Amount"
          icon={<MonetizationOnIcon fontSize="large" />}
        />
      </Grid>
      <Grid xs={6} pl={1} pb={1} pr={2} pt={2}>
        <Item
          value={formatCurrency(6363636)}
          text="Total Allocated Amount"
          icon={<MonetizationOnIcon fontSize="large" />}
        />
      </Grid>
      <Grid xs={6} pt={1} pr={1} pb={2} pl={2}>
        <Item
          value={formatCurrency(7474784)}
          text="Current Invested Amount"
          icon={<AccountBalanceIcon fontSize="large" />}
        />
      </Grid>
      <Grid xs={6} pt={1} pl={1} pb={2} pr={2}>
        <Item
          value={"75%"}
          text="Current Invested %"
          icon={<PercentIcon fontSize="large" />}
        />
      </Grid>
    </StyledGrid>
  );
};

export default Summary;
