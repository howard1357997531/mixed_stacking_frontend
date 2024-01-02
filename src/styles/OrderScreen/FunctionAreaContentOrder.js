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
  right: 0,
  transform: "translate(-40%, 270%)",
  color: Colors.blue700,
  fontWeight: 600,
}));

export const DescText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isTitle",
})(({ theme, isTitle }) => ({
  color: isTitle ? Colors.lightOrange : Colors.greyText,
  fontWeight: !isTitle && 600,
  padding: isTitle && "2px 5px 0px",
  display: isTitle && "inline-block",
  backgroundColor: isTitle && Colors.brown200,
}));

export const DescTextBox = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: "3px",
}));

export const OrderContentTitleBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  width: "100%",
  paddingRight: "1px",
  color: Colors.greyText,
  gap: "2px",
}));

export const OrderContentTitleSmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isName",
})(({ theme, isName }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: isName ? "40%" : "15%",
  height: "40px",
  backgroundColor: Colors.brown200,
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
  fontWeight: 600,
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
  margin: "3px 0px",
}));

export const OrderDetailSmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isName",
})(({ theme, isName }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: isName ? "40%" : "15%",
  height: "100%",
  backgroundColor: isName && Colors.lightOrangeHover,
  color: Colors.greyText,
  fontWeight: 600,
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
}));
