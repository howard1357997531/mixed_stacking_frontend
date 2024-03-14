import { Box, Stack, Typography, styled } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "8px 0px 4px",
  width: "60px",
  borderRadius: "2px",
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

export const NavLinkImageBoxCount = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "20px",
  height: "20px",
  color: "#fff",
  fontSize: 13,
  fontWeight: 600,
  backgroundColor: Colors.red800,
  borderRadius: "50%",
}));

export const UpBtn = styled(KeyboardArrowUpIcon, {
  shouldForwardProp: (prop) => prop !== "visible",
})(({ theme, visible }) => ({
  position: "fixed",
  display: !visible && "none",
  bottom: "9%",
  right: "5%",
  zIndex: 9999,
  opacity: "80%",
  width: "45px",
  height: "45px",
  backgroundColor: Colors.blue500,
  borderRadius: "50%",
  "@media screen and (orientation: portrait)": {
    right: "4%",
    width: "60px",
    height: "60px",
  },
  [theme.breakpoints.down("sm")]: {
    right: "5%",
    width: "45px",
    height: "45px",
  },
  "&:hover": {
    cursor: "pointer",
  },
}));
