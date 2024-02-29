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
import ReportIcon from "@mui/icons-material/Report";
import {
  OrderListExeListCheckAnimation,
  OrderListExeListDeleteAnimation,
  OrderListExeListWaitToExecuteAnimation,
} from "../../../animation";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";

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
  padding: "2px 8px 1.5px",
  color: Colors.orangeDialog,
  backgroundColor: Colors.greyTextBlood,
  fontSize: "14px",
  borderRadius: "10px",
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: Colors.grey900,
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
  height: "100%",
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
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));

export const OrderListExeListBottomBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "9%",
  borderTop: `1px solid ${Colors.brownHover}`,
  color: Colors.orangeDialog,
  backgroundColor: Colors.red800,
  fontWeight: 600,
  "&:hover": {
    cursor: "pointer",
    backgroundColor: Colors.red900,
  },
  [theme.breakpoints.down("sm")]: {
    height: "10%",
  },
}));

export const StopAllText = styled(Typography)(({ theme }) => ({
  margin: "0px 5px",
  paddingTop: "2px",
  fontSize: 24,
  fontWeight: 600,
  [theme.breakpoints.down("md")]: {
    fontSize: 18,
  },
}));

export const StyleReportIcon = styled(ReportIcon)(({ theme }) => ({
  color: Colors.orangeDialog,
  fontSize: 24,
  "&:hover": {
    animation: `${OrderListExeListCheckAnimation} 1s ease`,
  },
  [theme.breakpoints.down("md")]: {
    fontSize: 18,
  },
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
  flex: 1,
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
  backgroundColor: data[0]
    ? Colors.softOrange
    : data[1]
    ? Colors.darkGreen
    : "transparent",
  borderTop: data[2] ? "none" : `1px solid ${Colors.brownHover}`,
  [theme.breakpoints.down("sm")]: {
    height: "50px",
  },
}));

export const IndexText = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  position: "absolute",
  top: "50%",
  left: "8px",
  transform: "translateY(-50%)",
  width: "24px",
  height: "24px",
  fontSize: "14px",
  fontWeight: 600,
  color: data[0]
    ? Colors.softOrange
    : data[1]
    ? Colors.darkGreen
    : Colors.orangeDialog,
  backgroundColor: data[0]
    ? Colors.greyTextBlood
    : data[1]
    ? Colors.green
    : Colors.greyTextBlood,
  [theme.breakpoints.down("sm")]: {
    width: "20px",
    height: "20px",
    fontSize: "12px",
  },
}));

export const InsertText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  position: "absolute",
  top: "50%",
  left: "38px",
  transform: "translateY(-50%)",
  padding: "2px 6px 1px",
  color: data[0]
    ? Colors.softOrange
    : data[1]
    ? Colors.darkGreen
    : Colors.orangeDialog,
  backgroundColor: data[0]
    ? Colors.greyTextBlood
    : data[1]
    ? Colors.green
    : Colors.blue500,
  fontSize: 14,
  fontWeight: 600,
  borderRadius: "2px",
  [theme.breakpoints.down("sm")]: {
    left: "33px",
    fontSize: 12,
  },
}));

export const OrderText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  color: data[0]
    ? Colors.greyTextBlood
    : data[1]
    ? Colors.green
    : Colors.greyTextBlood,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));

export const WaitToExecuteText = styled(Typography)(({ theme }) => ({
  position: "absolute",
  right: "35px",
  color: Colors.green,
  backgroundColor: Colors.darkGreen,
  fontSize: 14,
  fontWeight: 600,
  padding: "1px 4px 0px",
  border: `2px solid ${Colors.darkGreen}`,
  borderRadius: "30px",
  animation: `${OrderListExeListWaitToExecuteAnimation} 1s ease-in-out infinite`,
  [theme.breakpoints.down("sm")]: {
    right: "30px",
    fontSize: 12,
  },
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
  padding: "2px 6px 1px",
  color: Colors.orangeDialog,
  backgroundColor: Colors.blue500,
  borderRadius: "2px",
  "&:hover": {
    transform: "scale(1.05)",
    cursor: "pointer",
  },
  "&:active": {
    transform: "scale(.95)",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));

export const OrderListExeListInsertName = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "55px",
  color: Colors.greyTextBlood,
  borderBottom: `1px solid ${Colors.brownHover}`,
  "&:hover": {
    backgroundColor: Colors.orangeDialogHover,
    cursor: "pointer",
  },
  [theme.breakpoints.down("sm")]: {
    height: "50px",
  },
}));

export const ConfirmBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "space-evenly",
  width: "calc(100% - 4px)",
  padding: "10px 0px",
  borderBottom: `1px solid ${Colors.brownHover}`,
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
  [theme.breakpoints.down("md")]: {
    padding: "3px 0px",
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
  color: Colors.greyTextBlood,
}));

export const OrderListExeListCheck = styled(CheckCircleIcon)(({ theme }) => ({
  position: "absolute",
  top: "calc(50% - 12px)",
  right: "8px",
  fontSize: "24px",
  color: Colors.green,
  animation: `${OrderListExeListCheckAnimation} 1s ease`,
  [theme.breakpoints.down("sm")]: {
    top: "calc(50% - 10px)",
    fontSize: 20,
  },
}));

export const OrderListExeListReset = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "8px",
  transform: "translateY(-50%)",
  fontSize: "14px",
  fontWeight: 600,
  padding: "2px 6px 1px",
  color: Colors.softOrange,
  backgroundColor: Colors.greyTextBlood,
  borderRadius: "2px",
  // border: `2px solid ${Colors.greyTextBlood}`,
  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
  },
}));

export const OrderListExeListInProgress = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
}));

export const OrderListExeListDelete = styled(DisabledByDefaultOutlinedIcon)(
  ({ theme }) => ({
    position: "absolute",
    top: "calc(50% - 12px)",
    right: "8px",
    color: Colors.greyTextBlood,
    fontSize: "24px",
    "&:hover": {
      cursor: "pointer",
      animation: `${OrderListExeListDeleteAnimation} .3s`,
    },
    "&:active": {
      transform: "scale(0.8)",
    },
    [theme.breakpoints.down("sm")]: {
      top: "calc(50% - 10px)",
      fontSize: 20,
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
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
  },
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
  color: isTitle ? Colors.lightOrange : Colors.greyTextBlood,
  fontSize: 14,
  fontWeight: !isTitle && 600,
  padding: isTitle && "2px 5px 0px",
  display: isTitle && "inline-block",
  backgroundColor: isTitle && Colors.greyTextBlood,
  borderRadius: "2px",
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
  color: Colors.greyTextBlood,
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
  backgroundColor: Colors.greyTextBlood,
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
  color: Colors.greyTextBlood,
  fontSize: "14",
  fontWeight: 600,
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
}));
