import { Box, Typography, styled } from "@mui/material";
import { Colors } from "../theme";

export const OrderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
}));

export const IsTrainingText = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "-2px",
  right: "0px",
  transform: "translate(-40%, 270%)",
  color: Colors.blue700,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    top: "2px",
    right: "0px",
    fontSize: 12,
  },
}));

export const DescText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isTitle",
})(({ theme, isTitle }) => ({
  color: isTitle ? Colors.lightOrange : Colors.greyTextBlood,
  fontWeight: !isTitle && 600,
  padding: isTitle && "2px 8px 0px",
  display: isTitle && "inline-block",
  backgroundColor: isTitle && Colors.greyTextBlood,
  borderRadius: "20px",
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
}));

export const DescRectText = styled(Typography)(({ theme }) => ({
  color: Colors.lightOrange,
  padding: "2px 8px 0px",
  display: "inline-block",
  backgroundColor: Colors.greyTextBlood,
  borderRadius: "2px",
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
}));

export const DescTextBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontWeight: 600,
  marginBottom: "3px",
  paddingRight: "2px",
}));

export const OrderContentTitleBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  width: "100%",
  paddingRight: "1px",
  color: Colors.greyTextBlood,
  gap: "2px",
  marginBottom: "2px",
}));

export const OrderContentTitleSmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isName",
})(({ theme, isName }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: isName ? "40%" : "15%",
  height: "30px",
  color: Colors.lightOrange,
  backgroundColor: Colors.greyTextBlood,
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
  [theme.breakpoints.down("md")]: {
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
}));

export const OrderDetailSmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isName",
})(({ theme, isName }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: isName ? "40%" : "15%",
  height: "100%",
  color: Colors.greyTextBlood,
  backgroundColor: isName && Colors.lightOrangeHover,
  fontSize: "18px",
  fontWeight: 600,
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
  [theme.breakpoints.down("md")]: {
    fontSize: 16,
  },
}));
