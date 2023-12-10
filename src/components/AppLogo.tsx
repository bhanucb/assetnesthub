import { Box, styled } from "@mui/material";
import { FC } from "react";

const StyledLogo = styled(Box)`
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    background-color: #f0f0f0;
  }

  .logo {
    font-family: "Arial", sans-serif;
    font-size: 2em;
    font-weight: bold;
    color: #f0f0f0;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
  }

  .logo::before {
    content: "";
    width: 100%;
    height: 2px;
    background-color: #f0f0f0;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
`;
const AppLogo: FC = () => {
  return (
    <StyledLogo>
      <div className="logo">AssetNest Hub</div>
    </StyledLogo>
  );
};

export default AppLogo;
