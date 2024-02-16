import { Box, Stack, Typography, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import theme, { Colors } from "../theme";

export const NavLeftBox = styled(Box)({
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  width: "30%",
  height: "100%",
});

export const NavMiddleBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 1,
  height: "100%",
});

export const NavRightBox = styled(Box)({
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
  width: "30%",
  height: "100%",
});

export const NavLinkImageBox = styled(Box)({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  marginLeft: "10px",
});

export const NavLinkImageSmallBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "4px 2px 0px",
  width: "60px",
  "&:hover": {
    transform: "scale(1.1)",
    backgroundColor: Colors.grey300,
    cursor: "pointer",
  },
  "&:active": {
    transform: "scale(.95)",
    backgroundColor: Colors.grey400,
  },
});

export const NavLinkImageBoxText = styled(Typography)({
  marginTop: "2px",
  fontSize: "14px",
  fontWeight: 600,
  color: Colors.greyTextBlood,
  [theme.breakpoints.down("md")]: {
    fontSize: "14px",
  },
});
