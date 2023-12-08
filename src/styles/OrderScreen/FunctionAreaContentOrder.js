import { Box, Typography, styled } from "@mui/material";
import { Colors } from "../theme";

export const OrderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
}));

export const OrderTitleBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: "2px 10px",
  color: "#fff",
  backgroundColor: Colors.greyBorder,
  fontWeight: 600,
}));

export const OrderTitleCenterBox = styled(Typography)(({ theme }) => ({
  color: Colors.greyTextBlood,
  fontSize: 18,
  fontWeight: 600,
  paddingTop: 2,
}));

export const OrderTitleLeftBox = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "55%",
  left: "10px",
  transform: "translateY(-50%)",
  color: Colors.greyTextBlood,
  fontWeight: 600,
}));

export const OrderTitleRightBox = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "55%",
  right: "10px",
  transform: "translateY(-50%)",
  color: Colors.greyTextBlood,
}));

export const OrderTitle2Box = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: "2px 8px",
  color: "#fff",
  backgroundColor: Colors.brownHover,
}));

export const OrderTitle2SmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isName",
})(({ theme, isName }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
}));

export const OrderContentBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  padding: "4px 8px",
  flexGrow: 1,
  width: "100%",
  overflowY: "auto",
}));

export const OrderDetailBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isFirst",
})(({ theme, isFirst }) => ({
  boxSizing: "border-box",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "60px",
  marginTop: !isFirst ? "4px" : "0px",
  borderRadius: "5px",
  backgroundColor: Colors.lightOrangeHover,
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
}));

export const OrderDetailSmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isName",
})(({ theme, isName }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "20%",
  height: "100%",
  color: isName ? Colors.brownText : Colors.greyTextBlood,
  fontWeight: 600,
}));
