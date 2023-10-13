import { Avatar, Box, Button, Stack, Typography, styled } from "@mui/material";
import { Colors } from "../theme";

export const OrderContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "calc(100vh - 100px)",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    height: "initial",
  },
}));

export const OrderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  width: "80%",
  height: "90%",
  [theme.breakpoints.down("lg")]: {
    width: "90%",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    height: "initial",
    padding: "30px 0px",
  },
}));

export const OrderListBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "48%",
  height: "100%",
  padding: "25px",
  paddingTop: "10px",
  boxSizing: "border-box",
  borderRadius: "20px",
  backgroundColor: Colors.lightOrange,
  [theme.breakpoints.down("lg")]: {
    width: "48%",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    width: "70vw",
    height: "60vh",
  },
  [theme.breakpoints.down("sm")]: {
    width: "80vw",
  },
}));

export const FunctionAreaBox = styled(Box)(({ theme }) => ({
  // display: functionBoxOpen ? "flex" : "none",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "48%",
  height: "100%",
  padding: "20px",
  boxSizing: "border-box",
  borderRadius: "20px",
  padding: "25px",
  paddingTop: "10px",
  backgroundColor: Colors.lightOrange,
  // opacity: functionBoxOpen ? 100 : 0,
  opacity: 100,
  transition: "opacity 0.5s ease-in-out",
  [theme.breakpoints.down("lg")]: {
    width: "48%",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    width: "70vw",
    height: "60vh",
  },
  [theme.breakpoints.down("sm")]: {
    width: "80vw",
  },
}));

export const OrderListNav = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "10%",
}));

export const OrderListSearch = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  flexGrow: 1,
  height: "100%",
}));

export const OrderListDropdown = styled(Box)(({ theme }) => ({
  width: "30%",
  height: "100%",
}));

export const OrderListUploadFile = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
  width: "30%",
  height: "100%",
}));

export const OrderListContentBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "90%",
  overflowY: "auto",
  border: `1px solid ${Colors.grey}`,
}));

export const OrderListDetial = styled(Box)(({ theme }) => ({
  display: "flex",
  // justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "60px",
}));

export const OrderListName = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "33%",
  height: "100%",
}));

export const OrderListDate = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "33%",
  height: "100%",
}));

export const OrderListState = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "33%",
  height: "100%",
}));

export const OrderListStateText = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "60%",
  padding: "8px 0px",
  borderRadius: "20px",
  fontSize: "14px",
}));
