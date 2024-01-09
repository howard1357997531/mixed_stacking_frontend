import { Box, Typography, styled } from "@mui/material";
import { Colors } from "../theme";

export const DeleteBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
}));

export const DeleteTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "5px",
}));

export const DeleteCount = styled(Typography)(({ theme }) => ({
  color: Colors.greyText,
  marginRight: "10px",
  padding: "0px 1px",
  fontWeight: 600,
}));

export const DeleteResetBtn = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: Colors.lightOrange,
  backgroundColor: Colors.grey600,
  borderRadius: "10px",
  width: "40px",
  height: "25px",
  fontSize: "12px",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.05)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));

export const DeleteSelectBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  paddingRight: "2px",
  flexGrow: 1,
  width: "100%",
  overflowY: "auto",
}));

export const DeleteSelectSmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isFirst",
})(({ theme, isFirst }) => ({
  boxSizing: "border-box",
  position: "relative",
  display: "flex",
  width: "100%",
  height: "60px",
  marginTop: !isFirst ? "4px" : "0px",
  borderRadius: "5px",
  backgroundColor: Colors.lightOrangeHover,
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
  // "&:hover": {
  //   cursor: "pointer",
  //   border: `1px solid ${Colors.purple}`,
  //   boxShadow: `inset 0px 0px 2px ${Colors.purple}`,
  // },
}));

export const DeleteOrderName = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "inherit",
  color: Colors.greyText,
}));
