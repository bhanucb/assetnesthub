import { Box, styled, useTheme } from "@mui/material";
import { FC } from "react";
import logoDark from "./logo-dark.png";
import logoLight from "./logo-light.png";
import { NAVIGATION_BAR_HEIGHT } from "../../navigation/Constants";

const StyledLogo = styled(Box)`
  max-height: ${NAVIGATION_BAR_HEIGHT}px;
`;
const AppLogo: FC = () => {
  const {
    palette: { mode },
  } = useTheme();

  return (
    <StyledLogo>
      {mode === "dark" ? (
        <img src={logoDark} alt="Logo" />
      ) : (
        <img src={logoLight} alt="Logo" />
      )}
    </StyledLogo>
  );
};

export default AppLogo;
