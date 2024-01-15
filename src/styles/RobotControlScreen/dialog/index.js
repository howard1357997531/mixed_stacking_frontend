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
  height: "500px",
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
  padding: "0px 8px",
  height: "50%",
  color: Colors.brown,
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
}));

export const OrderDialogDetial = styled(Box, {
  shouldForwardProp: (prop) => prop !== "itemSelect",
})(({ theme, itemSelect }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "60px",
  margin: "5px 0px",
  padding: "0px 10px",
  color: Colors.greyText,
  fontWeight: 600,
  backgroundColor: Colors.lightbrown,
  border: itemSelect ? `3px solid ${Colors.blue700}` : "none",
  boxShadow: itemSelect ? `none` : "1px 1px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    border: itemSelect ? `3px solid ${Colors.blue700}` : "none",
    boxShadow: itemSelect ? `none` : `1px 1px ${Colors.blue700}`,
    cursor: "pointer",
    transform: "scale(1.01)",
    transition: "scale 0.2s ease-in-out",
  },
}));

export const OrderDialogName = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  color: Colors.greyTextBlood,
  fontWeight: 600,
}));

export const OrderDialogTime = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  color: Colors.greyTextBlood,
  fontWeight: 600,
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
  color: Colors.brownText,
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
  overflow: "auto",
}));

export const OrderListExeListName = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "60px",
  borderTop: `1px solid ${Colors.brownHover}`,
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
  fontSize: "16px",
  fontWeight: 600,
  color: Colors.brown,
  backgroundColor: finish ? Colors.greyTextBlood : Colors.greyTextBlood,
  // border: `1px solid ${finish ? Colors.green800 : Colors.greyTextBlood}`,
}));

export const InsertText = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "44px",
  transform: "translateY(-50%)",
  padding: "1px 3px 0px",
  color: Colors.brown,
  backgroundColor: Colors.lightYellow,
  // border: `1px solid ${Colors.lightYellow}`,
}));

export const OrderText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "finish",
})(({ theme, finish }) => ({
  color: finish ? Colors.green800 : Colors.greyTextBlood,
  fontWeight: 600,
}));

export const WaitToExecuteText = styled(Typography)(({ theme }) => ({
  color: Colors.brown,
  backgroundColor: Colors.purple400,
  fontWeight: 600,
  padding: "1px 3px 0px",
  border: `2px solid ${Colors.purple400}`,
  animation: `${OrderListExeListWaitToExecuteAnimation} 1s ease-in-out infinite`,
}));

export const InsertNowText = styled(Typography)(({ theme }) => ({
  display: "inline-block",
  margin: "10px 0px",
  marginLeft: "50%",
  transform: "translateX(-50%)",
  color: Colors.lightYellow,
  // fontWeight: 600,
  padding: "2px 4px 0px",
  border: `1px solid ${Colors.lightYellow}`,
  "&:hover": {
    color: Colors.brown,
    backgroundColor: Colors.lightYellow,
    cursor: "pointer",
  },
  // animation: `${OrderListExeListWaitToExecuteAnimation} 1s ease-in-out infinite`,
}));

export const OrderListExeListInsertName = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "60px",
  color: Colors.greyTextBlood,
  // fontWeight: 600,
  borderBottom: `1px solid ${Colors.brownHover}`,
  "&:hover": {
    color: Colors.brown200,
    backgroundColor: Colors.brownHover,
    cursor: "pointer",
  },
}));

export const ConfirmBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "space-evenly",
  width: "397px",
  padding: "10px 0px",
  borderBottom: `1px solid ${Colors.brownHover}`,
}));

export const ConfirmBoxButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "colorArray",
})(({ theme, colorArray }) => ({
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
    backgroundColor: "#00968733",
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
  color: Colors.green600,
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
    color: Colors.red800,
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
  marginLeft: "50%",
  marginTop: "5px",
  marginBottom: "5px",
  padding: "10px",
  transform: "translate(-50%)",
  "&:hover": {
    backgroundColor: "#fff17644",
  },
}));

export const OrderListExeListAdd = styled(AddIcon)(({ theme }) => ({
  color: Colors.greyText,
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
