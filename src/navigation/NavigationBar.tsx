import { createRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import RightDrawer, { RightDrawerRef } from "./rightDrawer/RightDrawer";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";

function NavigationBar() {
  const rightDrawerRef = createRef<RightDrawerRef>();

  function handleToggleDrawer() {
    rightDrawerRef.current?.toggleDrawer();
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" flexGrow={1}>
          Asset Nest Hub
        </Typography>
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
        <RightDrawer ref={rightDrawerRef} />
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
