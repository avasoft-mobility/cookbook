import { InputBase } from "@mui/material";
import React from "react";
import Theme from '../../configs/ThemeConfig';

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
      sx={{ width: "100%", fontSize: "25px", color: Theme.palette.text.secondary }}
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
