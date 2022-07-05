import React from "react";

import {
  IconButton as MaterialIconButton,
  SxProps,
  Theme,
} from "@mui/material";

interface IconButtonProps {
  children: any;
  color:
    | "inherit"
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: SxProps<Theme>;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  return (
    <MaterialIconButton
      color={props.color}
      onClick={props.onClick}
      sx={props.style}
    >
      {props.children}
    </MaterialIconButton>
  );
};

export default IconButton;
