import { Avatar, Box, Button, Typography, styled } from "@mui/material";
import { Colors } from "../theme";

export const OrderBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  paddingTop: "5px",
  paddingLeft: "10px",
  width: "100%",
  height: "500px",
  [theme.breakpoints.down("md")]: {
    height: "65vh",
  },
}));

export const AiResultImageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100%",
}));

export const AiResultImageBackBtn = styled(Button, {
  shouldForwardProp: (prop) => prop !== "page",
})(({ theme, page }) => ({
  marginTop: "20px",
  width: "20%",
  fontWeight: 600,
  color: page ? Colors.greenDialog : Colors.orangeDialog,
  backgroundColor: Colors.grey600,
  "&:hover": {
    backgroundColor: Colors.greyText,
  },
  [theme.breakpoints.down("md")]: {
    padding: "5px 0px 3px",
    marginTop: "15px",
  },
}));

export const AiResultImageBtn = styled(Box, {
  shouldForwardProp: (prop) => prop !== "page",
})(({ theme, page }) => ({
  marginLeft: "10px",
  padding: "3px 6px",
  fontSize: "14px",
  color: page ? Colors.greyText : Colors.orangeDialog,
  backgroundColor: page ? Colors.greenDialogHover : Colors.blue500,
  borderRadius: "10px",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.05)",
  },
  "&:active": {
    transform: "scale(.95)",
  },
}));

export const DescTextBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontWeight: 600,
  marginBottom: "6px",
}));

export const DescText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isTitle",
})(({ theme, isTitle }) => ({
  color: isTitle ? Colors.greenDialog : Colors.greyText,
  fontWeight: !isTitle && 600,
  padding: isTitle && "2px 5px 0px",
  display: isTitle && "inline-block",
  backgroundColor: isTitle && Colors.greyText,
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
}));

export const AiResultBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  width: "100%",
  overflowY: "auto",
}));

export const AiResultIndex = styled(Typography)(({ theme }) => ({
  marginBottom: "5px",
  color: Colors.greyText,
  fomtSize: 18,
  fontWeight: 600,
}));

export const AiResultDataBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexWrap: "wrap",
  gap: "11px",
  width: "100%",
  marginBottom: "10px",
  paddingRight: "2px",
  [theme.breakpoints.down("sm")]: {
    gap: "10px",
    paddingRight: "4px",
  },
}));

export const AiResultDataSmBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "calc(33% - 8px)",
  [theme.breakpoints.down("sm")]: {
    width: "calc(50% - 8px)",
  },
}));

export const AiResultDataSmmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "page",
})(({ theme, page }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "55px",
  borderRadius: "10px",
  backgroundColor: page ? Colors.greenDialogHover : Colors.orangeDialogHover,
  boxShadow: "1px 1px rgba(0, 0, 0, 0.2)",
  [theme.breakpoints.down("md")]: {
    height: "50px",
  },
}));

export const AiResultAvatar = styled(Avatar)(({ theme }) => ({
  marginLeft: "20px",
  width: "30px",
  height: "30px",
  fontSize: "14px",
  color: "#fff",
  [theme.breakpoints.down("md")]: {
    width: "25px",
    height: "25px",
    fontSize: "12px",
  },
}));

export const AiResultText = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  textAlign: "center",
  color: Colors.greyText,
  fontSize: 18,
  fontWeight: 600,
  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
  },
}));
