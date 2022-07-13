import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize.hook";
import { ClickAwayListener, SwipeableDrawer } from "@mui/material";

const DRAWER_WIDTH = 241;

interface DrawerLayoutProps {
  header: React.ReactNode;
  leftNavigation: React.ReactNode;
  mainContent: React.ReactNode;
  isSideBarOpened: boolean;
  toggleSideBar: Function;
}

const DrawerLayout: React.FC<DrawerLayoutProps> = (props) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const windowSize = useWindowSize();
  useEffect(() => {
    props.isSideBarOpened ? setSideBarOpen(true) : setSideBarOpen(false);
  });

  const handleDrawerToggle = () => {
    props.toggleSideBar();
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
        open={sideBarOpen}
        onClose={handleDrawerToggle}
        variant="permanent"
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
            open={sideBarOpen}
            onClose={handleDrawerToggle}
            onOpen={handleDrawerToggle}
          >
            <Toolbar />
            <div style={{ width: "240px" }}>{props.leftNavigation}</div>
          </SwipeableDrawer>
        </React.Fragment>
      </ClickAwayListener>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: windowSize.width > 870 ? "80px" : "0px",
          marginRight: windowSize.width > 870 ? "80px" : "0px",
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
