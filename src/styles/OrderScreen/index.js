import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { Colors } from "../theme";
import {
  OrderListExeListWaitToExecuteAnimation,
  aiTrainingBtnAnimation,
} from "../../animation";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CancelIcon from "@mui/icons-material/Cancel";

export const OrderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "calc(100vh - 100px)",
  [theme.breakpoints.down("md")]: {
    marginTop: "calc(100px + 10px)",
    flexDirection: "column",
    height: "initial",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "calc(70px + 10px)",
  },
}));

export const OrderBox = styled(Box)(({ theme }) => ({
  display: "flex",
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
  boxSizing: "border-box",
  display: "flex",
  position: "relative",
  flexDirection: "column",
  width: "48%",
  height: "100%",
  padding: "10px 20px 15px",
  gap: "5px",
  backgroundColor: mode ? Colors.green : Colors.lightOrange,
  borderRadius: "10px",
  [theme.breakpoints.down("md")]: {
    width: "70vw",
    height: "75vh",
  },
  [theme.breakpoints.down("sm")]: {
    width: "85vw",
    height: "calc(80vh - 70px)",
    padding: "5px 8px 10px",
  },
}));

export const OrderSwitchBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "-33px",
  left: "0%",
  display: "flex",
  gap: "4px",
  zIndex: 0.5,
  [theme.breakpoints.down("md")]: {
    display: "flex",
    width: "70vw",
  },
  [theme.breakpoints.down("sm")]: {
    width: "85vw",
  },
}));

export const OrderSwitchBtn = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "5px 10px",
  color: Colors.greyTextBlood,
  background: Colors.lightOrange,
  fontSize: 14,
  fontWeight: 600,
  borderRadius: "10px",
  boxShadow: "1px 1px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.03)",
    transition: "all .2s ease-in-out",
  },
  "&:active": {
    transform: "scale(.95)",
  },
  [theme.breakpoints.down("md")]: {
    width: "50%",
    "&:hover": {
      transform: "scale(1.01)",
    },
    "&:active": {
      transform: "scale(.98)",
    },
  },
}));

export const OrderListNav = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "45px",
}));

export const OrderListSearch = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  height: "100%",
}));

export const StyleSearchIcon = styled(SearchIcon)(({ theme }) => ({
  color: Colors.greyTextBlood,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

export const SearchSelect = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mode",
})(({ theme, mode }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2px 8px",
  color: mode ? Colors.green : Colors.lightOrange,
  backgroundColor: Colors.greyTextBlood,
  fontSize: "14px",
  borderRadius: "10px",
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: Colors.grey900,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
}));

export const OrderListNavBtnBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
  paddingTop: "8px",
  paddingRight: "4px",
  height: "100%",
  gap: "20px",
  [theme.breakpoints.down("lg")]: {
    gap: "10px",
  },
  [theme.breakpoints.down("sm")]: {
    paddingTop: "5px",
  },
}));

export const OrderListNavBtn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.1)",
  },
  "&:active": {
    transform: "scale(.95)",
  },
}));

export const OrderListNavRowBtn = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80%",
  padding: "1px 10px 0px",
  borderRadius: "10px",
  color: Colors.lightOrange,
  backgroundColor: Colors.blue500,
  fontWeight: 600,
  animation: `1s ${aiTrainingBtnAnimation} infinite`,
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.05)",
  },
  [theme.breakpoints.down("sm")]: {
    height: "70%",
    padding: "0px 10px",
    fontSize: 12,
  },
}));

export const OrderListNavBtnText = styled(Typography)(({ theme }) => ({
  color: Colors.greyTextBlood,
  fontSize: 14,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
  },
}));

export const OrderListNavBtnAiResultText = styled(Typography)(({ theme }) => ({
  color: Colors.blue500,
  fontSize: 14,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: 10,
  },
}));

export const OrderListNavFixedBox = styled(Box)({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 999,
  display: "flex",
  width: "100vw",
  backgroundColor: Colors.grey300,
  borderTop: `2px solid ${Colors.grey100}`,
});

export const OrderListNavFixedSmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mode",
})(({ theme, mode }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  height: "60px",
  paddingTop: "5px",
  borderRight: `2px solid ${Colors.grey100}`,
  backgroundColor: mode && Colors.grey400,
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
  color: Colors.greyTextBlood,
  fontWeight: 600,
  [theme.breakpoints.down("md")]: {
    fontSize: 20,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 18,
  },
}));

export const OrderListContentBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isFilter",
})(({ theme, isFilter }) => ({
  boxSizing: "border-box",
  position: "relative",
  width: "100%",
  // height: isFilter ? "87%" : "92%",
  height: isFilter ? "calc(93% - 45px)" : "calc(100% - 45px)",
  paddingLeft: "3px",
  paddingRight: "6px",
  overflowY: "auto",
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

export const StyleCancelButton = styled(CancelIcon)(({ theme }) => ({
  color: Colors.greyTextBlood,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
  },
}));

export const OrderListDate = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isFirst",
})(({ theme, isFirst }) => ({
  color: Colors.greyTextBlood,
  marginTop: isFirst ? "0px" : "8px",
  marginBottom: "5px",
  padding: "0px 1px",
  fontWeight: 600,
  [theme.breakpoints.down("md")]: {
    fontSize: "14px",
  },
}));

export const OrderListDetial = styled(Box, {
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "55px",
  marginBottom: "7px",
  padding: "0px 10px",
  color: Colors.greyTextBlood,
  fontWeight: 600,
  backgroundColor: data[1],
  border: data[0] ? `2px solid ${data[2]}` : "none",
  boxShadow: data[0]
    ? `0.5px 0.5px ${data[2]}, -0.5px -0.5px ${data[2]}`
    : "1px 1px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    border: data[0] ? `2px solid ${data[2]}` : "none",
    boxShadow: data[0]
      ? `0.5px 0.5px ${data[2]}, -0.5px -0.5px ${data[2]}`
      : `1.5px 1.5px ${data[2]}`,
    cursor: "pointer",
    transform: "scale(1.01)",
    transition: "scale 0.2s ease-in-out",
  },
  [theme.breakpoints.down("md")]: {
    height: "50px",
    fontSize: "14px",
  },
}));

export const OrderListName = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flex: 1,
  justifyContent: "left",
  alignItems: "center",
  height: "100%",
}));

export const NewText = styled(Typography)(({ theme }) => ({
  marginRight: "5px",
  color: Colors.red800,
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
}));

export const OrderListNameSelect = styled(Box, {
  shouldForwardProp: (prop) => prop !== "itemSelect",
})(({ theme, itemSelect }) => ({
  marginRight: "10px",
  width: "13px",
  height: "13px",
  backgroundColor: itemSelect && Colors.blue500,
  borderRadius: "50%",
  border: itemSelect
    ? `1px solid ${Colors.blue500}`
    : `1px solid ${Colors.greyTextBlood}`,
}));

export const OrderListState = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
  height: "100%",
}));

export const OrderListStateText = styled(Typography)(({ theme }) => ({
  display: "inline-block",
  fontSize: "14px",
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
  },
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
  width: "48%",
  height: "100%",
  padding: "10px 20px 15px",
  boxSizing: "border-box",
  borderRadius: "10px",
  gap: "5px",
  backgroundColor: ["multipleOrder", "multipleOrderCreate"].includes(mode)
    ? Colors.green
    : Colors.lightOrange,
  opacity: 100,
  transition: "opacity 0.5s ease-in-out",
  [theme.breakpoints.down("md")]: {
    width: "70vw",
    height: "75vh",
  },
  [theme.breakpoints.down("sm")]: {
    width: "85vw",
    height: "calc(80vh - 70px)",
    marginBottom:
      ["close", "orderDetail", "aiResult", "edit", "delete"].includes(mode) &&
      "55px",
    padding: "5px 12px 10px",
  },
}));

export const FunctionAreaNav = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
  width: "100%",
  height: "45px",
}));

export const CloseIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  left: 0,
}));

export const StyleChevronLeftIcon = styled(ChevronLeftIcon)(({ theme }) => ({
  color: Colors.greyTextBlood,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

export const StyleCloseIcon = styled(CloseIcon)(({ theme }) => ({
  color: Colors.greyTextBlood,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
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
  // height: "92%",
  height: "calc(100% - 50px)",
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
  backgroundColor: Colors.greyTextBlood,
  "&:hover": {
    backgroundColor: Colors.grey900,
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
  color: Colors.greyTextBlood,
  fomtSize: 18,
  fontWeight: 600,
}));

export const AiResultDataBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "11px",
  width: "100%",
  marginBottom: "10px",
  [theme.breakpoints.down("sm")]: {
    gap: "10px",
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

export const AiResultDataSmmBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  // marginBottom: "8px",
  width: "100%",
  height: "55px",
  borderRadius: "10px",
  backgroundColor: Colors.lightOrangeHover,
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
  fontWeight: 600,
  color: "#fff",
  [theme.breakpoints.down("md")]: {
    width: "25px",
    height: "25px",
    fontSize: "13px",
  },
}));

export const AiResultText = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  textAlign: "center",
  color: Colors.greyTextBlood,
  fontSize: 18,
  fontWeight: 600,
  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
  },
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
