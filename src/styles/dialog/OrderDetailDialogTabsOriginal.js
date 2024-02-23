import { Box, Typography, styled } from "@mui/material";
import { Colors } from "../theme";

export const OrderBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "500px",
  padding: "5px 10px",
  [theme.breakpoints.down("md")]: {
    height: "65vh",
  },
}));

export const DescText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isTitle",
})(({ theme, isTitle }) => ({
  color: isTitle ? Colors.greenDialog : Colors.greyTextBlood,
  fontWeight: 600,
  padding: isTitle && "2px 5px 0px",
  display: isTitle && "inline-block",
  backgroundColor: isTitle && Colors.greyTextBlood,
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
}));

export const DescTextBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontWeight: 600,
  marginBottom: "4px",
}));

export const OrderContentTitleBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "page",
})(({ theme, page }) => ({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  width: "100%",
  paddingRight: "1px",
  gap: "2px",
  marginBottom: "2px",
  color: page ? Colors.greenDialog : Colors.orangeDialog,
}));

export const OrderContentTitleSmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isName",
})(({ theme, isName }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: isName ? "40%" : "15%",
  height: "30px",
  backgroundColor: Colors.greyTextBlood,
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
  fontWeight: 600,
  [theme.breakpoints.down("md")]: {
    height: "25px",
    fontSize: 14,
  },
}));

export const OrderContentBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  paddingRight: "1px",
  flexGrow: 1,
  width: "100%",
  overflowY: "auto",
}));

export const OrderDetailBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "40px",
  gap: "2px",
  marginBottom: "3px",
  color: Colors.greyTextBlood,
  [theme.breakpoints.down("md")]: {
    height: "35px",
  },
}));

export const OrderDetailSmBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "15%",
  height: "100%",
  fontSize: 18,
  fontWeight: 600,
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
  [theme.breakpoints.down("md")]: {
    fontSize: 16,
  },
}));
