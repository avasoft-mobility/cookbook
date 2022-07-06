import * as React from "react";

import { SxProps, Theme } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import IconButton from "./IconButton.WrapperComponent";

const ITEM_HEIGHT = 48;

interface KebabMenuProps {
  iconButtonColor:
    | "inherit"
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  onMenuItemClicked: React.MouseEventHandler<HTMLLIElement>;
  onIconButtonClicked: React.MouseEventHandler<HTMLButtonElement>;
  menuItems: string[];
  anchorEl: Element | ((element: Element) => Element) | null | undefined;
  open: boolean;
  onClose: (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => void | undefined;
  selected?: boolean | undefined;
  iconButtonStyle?: SxProps<Theme> | undefined;
  menuStyle: React.CSSProperties | undefined;
  menuItemStyle: React.CSSProperties | undefined;
}

const KebabMenu: React.FC<KebabMenuProps> = (props) => {
  return (
    <div>
      <IconButton
        color={props.iconButtonColor}
        onClick={props.onIconButtonClicked}
        style={props.iconButtonStyle}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={props.onClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
        style={props.menuStyle}
      >
        {props.menuItems.map((option) => (
          <MenuItem
            key={option}
            selected={props.selected}
            onClick={props.onMenuItemClicked}
            style={props.menuItemStyle}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default KebabMenu;
