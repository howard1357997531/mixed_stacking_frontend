import { createTheme } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

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
  orange: "#FE4A1B",
  lightGreen: "#01FCAC",
  darkGreen: "#14BF9C",
  darkPink: "#DFA9B2",
  grey: grey[600],
  blue: blue[700],
  red: "#FF494B",
  black: "#303030",
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
