import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { forwardRef, Ref, useImperativeHandle, useState } from "react";
import LayoutSection from "./LayoutSection";
import { ThemeSection } from "./ThemeSection";

const DrawerHeader = styled(Box)`
  display: flex;
  align-items: center;
  padding: 8px;
  justify-content: space-between;

  .title {
    margin-left: 8px;
  }
`;

export interface RightDrawerRef {
  toggleDrawer: () => void;
}

const RightDrawer = forwardRef((_, ref: Ref<RightDrawerRef>) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    toggleDrawer,
  }));

  function toggleDrawer() {
    setOpen((prev) => !prev);
  }

  return (
    <Drawer anchor={"right"} open={open} onClose={toggleDrawer}>
      <DrawerHeader>
        <Typography variant="h6" className="title">
          Settings
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box sx={{ width: { xs: 350, md: 450 } }} role="presentation">
        <ThemeSection />
        <LayoutSection toggleDrawer={toggleDrawer} />
      </Box>
    </Drawer>
  );
});

RightDrawer.displayName = "RightDrawer";

export default RightDrawer;
