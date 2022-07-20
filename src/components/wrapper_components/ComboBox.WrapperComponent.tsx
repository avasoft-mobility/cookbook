import React from "react";
import {
  Autocomplete,
  createTheme,
  TextField,
  ThemeProvider,
} from "@mui/material";
import Color from "../../configs/ColorConfig";

interface ComboBoxProps {
  label: string;
  options: string[];
  onChanged: Function;
  defaultValue?: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  label,
  options,
  onChanged,
  defaultValue,
}) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: Color.primaryColor,
        light: Color.primaryTintColor,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        defaultValue={defaultValue}
        disablePortal
        options={options}
        style={{
          width: "100%",
        }}
        onChange={(event: any, newValue: string | null) => {
          onChanged(newValue);
        }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </ThemeProvider>
  );
};

export default ComboBox;
