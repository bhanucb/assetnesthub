import * as React from "react";
import { FC, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import RightDrawer, { RightDrawerApi } from "./rightDrawer/RightDrawer";
import { Button, Menu, MenuItem, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { NAVBAR_LINKS } from "./NavigationRoutes";
import AppLogo from "../components/logo/AppLogo";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(Box)`
  .light {
    background: rgb(35, 46, 93);
    background: linear-gradient(
      90deg,
      rgba(35, 46, 93, 1) 0%,
      rgba(65, 74, 113, 1) 11%,
      rgba(67, 76, 112, 1) 100%
    );
  }

  .dark {
    background: rgb(14, 14, 14);
    background: linear-gradient(
      90deg,
      rgba(14, 14, 14, 1) 0%,
      rgba(51, 51, 51, 1) 20%,
      rgba(51, 51, 51, 1) 100%
    );
  }
`;
function NavigationBar() {
  const [rightDrawerApi, setRightDrawerApi] = useState<RightDrawerApi>();
  const navigate = useNavigate();
  const {
    palette: { mode },
  } = useTheme();

  function handleRightDrawerReady({ api }: { api: RightDrawerApi }) {
    setRightDrawerApi(api);
  }

  function handleToggleDrawer() {
    rightDrawerApi?.toggleDrawer();
  }

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const NavLinks: FC = () => {
    function handleClickBtn(path: string) {
      handleCloseNavMenu();
      navigate(path);
    }

    return (
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {NAVBAR_LINKS.map((route) => (
          <Button
            key={route.name}
            onClick={() => handleClickBtn(route.path)}
            sx={{ color: "white", display: "block" }}
          >
            {route.name}
          </Button>
        ))}
      </Box>
    );
  };

  const NavTitle: FC = () => {
    return (
      <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
        <AppLogo />
      </Box>
    );
  };

  const ResponsiveMenu: FC = () => {
    return (
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
          style={{ paddingLeft: 0 }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {NAVBAR_LINKS.map(({ name }) => (
            <MenuItem key={name} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  };

  return (
    <StyledAppBar>
      <AppBar position="static" className={mode}>
        <Toolbar>
          <NavTitle />
          <ResponsiveMenu />
          <NavLinks />
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="settings"
            sx={{ ml: 2 }}
            onClick={handleToggleDrawer}
          >
            <SettingsIcon />
          </IconButton>
          <RightDrawer onReady={handleRightDrawerReady} />
        </Toolbar>
      </AppBar>
    </StyledAppBar>
  );
}

export default NavigationBar;
