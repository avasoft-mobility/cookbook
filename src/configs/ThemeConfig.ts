import { createTheme } from "@mui/material/styles";
import { grid, height } from "@mui/system";
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

theme.typography.h4 = {
  fontSize: '35px',
  fontWeight: '400',
  '@media (max-width:950px)': {
    fontSize: '25px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '25px',
  },
  '@media (max-width:420px)': {
    fontSize: '20px',
  },
};

theme.typography.h3 = {
  fontSize: '45px',
  '@media (max-width:950px)': {
    fontSize: '35px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '35px',
  },
  '@media (max-width:420px)': {
    fontSize: '30px',
  },
};



export default theme;
