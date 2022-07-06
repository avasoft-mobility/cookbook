import React from "react";
import { Box, IconButton } from "@mui/material";
import Text from "./Text.wrapperComponent";
import MoreIcon from "@mui/icons-material/MoreVert";
import KebabMenu from "./KebabMenu.WrapperComponent";

interface HeaderProps {
  headerText: string;
  headerHeight?: string
}

const Header: React.FC<HeaderProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onClickMenuItem =(event: React.MouseEvent<HTMLElement>)=>{
    console.log(event.currentTarget)
    setAnchorEl(null);
  }
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#6133BD",
        height: props.headerHeight
      }}
    >
      <div style={styles.headerText}>
        <Text variant="inherit" color="#FFFFFF">
          {props.headerText}
        </Text>
      </div>
      <div>
        <KebabMenu
          iconButtonColor={"default"}
          iconButtonStyle = {{color:"#FFFFFF"}}
          onMenuItemClicked={onClickMenuItem}
          onIconButtonClicked={handleClick}
          menuItems={["Download Code","See Topic Flow","See Technical Flow"]}
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
