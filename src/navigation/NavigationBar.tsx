import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import RightDrawer, { RightDrawerApi } from "./rightDrawer/RightDrawer";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";

function NavigationBar() {
  const [rightDrawerApi, setRightDrawerApi] = useState<RightDrawerApi>();

  function handleRightDrawerReady({ api }: { api: RightDrawerApi }) {
    setRightDrawerApi(api);
  }

  function handleToggleDrawer() {
    rightDrawerApi?.toggleDrawer();
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
        <RightDrawer onReady={handleRightDrawerReady} />
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
