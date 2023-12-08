import { Box, Typography, styled } from "@mui/material";
import { Colors } from "../theme";

export const OrderBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  width: "100%",
  height: "500px",
  padding: "2px 10px",
  overflowY: "auto",
}));

export const OrderTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: Colors.greyTextBlood,
  marginTop: "10px",
}));

export const OrderDescBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "20px",
}));

export const OrderCount = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "2px",
  transform: "translateY(-50%)",
  color: Colors.greyTextBlood,
  fontWeight: 600,
}));

export const OrderDate = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "2px",
  transform: "translateY(-50%)",
  color: Colors.greyTextBlood,
}));

export const OrderDetailBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isTitle",
})(({ theme, isTitle }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: isTitle ? " 30px" : "40px",
  borderBottom: `1px solid ${Colors.brown200}`,
  color: isTitle ? Colors.brown100 : Colors.greyTextBlood,
  backgroundColor: isTitle && Colors.brownHover,
  fontSize: isTitle && "14px",
  fontWeight: !isTitle && 600,
}));

export const OrderDetailSmBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "20%",
  height: "100%",
}));
