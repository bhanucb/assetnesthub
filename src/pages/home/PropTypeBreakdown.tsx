import { FC, useEffect } from "react";
import Box from "@mui/material/Box";
import { getRealEstateData } from "../../api/RealEstateData";

const PropTypeBreakdown: FC = () => {
  useEffect(() => {
    getRealEstateData().then((data) => console.log(data));
  }, []);

  return <Box>Hello Property Type Breakdown</Box>;
};

export default PropTypeBreakdown;
