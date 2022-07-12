import React from "react";
import Button from "@mui/material/Button";
import Theme from "../../configs/ThemeConfig";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

interface ClickableProps {
  ClickableText: string;
  variant: "text" | "contained" | "outlined";
  clickableSize: "small" | "medium" | "large";
  textColor?: string;
  startIcon?: string;
  endIcon?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
}

const Clickable: React.FC<ClickableProps> = (props) => {
  const Icon = (icon: string) => {
    if (icon === "delete") {
      return <DeleteIcon />;
    }
    if (icon === "send") {
      return <SendIcon />;
    }
  };

  return (
    <Button
      onClick={props.onClick}
      size={props.clickableSize}
      variant={props.variant}
      startIcon={props.startIcon !== undefined ? Icon(props.startIcon) : null}
      endIcon={props.endIcon !== undefined ? Icon(props.endIcon) : null}
      sx={{
        color:
          props.textColor !== undefined
            ? props.textColor
            : Theme.palette.text.primary,
      }}
      style={props.style}
    >
      {props.ClickableText}
    </Button>
  );
};

export default Clickable;
