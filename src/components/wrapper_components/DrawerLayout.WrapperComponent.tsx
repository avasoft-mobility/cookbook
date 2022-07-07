import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

const DRAWER_WIDTH = 240;

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
        <div>{props.header}</div>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
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
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginLeft: "80px", marginRight: "80px" ,width:"9rem"}}
      >
        <Toolbar />
        {props.mainContent}
      </Box>
    </Box>
  );
};

export default DrawerLayout;
