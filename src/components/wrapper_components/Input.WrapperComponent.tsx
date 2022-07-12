import { InputBase } from "@mui/material";
import React from "react";
import Theme from "../../configs/ThemeConfig";

interface InputProps {
  onChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  placeholderStyle?: React.CSSProperties;
  placeHolderText?: string;
  numberOfLines?: number;
  value?: string;
  inputTextStyle?: React.CSSProperties;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const Input: React.FC<InputProps> = (props) => {
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
      onChange={props.onChange}
      rows={props.numberOfLines}
      inputProps={{
        sx: {
          "&::placeholder":
            props.placeholderStyle !== undefined && props.placeholderStyle,
        },
      }}
      multiline
      value={props.value}
      onBlur={props.onBlur}
    />
  );
};

export default Input;
