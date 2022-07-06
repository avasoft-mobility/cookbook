import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

const DRAWERWIDTH = 240;

interface DrawerLayoutProps {
  header: React.ReactNode;
  leftNavigation: React.ReactNode;
  mainContent: React.ReactNode;
}

const DrawerLayout: React.FC<DrawerLayoutProps> = (props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>{props.header}</Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWERWIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: DRAWERWIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>{props.leftNavigation}</Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {props.mainContent}
      </Box>
    </Box>
  );
};

export default DrawerLayout;
