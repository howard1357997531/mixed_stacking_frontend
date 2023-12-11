import { alpha, createTheme } from "@mui/material";
import {
  blue,
  brown,
  deepOrange,
  deepPurple,
  grey,
  lightBlue,
  pink,
  red,
  teal,
  yellow,
} from "@mui/material/colors";

export const Colors = {
  primary: "#5f2c3e",
  secondary: "#d1adcc",
  success: "#4CAF50",
  info: "#00a2ff",
  danger: "#FF5722",
  warning: "#FFC107",
  dark: "#0e1b20",
  light: "#aaa",
  muted: "#abafb3",
  border: "#DDDFE1",
  inverse: "#2F3D4A",
  shaft: "#333",
  ///////////////
  // Grays
  ///////////////
  bgcolorLightorange: "#FFF7EC",
  lightOrange: "#FFDDB0",
  lightOrangeHover: "#f2cd9d",
  orange: "#FE4A1B",
  softOrange: deepOrange[400],
  softOrangeHover: deepOrange[500],
  lightGreen: "#01FCAC",
  softGreen: "#61d1c68b",
  darkGreen: "#14BF9C",
  darkGreenHover: teal[500],
  green600: teal[600],
  green800: teal[800],
  darkPink: "#DFA9B2",
  darkPinkHover: pink[200],
  grey: "#E2DCD0",
  grey100: grey[100],
  greyHover: grey[400],
  greyBorder: grey[500],
  grey600: grey[600],
  greyText: grey[700],
  greyTextBlood: grey[800],
  red: "#FF494B",
  lightred: red[300],
  lightredHover: red[400],
  darkred: red[500],
  darkredHover: red[600],
  red800: red[800],
  red900: red[900],
  blue: blue[700],
  blue600: blue[600],
  blue700: blue[700],
  lightBlue: lightBlue[400],
  lightBlueHover: lightBlue[500],
  black: "#303030",
  purple: deepPurple[300],
  purple200: deepPurple[200],
  purple400: deepPurple[400],
  yellow: yellow[500],
  lightYellow: yellow[300],
  brown100: brown[100],
  brown200: brown[200],
  lightbrown200: "#9e9e9e8b",
  brown: brown[300],
  lightbrown300: "#a1887fa5",
  brownHover: brown[400],
  brown500: brown[500],
  brownText: brown[600],
  // swal
  swalRed: "#f27474",
  swalGreen: "#a5dc86",
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },
});

export default theme;
