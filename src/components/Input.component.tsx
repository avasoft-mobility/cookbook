import React from "react";
import { InputBase } from "@mui/material";

const Input = () => {
  return (
    <InputBase
      sx={{ width: "100%" }}
      placeholder="Explore the topics..."
      inputProps={{
        sx: {
          "&::placeholder": {
            color: "#D3DFF8",
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "25px",
            lineHeight: "47px",
          },
        },
      }}
    />
  );
};
const styles = {
  inputContainer: {
    borderRadius: "none",
    borderWidth: "0px",
    outline: "none",
    width: "100%",
    height: "50px",
    display: "flex",
    fontSize: "20px",
  },
};

export default Input;
