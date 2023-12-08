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
  height: "70px",
}));

export const AiResultSmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "cumColor",
})(({ theme, cumColor }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "90%",
  height: "80%",
  backgroundColor: cumColor,
  borderRadius: "20px",
}));

export const AiResultOrder = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "35%",
  height: "100%",
}));

export const StyleAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== "cumColor",
})(({ theme, cumColor }) => ({
  width: "35px",
  height: "35px",
  backgroundColor: Colors.greyTextBlood,
  color: cumColor,
  fontSize: 16,
}));

export const AiResultName = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "65%",
  height: "100%",
  color: Colors.greyTextBlood,
  fontWeight: 600,
}));
