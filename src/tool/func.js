import {
  amber,
  blueGrey,
  brown,
  deepPurple,
  grey,
  lightBlue,
  lime,
  orange,
  pink,
  red,
  teal,
} from "@mui/material/colors";

export const AiResultAvatarBgcolor = (number) => {
  const colorTotal = [
    blueGrey[400],
    teal[200],
    deepPurple[200],
    red[300],
    lightBlue[300],
    orange[300],
    pink[300],
    blueGrey[400],
    grey[400],
    deepPurple[200],
  ];
  const num = String(number - 1);
  if (num.length === 1) {
    return colorTotal[0];
  } else {
    const tenDigits = num.split("").at(-2);
    return colorTotal[tenDigits];
  }
};
