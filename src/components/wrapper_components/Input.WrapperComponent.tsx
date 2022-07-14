import {
  createTheme,
  InputBase,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { FieldHookConfig, useField } from "formik";
import React from "react";
import Color from "../../configs/ColorConfig";
import Theme from "../../configs/ThemeConfig";

interface InputProps {
  placeholderStyle?: React.CSSProperties;
  placeHolderText?: string;
  numberOfLines?: number;
  inputTextStyle?: React.CSSProperties;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?: "outlined" | "normal";
  error?: boolean;
  errorText?: string;
}

const Input: React.FC<FieldHookConfig<any> & InputProps> = (
  props: FieldHookConfig<any> & InputProps
) => {
  const defaultProps: FieldHookConfig<any> = props as FieldHookConfig<any>;
  console.log(defaultProps);

  const [field, meta, helpers] = useField(defaultProps);
  const theme = createTheme({
    palette: {
      primary: {
        main: Color.primaryColor,
        light: Color.primaryTintColor,
      },
    },
  });
  return (
    <>
      {props.type === "outlined" ? (
        <div>
          <ThemeProvider theme={theme}>
            <TextField
              className="TextField-with-border-radius"
              error={props.error ? true : false}
              id="outlined-basic"
              fullWidth
              label={props.errorText === "" ? props.placeHolderText : "error"}
              helperText={props.errorText !== "" ? props.errorText : null}
              variant="outlined"
              onChange={
                props.onChange as
                  | React.ChangeEventHandler<
                      HTMLInputElement | HTMLTextAreaElement
                    >
                  | undefined
              }
              onBlur={props.onBlur}
              value={props.value}
              sx={{ marginTop: "10px", borderRadius: "50px" }}
              inputProps={{
                sx: {
                  "&::placeholder": {
                    color: "red",
                    fontSize: "bold",
                  },
                },
                "& fieldset": {
                  borderRadius: "50px",
                },
              }}
            />
          </ThemeProvider>
        </div>
      ) : (
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
          onChange={
            props.onChange as
              | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
              | undefined
          }
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
      )}
    </>
  );
};

export default Input;
