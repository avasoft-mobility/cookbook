import React from "react";
import { InputBase } from "@mui/material";

interface InputProps {
  input:Function;
}

const Input: React.FC<InputProps>  = (props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.input(event.target.value)
  };
  return (
    <InputBase
      sx={{ width: "100%" }}
      placeholder="Explore the topics..."
      onChange={onChange}
      inputProps={{
        sx: {
          fontSize: "25px",
          "&::placeholder": {
            color: "#D3DFF8",
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "600",
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
