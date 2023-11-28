import { Box, Stack, Typography, styled } from "@mui/material";

export const StyleStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  height: "calc(100vh - 100px)",
  padding: "0px 100px",
  [theme.breakpoints.down("lg")]: {
    padding: "0px 20px",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    height: "initial",
    padding: "30px 20px",
  },
}));
export const StyleBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  position: "relative",
  height: "70vh",
  width: "100%",
  padding: "30px 50px",
  [theme.breakpoints.down("md")]: {
    height: "80vh",
  },
  [theme.breakpoints.down("sm")]: {
    height: "60vh",
  },
}));
export const StyleTitle = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "-36px",
  left: "50px",
  fontSize: "40px",
  fontWeight: 600,
}));
export const StyleItemSixStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: "10px",
  height: "50%",
}));
export const StyleItemBox = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "20%",
  // padding: "30px 50px",
  borderRadius: "20px",
}));
export const StyleItemStack = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  width: "100%",
  height: "100%",
}));
export const StyleLittleBox_60 = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60%",
  width: "100%",
}));
export const StyleLittleBox_20 = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "18%",
  width: "100%",
}));
