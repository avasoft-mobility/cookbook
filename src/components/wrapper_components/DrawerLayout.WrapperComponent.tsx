import { ClickAwayListener, SwipeableDrawer } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { useEffect, useState } from "react";
import useWindowSize from "../../configs/WindowSize";

const DRAWER_WIDTH = 240;

interface DrawerLayoutProps {
  header: React.ReactNode;
  leftNavigation: React.ReactNode;
  mainContent: React.ReactNode;
  window?: () => Window;
  isSideBarMenuClicked: boolean;
  clickAway: Function;
}

const DrawerLayout: React.FC<DrawerLayoutProps> = (props) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const width = useWindowSize();
  useEffect(() => {
    props.isSideBarMenuClicked ? setSideBarOpen(true) : setSideBarOpen(false);
  });

  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    props.clickAway(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <div>{props.header}</div>
      </AppBar>

      <Drawer
        container={container}
        variant="permanent"
        open={sideBarOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "none", sm: "block" },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <div style={{ width: "240px" }}>{props.leftNavigation}</div>
      </Drawer>
      <ClickAwayListener onClickAway={handleDrawerToggle}>
        <React.Fragment>
          <SwipeableDrawer
            container={container}
            open={sideBarOpen}
            onClose={handleDrawerToggle}
            onOpen={handleDrawerToggle}
          >
            <div style={{ width: "240px" }}>{props.leftNavigation}</div>
          </SwipeableDrawer>
        </React.Fragment>
      </ClickAwayListener>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: width.width > 870 ? "80px" : "0px",
          marginRight: width.width > 870 ? "80px" : "0px",
          width: "9rem",
        }}
      >
        <Toolbar />
        {props.mainContent}
      </Box>
    </Box>
  );
};

export default DrawerLayout;
