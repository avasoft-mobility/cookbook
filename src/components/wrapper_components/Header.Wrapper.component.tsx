import React from "react";
import { Box, IconButton, Toolbar } from "@mui/material";
import Text from "./Text.wrapperComponent";
import KebabMenu from "./KebabMenu.WrapperComponent";
import Theme from "../../configs/ThemeConfig";
import MenuIcon from "@mui/icons-material/Menu";

interface HeaderProps {
  headerText: string;
  headerHeight?: string;
  onClickMenuItem: Function;
  onClickSideBarMenu: Function;
}

const Header: React.FC<HeaderProps> = (props) => {
  const onClickSideBarMenu = () => {
    props.onClickSideBarMenu();
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const onClickMenuIcon = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onClickMenuItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    props.onClickMenuItem(event.currentTarget.innerText);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Theme.palette.primary.main,
        height: props.headerHeight,
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onClickSideBarMenu}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <div style={styles.headerText}>
          <Text variant="h5" color={Theme.palette.text.primary}>
            {props.headerText}
          </Text>
        </div>
      </div>
      <div>
        <KebabMenu
          iconButtonColor={"default"}
          iconButtonStyle={{ color: Theme.palette.text.primary }}
          onMenuItemClicked={onClickMenuItem}
          onIconButtonClicked={onClickMenuIcon}
          menuItems={["Download Code", "See Topic Flow", "See Technical Flow"]}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        />
      </div>
    </Box>
  );
};

const styles = {
  headerText: {
    marginLeft: "15px",
  },
};

export default Header;
