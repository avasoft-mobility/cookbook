import { InputBase } from "@mui/material";
import React from "react";
import Theme from "../../configs/ThemeConfig";

interface InputProps {
  input: Function;
  placeholderStyle?: React.CSSProperties;
  placeHolderText?: string;
  numberOfLines?: number;
  value?: string;
  inputTextStyle?: React.CSSProperties;
}

const Input: React.FC<InputProps> = (props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.input(event.target.value);
  };
  return (
    <InputBase
      sx={
        props.inputTextStyle !== undefined
          ? props.inputTextStyle
          : {
              width: "100%",
              fontSize: "25px",
              color: Theme.palette.text.secondary,
            }
      }
      placeholder={props.placeHolderText}
      onChange={onChange}
      rows={props.numberOfLines}
      inputProps={{
        sx: {
          "&::placeholder":
            props.placeholderStyle !== undefined && props.placeholderStyle,
        },
      }}
      multiline
      value={props.value}
    />
  );
};

export default Input;
