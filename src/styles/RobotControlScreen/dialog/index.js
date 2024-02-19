import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { Colors } from "../../theme";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import AddIcon from "@mui/icons-material/Add";
import {
  OrderListExeListCheckAnimation,
  OrderListExeListDeleteAnimation,
  OrderListExeListWaitToExecuteAnimation,
} from "../../../animation";

export const OrderDialogBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  width: "100%",
  height: "70vh",
  [theme.breakpoints.down("sm")]: {
    height: "70vh",
  },
}));

export const OrderDialogSearchBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "left",
  alignItems: " center",
  paddingLeft: "5px",
  width: "100%",
  height: "9%",
}));

export const OrderDialogSearchSelect = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "15px",
  padding: "2px 8px",
  color: Colors.orangeDialog,
  backgroundColor: Colors.greyText,
  fontSize: "14px",
  fontWeight: 600,
  borderRadius: "10px",
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.1)",
  },
  "&:active": {
    transform: "scale(.95)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "1.5px 6px",
    fontSize: "12px",
  },
}));

export const OrderDialogListBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isFilter",
})(({ theme, isFilter }) => ({
  boxSizing: "border-box",
  flex: 1,
  padding: "0px 10px",
  width: "100%",
  height: isFilter ? "82%" : "90%",
  overflowY: "auto",
}));

export const OrderDialogDate = styled(Box)(({ theme }) => ({
  color: Colors.greyTextBlood,
  padding: "0px 1px",
  color: Colors.greyTextBlood,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));

export const OrderDialogDetial = styled(Box, {
  shouldForwardProp: (prop) => prop !== "itemSelect",
})(({ theme, itemSelect }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "55px",
  margin: "5px 0px",
  padding: "0px 10px",
  color: Colors.greyTextBlood,
  fontWeight: 600,
  backgroundColor: Colors.orangeDialogHover,
  border: itemSelect ? `3px solid ${Colors.blue600}` : "none",
  boxShadow: itemSelect ? `none` : "1px 1px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    border: itemSelect ? `3px solid ${Colors.blue600}` : "none",
    boxShadow: itemSelect ? `none` : `2px 2px ${Colors.blue600}`,
    cursor: "pointer",
    transform: "scale(1.01)",
    transition: "scale 0.2s ease-in-out",
  },
  [theme.breakpoints.down("sm")]: {
    height: "50px",
  },
}));

export const OrderDialogName = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));

export const OrderDialogTime = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));

export const OrderDialogBackBox = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  bottom: "3px",
  left: "50%",
  transform: "translateX(-50%)",
}));

//
export const OrderListExeListBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "500px",
}));

export const OrderListExeListTitleBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "8%",
  borderBottom: `1px solid ${Colors.brownHover}`,
  color: Colors.greyTextBlood,
  fontWeight: 600,
}));

export const IconButtonBack = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "10px",
  transform: "translateY(-50%)",
  padding: "6px",
}));

export const IconButtonSearch = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
  padding: "6px",
}));

export const OrderListExeListNameBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  width: "100%",
  height: "92%",
  overflowY: "auto",
}));

export const OrderListExeListNameBox2 = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "92%",
  padding: "4px 10px",
}));

export const OrderListExeListName = styled(Box, {
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "55px",
  backgroundColor: data[0] ? Colors.darkGreen : "transparent",
  borderTop: data[1] ? "none" : `1px solid ${Colors.brownHover}`,
  [theme.breakpoints.down("sm")]: {
    height: "50px",
  },
}));

export const IndexText = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== "finish",
})(({ theme, finish }) => ({
  position: "absolute",
  top: "50%",
  left: "10px",
  transform: "translateY(-50%)",
  width: "24px",
  height: "24px",
  fontSize: "14px",
  fontWeight: 600,
  color: finish ? Colors.darkGreen : Colors.orangeDialog,
  backgroundColor: finish ? Colors.green800 : Colors.greyText,
}));

export const InsertText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "finish",
})(({ theme, finish }) => ({
  position: "absolute",
  top: "50%",
  left: "44px",
  transform: "translateY(-50%)",
  padding: "2px 6px 1px",
  color: finish ? Colors.softGreen : Colors.orangeDialog,
  backgroundColor: finish ? Colors.green600 : Colors.blue500,
  fontWeight: 600,
  borderRadius: "2px",
}));

export const OrderText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "finish",
})(({ theme, finish }) => ({
  color: finish ? Colors.green800 : Colors.greyTextBlood,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));

export const WaitToExecuteText = styled(Typography)(({ theme }) => ({
  color: Colors.green800,
  backgroundColor: Colors.darkGreen,
  fontWeight: 600,
  padding: "1px 6px 0px",
  border: `2px solid ${Colors.darkGreen}`,
  borderRadius: "30px",
  animation: `${OrderListExeListWaitToExecuteAnimation} 1s ease-in-out infinite`,
}));

export const InsertBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderTop: `1px solid ${Colors.brownHover}`,
}));

export const InsertNowText = styled(Typography)(({ theme }) => ({
  margin: "10px 0px",
  fontWeight: 600,
  padding: "2px 4px 0px",
  color: Colors.blue500,
  backgroundColor: Colors.orangeDialog,
  border: `2px solid ${Colors.blue500}`,
  borderRadius: "2px",
  "&:hover": {
    color: Colors.orangeDialog,
    backgroundColor: Colors.blue500,
    transform: "scale(1.05)",
    cursor: "pointer",
  },
  "&:active": {
    transform: "scale(.95)",
  },
}));

export const OrderListExeListInsertName = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "60px",
  color: Colors.greyTextBlood,
  borderBottom: `1px solid ${Colors.brownHover}`,
  "&:hover": {
    // color: Colors.orangeDialog,
    backgroundColor: Colors.orangeDialogHover,
    cursor: "pointer",
  },
}));

export const ConfirmBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "space-evenly",
  width: "396px",
  padding: "10px 0px",
  borderBottom: `1px solid ${Colors.brownHover}`,
  [theme.breakpoints.down("sm")]: {
    width: "calc(70vw -4px)",
  },
}));

export const ConfirmBoxButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "colorArray",
})(({ theme, colorArray }) => ({
  padding: "6px 0px 2px",
  fontSize: 16,
  fontWeight: 600,
  color: Colors.greyTextBlood,
  backgroundColor: colorArray[0],
  "&:hover": {
    backgroundColor: colorArray[1],
  },
}));

export const IconButtonHelp = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "display",
})(({ theme, display }) => ({
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
  padding: "10px",
  opacity: display ? 1 : 0,
  transition: "opacity .2s ease-in-out",
  "&:hover": {
    backgroundColor: "#2195f354",
  },
}));

export const StyleHelpRoundedIcon = styled(HelpRoundedIcon)(({ theme }) => ({
  fontSize: 16,
}));

export const OrderListExeListCheck = styled(CheckCircleIcon)(({ theme }) => ({
  position: "absolute",
  top: "calc(50% - 15px)",
  right: "10px",
  fontSize: "26px",
  color: Colors.green800,
  animation: `${OrderListExeListCheckAnimation} 1s ease`,
}));

export const OrderListExeListInProgress = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
}));

export const OrderListExeListDelete = styled(DisabledByDefaultRoundedIcon)(
  ({ theme }) => ({
    position: "absolute",
    top: "calc(50% - 13px)",
    right: "10px",
    color: Colors.greyText,
    fontSize: "26px",
    "&:hover": {
      cursor: "pointer",
      animation: `${OrderListExeListDeleteAnimation} .3s`,
    },
    "&:active": {
      transform: "scale(0.8)",
    },
  })
);

export const IconButtonAdd = styled(IconButton)(({ theme }) => ({
  margin: "5px 0px",
  padding: "10px",
  "&:hover": {
    backgroundColor: "#2195f354",
  },
}));

export const OrderListExeListAdd = styled(AddIcon)(({ theme }) => ({
  color: Colors.greyTextBlood,
  fontSize: "20px",
}));

export const OrderListExeListButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isSingleOrder",
})(({ theme, isSingleOrder }) => ({
  display: "flex",
  justifyContent: isSingleOrder ? "center" : "space-evenly",
  alignItems: "center",
  width: "100%",
  height: "50%",
}));

// detail
export const DescText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isTitle",
})(({ theme, isTitle }) => ({
  color: isTitle ? Colors.lightOrange : Colors.greyText,
  fontSize: 14,
  fontWeight: !isTitle && 600,
  padding: isTitle && "2px 5px 0px",
  display: isTitle && "inline-block",
  backgroundColor: isTitle && Colors.greyText,
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
}));

export const DescTextBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  fontWeight: 600,
  marginBottom: "3px",
  paddingRight: "2px",
}));

export const OrderContentTitleBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexGrow: 1,
  alignItems: "center",
  width: "100%",
  paddingRight: "1px",
  color: Colors.greyText,
  gap: "2px",
  marginBottom: "2px",
  fontSize: 14,
}));

export const OrderContentTitleSmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isName",
})(({ theme, isName }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: isName ? "40%" : "15%",
  height: "30px",
  color: Colors.lightOrange,
  backgroundColor: Colors.greyText,
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
}));

export const OrderContentBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  paddingRight: "1px",
  flexGrow: 1,
  width: "100%",
  height: "100%",
  overflowY: "auto",
}));

export const OrderDetailBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "35px",
  gap: "2px",
  marginBottom: "3px",
}));

export const OrderDetailSmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isName",
})(({ theme, isName }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: isName ? "40%" : "15%",
  height: "100%",
  backgroundColor: isName && Colors.orangeDialogHover,
  color: Colors.greyText,
  fontSize: "14",
  fontWeight: 600,
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
}));
