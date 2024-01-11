import { Avatar, Box, styled } from "@mui/material";
import { Colors } from "../theme";

export const OrderBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "flex-start",
  width: "100%",
  height: "500px",
  overflowY: "auto",
  paddingTop: "5px",
}));

export const AiResultBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "33.33%",
  height: "60px",
  marginBottom: "10px",
}));

export const AiResultSmBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "92%",
  height: "100%",
  backgroundColor: Colors.lightOrangeHover,
  borderRadius: "10px",
}));

export const AiResultOrder = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "35%",
  height: "100%",
}));

export const StyleAvatar = styled(Avatar)(({ theme }) => ({
  width: "28px",
  height: "28px",
  backgroundColor: Colors.greyTextBlood,
  color: "#fff",
  fontSize: 14,
}));

export const AiResultName = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "65%",
  height: "100%",
  color: Colors.greyTextBlood,
  paddingRight: "30px",
  fontSize: 18,
  fontWeight: 600,
}));
