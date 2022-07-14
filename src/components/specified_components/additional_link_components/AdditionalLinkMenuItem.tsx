import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Color from "../../../configs/ColorConfig";

interface AdditionalLinkMenuItemProps {
  onSelect: Function;
  icon: React.ReactNode;
}

const AdditionalLinkMenuItem: React.FC<AdditionalLinkMenuItemProps> = ({
  onSelect,
  icon,
}) => {
  return (
    <ListItem key={"additional_links"} disablePadding>
      <ListItemButton
        sx={{
          "&:hover": {
            backgroundColor: Color.primaryLight,
          },
        }}
        onClick={() => onSelect()}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={"Additional Links"}
          style={{ color: Color.textSecondaryColor }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default AdditionalLinkMenuItem;
