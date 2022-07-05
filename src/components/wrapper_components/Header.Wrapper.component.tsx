import React from "react";
import { Box, IconButton } from "@mui/material";
import Text from "./Text.wrapperComponent";
import MoreIcon from "@mui/icons-material/MoreVert";

interface HeaderProps {
  headerText: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#6133BD",
      }}
    >
      <div style={styles.headerText}>
        <Text variant="h6" color="#FFFFFF">
          {props.headerText}
        </Text>
      </div>
      <div>
        <IconButton
          size="large"
          aria-label="display more actions"
          edge="end"
          color="inherit"
        >
          <MoreIcon sx={{ color: "#FFFFFF" }} />
        </IconButton>
      </div>
    </Box>
  );
};

const styles = {
  headerContainer: {
    width: "100%",
    backgroundColor: "#6133BD",
    height: "60px",
    display: "flex",
    alignItems: "center",
  },
  headerText: {
    marginLeft: "15px",
  },
};

export default Header;
