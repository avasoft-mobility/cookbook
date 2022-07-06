import React from "react";
import { InputBase } from "@mui/material";

interface InputProps {
  input: Function;
  placeholderStyle?: React.CSSProperties;
}

const Input: React.FC<InputProps> = (props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.input(event.target.value);
  };
  return (
    <InputBase
      sx={{ width: "100%" }}
      placeholder="Explore the topics..."
      onChange={onChange}
      inputProps={{
        sx: {
          "&::placeholder":
            props.placeholderStyle !== undefined && props.placeholderStyle,
        },
      }}
    />
  );
};

export default Input;
