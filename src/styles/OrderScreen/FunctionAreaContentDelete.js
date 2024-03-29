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
  color: Colors.greyTextBlood,
  marginRight: "10px",
  padding: "0px 1px",
  fontWeight: 600,
  [theme.breakpoints.down("md")]: {
    fontSize: "14px",
  },
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
  paddingRight: "6px",
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
  alignItems: "center",
  width: "100%",
  height: "55px",
  marginTop: !isFirst ? "7px" : "0px",
  borderRadius: "5px",
  backgroundColor: Colors.lightOrangeHover,
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
  [theme.breakpoints.down("md")]: {
    height: "50px",
    fontSize: "14px",
  },
}));

export const DeleteOrderName = styled(Box)(({ theme }) => ({
  marginLeft: "20px",
  color: Colors.greyTextBlood,
  fontWeight: 600,
}));
