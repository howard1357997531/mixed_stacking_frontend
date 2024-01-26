import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { Colors } from "../theme";
import { blueGrey, brown, deepPurple, grey, red } from "@mui/material/colors";
import { OrderListExeListWaitToExecuteAnimation } from "../../animation";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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

export const OrderListBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mode",
})(({ theme, mode }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "48%",
  height: "100%",
  padding: "5px 25px 20px",
  boxSizing: "border-box",
  borderRadius: "10px",
  backgroundColor: mode ? Colors.green : Colors.lightOrange,
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

export const OrderSwitchBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "-37px",
  left: "0%",
  display: "flex",
  gap: "4px",
  zIndex: 0.5,
}));

export const OrderSwitchBtn = styled(Box)(({ theme }) => ({
  padding: "5px 10px",
  color: Colors.greyText,
  background: Colors.lightOrange,
  fontSize: 18,
  fontWeight: 600,
  borderRadius: "10px",
  // border: `1px solid ${Colors.greyText}`,
  // borderTopLeftRadius: "20px",
  // borderTopRightRadius: "20px",
  boxShadow: "1px 1px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.03)",
    transition: "all .2s ease-in-out",
  },
  "&:active": {
    transform: "scale(.95)",
  },
}));

export const OrderListNav = styled(Box)(({ theme }) => ({
  display: "flex",
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

export const SearchSelect = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mode",
})(({ theme, mode }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0px 10px",
  padding: "0px 8px",
  height: "50%",
  color: mode ? Colors.green : Colors.lightOrange,
  backgroundColor: Colors.grey600,
  fontSize: "14px",
  fontWeight: 600,
  borderRadius: "10px",
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: Colors.greyText,
  },
}));

export const OrderListNavBtnBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "noPadding",
})(({ theme, noPadding }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "right",
  paddingTop: noPadding ? "15px" : "15px",
  paddingRight: noPadding ? "0px" : "10px",
  width: "200px",
  height: "100%",
  gap: "5px",
}));

export const OrderListNavBtn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "15px",
  borderRadius: "10px",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.1)",
  },
  "&:active": {
    transform: "scale(.95)",
  },
}));

export const OrderListNavRowBtn = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "75%",
  padding: "0px 5px",
  borderRadius: "10px",
  border: `2px solid ${Colors.blue500}`,
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.05)",
    // backgroundColor: Colors.greyText,
  },
}));

export const OrderListNavBtnText = styled(Typography)(({ theme }) => ({
  color: Colors.greyTextBlood,
  fontSize: 14,
  fontWeight: 600,
}));

export const OrderListNavBtn2 = styled(Button)(({ theme }) => ({
  marginLeft: "10px",
  height: "60%",
  color: Colors.lightOrange,
  backgroundColor: Colors.darkGreen,
  fontSize: "16px",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: Colors.darkGreen,
    transform: "scale(1.05)",
    transition: "all 0.2s ease-in-out",
  },
}));

export const OrderListContentErrorMsgBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
}));

export const OrderListContentMsg = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: Colors.greyText,
  fontWeight: 600,
}));

export const OrderListContentBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isFilter",
})(({ theme, isFilter }) => ({
  position: "relative",
  width: "100%",
  height: isFilter ? "85%" : "90%",
  overflowY: "auto",
  boxSizing: "border-box",
  paddingLeft: "3px",
  paddingRight: "4px",
}));

export const BackBtnBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "10%",
}));

export const BackBtnIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  bottom: "8px",
  left: "50%",
  transform: "translateX(-50%)",
}));

export const OrderListDateBox = styled(Box)(({ theme }) => ({
  // padding: "5px 5px",
  // border: `1px solid ${Colors.greyBorder}`,
  // backgroundColor: Colors.brown200,
  // textAlign: "center",
  // boxShadow: `inset 0px 0px 2px ${Colors.greyBorder}`,
  // marginBottom: "5px",
  // borderBottom: `1px solid ${Colors.greyBorder}`,
}));

export const OrderListDate = styled(Typography)(({ theme }) => ({
  color: Colors.greyText,
  padding: "0px 1px",
}));

export const OrderListDetial = styled(Box, {
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "60px",
  margin: "5px 0px",
  padding: "0px 10px",
  color: Colors.greyText,
  fontWeight: 600,
  backgroundColor: data[1],
  border: data[0] ? `2px solid ${data[2]}` : "none",
  boxShadow: data[0] ? `none` : "1px 1px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    border: data[0] ? `2px solid ${data[2]}` : "none",
    boxShadow: data[0] ? `none` : `1px 1px ${data[2]}`,
    cursor: "pointer",
    transform: "scale(1.01)",
    transition: "scale 0.2s ease-in-out",
  },
}));

export const OrderListName = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  width: "100%",
  height: "100%",
  color: Colors.greyText,
  // fontSize: "18px",
}));

export const NewText = styled(Typography)(({ theme }) => ({
  marginRight: "5px",
  color: Colors.red800,
}));

export const OrderListNameSelect = styled(Box, {
  shouldForwardProp: (prop) => prop !== "itemSelect",
})(({ theme, itemSelect }) => ({
  marginRight: "10px",
  width: "15px",
  height: "15px",
  backgroundColor: itemSelect && Colors.blue500,
  borderRadius: "50%",
  border: `1px solid ${Colors.brown200}`,
}));

export const OrderListState = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
  width: "100%",
  height: "100%",
}));

export const OrderListStateText = styled(Typography)(({ theme }) => ({
  display: "inline-block",
  fontSize: "14px",
  fontWeight: 600,
}));

export const MultipleOrderBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "itemSelect",
})(({ theme, itemSelect }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "60px",
  backgroundColor: itemSelect ? Colors.lightbrown200 : null,
  "&:hover": {
    backgroundColor: itemSelect
      ? Colors.lightbrown200
      : Colors.lightOrangeHover,
    cursor: "pointer",
  },
}));

export const MultipleOrderName = styled(Box, {
  shouldForwardProp: (prop) => prop !== "itemSelect",
})(({ theme, itemSelect }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  color: itemSelect ? Colors.grey100 : Colors.greyText,
}));

export const MultipleOrderDate = styled(Box, {
  shouldForwardProp: (prop) => prop !== "itemSelect",
})(({ theme, itemSelect }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  height: "100%",
  color: itemSelect ? "#fff" : Colors.greyText,
}));

export const MultipleOrderContentTitle = styled(Typography)(({ theme }) => ({
  margin: "10px 0px",
  textAlign: "center",
  color: Colors.brownHover,
}));

export const MultiCreateDetial = styled(Box, {
  shouldForwardProp: (prop) => prop !== "itemSelect",
})(({ theme, itemSelect }) => ({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "60px",
  color: itemSelect ? Colors.grey100 : Colors.greyText,
  backgroundColor: itemSelect ? Colors.lightbrown200 : null,
  fontWeight: 600,
  "&:hover": {
    backgroundColor: itemSelect
      ? Colors.lightbrown200
      : Colors.lightOrangeHover,
    cursor: "pointer",
  },
}));

export const MultiCreateName = styled(Box, {
  shouldForwardProp: (prop) => prop !== "itemSelect",
})(({ theme, itemSelect }) => ({
  boxSizing: "border-box",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
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

// functionArea
export const FunctionAreaBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mode",
})(({ theme, mode }) => ({
  position: "relative",
  display: ["close", "noMultipleOrder"].includes(mode) ? "none" : "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "48%",
  height: "100%",
  boxSizing: "border-box",
  borderRadius: "10px",
  padding: "5px 25px 20px",
  backgroundColor: ["multipleOrder", "multipleOrderCreate"].includes(mode)
    ? Colors.green
    : Colors.lightOrange,
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

export const FunctionAreaNav = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
  gap: "5px",
  width: "100%",
  height: "10%",
}));

export const CloseIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  left: 0,
}));

export const FunctionAreaNavBtn = styled(Button, {
  shouldForwardProp: (prop) => prop !== "colorData",
})(({ theme, colorData }) => ({
  position: "absolute",
  right: 0,
  height: "60%",
  fontSize: "16px",
  fontWeight: 600,
  color: Colors.lightOrange,
  textTransform: "initial",
  backgroundColor: colorData,
  animation:
    colorData === Colors.purple &&
    `${OrderListExeListWaitToExecuteAnimation} 1s infinite`,
  "&:hover": {
    backgroundColor: colorData,
    transform: "scale(1.05)",
    transition: "all 0.2s ease-in-out",
  },
}));

export const FunctionAreaContentBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "orderSelectMode",
})(({ theme, orderSelectMode }) => ({
  width: "100%",
  height: "90%",
  boxSizing: "border-box",
  // padding: ["orderDetail"].includes(orderSelectMode) ? 10 : 0,
}));

export const FunctionAreaContentTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: 600,
  color: Colors.brownHover,
  marginTop: "10px",
}));

export const AiIsTraingGifText = styled(Typography)({
  position: "absolute",
  top: "57%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: Colors.blue,
  fontSize: "24px",
  fontWeight: 600,
});

export const OrderListDetailBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isTitle",
})(({ theme, isTitle }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: isTitle ? " 30px" : "40px",
  borderBottom: `1px solid ${Colors.brown200}`,
  color: isTitle ? "#fff" : Colors.greyTextBlood,
  backgroundColor: isTitle && Colors.brownHover,
  fontSize: isTitle && "14px",
  fontWeight: !isTitle && 600,
}));

export const OrderListDetailSmallBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "20%",
  height: "100%",
}));

export const AiResultImageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100%",
}));

export const AiResultImageBackBtn = styled(Button)(({ theme }) => ({
  marginTop: "30px",
  width: "20%",
  backgroundColor: Colors.grey600,
  "&:hover": {
    backgroundColor: Colors.greyText,
  },
}));

export const AiResultImageBtn = styled(Box)(({ theme }) => ({
  marginLeft: "10px",
  padding: "3px 6px",
  fontSize: "15px",
  color: Colors.lightOrange,
  backgroundColor: Colors.blue500,
  borderRadius: "10px",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.05)",
  },
  "&:active": {
    transform: "scale(.95)",
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
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  width: "100%",
  marginBottom: "10px",
}));

export const AiResultDataSmBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "calc(33% - 8px)",
}));

export const AiResultDataSmmBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  // marginBottom: "8px",
  width: "100%",
  height: "60px",
  borderRadius: "10px",
  backgroundColor: Colors.lightOrangeHover,
  boxShadow: "1px 1px rgba(0, 0, 0, 0.2)",
}));

export const AiResultAvatar = styled(Avatar)(({ theme }) => ({
  marginLeft: "20px",
  width: "30px",
  height: "30px",
  fontSize: "14px",
  color: "#fff",
}));

export const AiResultText = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  textAlign: "center",
  color: Colors.greyText,
  fontSize: 18,
  fontWeight: 600,
}));

export const MultiCreateBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
}));

export const MultiCreateCount = styled(Typography)(({ theme }) => ({
  position: "relative",
  color: "#fff",
  fontWeight: 600,
  backgroundColor: Colors.greyBorder,
  padding: "5px 10px",
  textAlign: "center",
}));

export const MultiCreateResetBtn = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: Colors.greyTextBlood,
  backgroundColor: Colors.purple,
  width: "40px",
  height: "75%",
  fontSize: "12px",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.05) translateY(-50%)",
  },
  "&:active": {
    transform: "scale(0.95) translateY(-50%)",
  },
}));

export const MultiCreateSelectBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: "auto",
}));

export const MultiCreateSelectSmBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  width: "100%",
  height: "60px",
  borderBottom: `1px solid ${Colors.greyBorder}`,
}));

export const MultiCreateAvatarBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "15px",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
}));

export const MultiCreateAvatar = styled(Avatar)(({ theme }) => ({
  height: "22px",
  width: "22px",
  fontSize: "12px",
  color: Colors.grey100,
  backgroundColor: Colors.greyBorder,
  border: `1px solid ${Colors.greyBorder}`,
}));

export const AvatarDivider = styled(Box)(({ theme }) => ({
  height: "2px",
  width: "10px",
  margin: "0px 3px",
  backgroundColor: Colors.greyText,
}));

export const MultiCreateOrderName = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "inherit",
  color: Colors.greyText,
}));

export const MultiCreatePlusBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "40px",
  transform: "translateY(-50%)",
  display: "flex",
  flexDirection: "cloumn",
  justifyContent: "center",
  alignItems: "center",
  height: "90%",
}));
