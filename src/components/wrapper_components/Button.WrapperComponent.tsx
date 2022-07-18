import React from "react";
import MaterialUiButton from "@mui/material/Button";
import Theme from "../../configs/ThemeConfig";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

interface ButtonProps {
  buttonText: string;
  variant: "text" | "contained" | "outlined";
  buttonSize: "small" | "medium" | "large";
  textColor?: string;
  startIcon?: string;
  endIcon?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = (props) => {
  const Icon = (icon: string) => {
    if (icon === "delete") {
      return <DeleteIcon />;
    }
    if (icon === "send") {
      return <SendIcon />;
    }
  };

  return (
    <MaterialUiButton
      onClick={props.onClick}
      size={props.buttonSize}
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
      {props.buttonText}
    </MaterialUiButton>
  );
};

export default Button;
