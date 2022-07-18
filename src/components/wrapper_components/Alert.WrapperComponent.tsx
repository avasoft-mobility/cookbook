import React from "react";
import { Alert as MUIAlert } from "@mui/material";

interface AlertProps {
  severity: "error" | "info" | "success" | "warning";
  variant: "filled" | "outlined" | "standard";
  text: string;
}

const Alert: React.FC<AlertProps> = (props) => {
  return (
    <MUIAlert severity={props.severity} variant={props.variant}>
      {props.text}
    </MUIAlert>
  );
};

export default Alert;
