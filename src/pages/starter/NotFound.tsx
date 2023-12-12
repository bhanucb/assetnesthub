import { FC } from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import AppLogo from "../../components/logo/AppLogo";
import { NavLink } from "react-router-dom";
import { Box, Paper, useTheme } from "@mui/material";

const Background = styled(Paper)`
  .container {
    height: 100vh;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .light {
    background: rgb(35, 46, 93);
    background: linear-gradient(
      90deg,
      rgba(35, 46, 93, 1) 0%,
      rgba(65, 74, 113, 1) 75%,
      rgba(67, 76, 112, 1) 100%
    );
  }

  .dark {
    background: rgb(14, 14, 14);
    background: linear-gradient(
      90deg,
      rgba(14, 14, 14, 1) 0%,
      rgba(51, 51, 51, 1) 75%,
      rgba(51, 51, 51, 1) 100%
    );
  }
`;

const NotFound: FC = () => {
  const {
    palette: { mode },
  } = useTheme();
  return (
    <Background>
      <Box className={"container " + mode}>
        <AppLogo />
        <br />
        <Typography variant="h5" color="white">
          Page Not Found
        </Typography>
        <NavLink to="/">
          <Typography color="white" variant="h6">
            Home
          </Typography>
        </NavLink>
      </Box>
    </Background>
  );
};

export default NotFound;
