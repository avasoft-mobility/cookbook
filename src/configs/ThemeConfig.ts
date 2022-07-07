import { createTheme } from "@mui/material/styles";
import Color from "./ColorConfig";

const theme = createTheme({
  palette: {
    primary: {
      main: Color.primaryColor,
      light: Color.primaryTintColor,
    },
    secondary: {
      main: Color.secondaryColor,
      light: Color.secondaryTintColor,
    },
    text: {
      primary: Color.textPrimaryColor,
      secondary: Color.textSecondaryColor,
    },
  },
});

export default theme;
