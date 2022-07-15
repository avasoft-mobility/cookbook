import React from "react";
import {
  createTheme,
  InputBase,
  TextField,
  ThemeProvider,
} from "@mui/material";

import Color from "../../configs/ColorConfig";
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
  type?: "outlined" | "normal";
  errorText?: string;
  style?: React.CSSProperties;
}

const Input: React.FC<InputProps> = (props) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: Color.primaryColor,
        light: Color.primaryTintColor,
      },
    },
  });

  const outlinedInputTextField = () => {
    return (
      <ThemeProvider theme={theme}>
        <TextField
          error={props.errorText !== "" ? true : false}
          id="outlined-basic"
          fullWidth
          label={props.errorText === "" ? props.placeHolderText : "error"}
          helperText={props.errorText !== "" ? props.errorText : null}
          variant="outlined"
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          multiline
          sx={props.style}
          rows={props.numberOfLines}
        />
      </ThemeProvider>
    );
  };

  if (props.type === "outlined") {
    return outlinedInputTextField();
  }

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
export type { InputProps };