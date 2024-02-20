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

export const RobotControlContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  height: "calc(100vh - 100px)",
  padding: "0px 100px",
  [theme.breakpoints.down("lg")]: {
    padding: "0px 20px",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "calc(100px + 10px)",
    flexDirection: "column",
    height: "initial",
    padding: "0px",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "calc(70px + 10px)",
  },
}));

// OperationInterface
export const OperationInterface = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  width: "50%",
  height: "70vh",
  padding: "0px 40px",
  [theme.breakpoints.down("lg")]: {
    padding: "0px 20px",
  },
  [theme.breakpoints.down("md")]: {
    width: "75%",
    height: "60vh",
    marginBottom: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "95%",
    height: "calc(80vh - 70px)",
  },
}));

export const FortyRadioHeightBox = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "40%",
  [theme.breakpoints.down("md")]: {},
}));

export const FortyRadioWidthButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "customColor",
})(({ theme, customColor }) => ({
  position: "relative",
  width: "40%",
  borderRadius: "20px",
  backgroundColor: customColor[0],
  "&:hover": {
    backgroundColor: customColor[1],
    transition: "all 0.3s ease-in-out",
    transform: "scale(1.1)",
    cursor: "pointer",
    zIndex: 2,
  },
  "&:active": {
    transform: "scale(0.9)",
  },
}));

export const SixtyRadioWidthButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "customColor",
})(({ theme, customColor }) => ({
  boxSizing: "border-box",
  position: "relative",
  width: "60%",
  padding: "25px 50px",
  borderRadius: "20px",
  backgroundColor: customColor[0],
  "&:hover": {
    backgroundColor: customColor[1],
    transition: "all 0.3s ease-in-out",
    transform: "scale(1.1)",
    cursor: "pointer",
    zIndex: 2,
  },
  "&:active": {
    transform: "scale(0.9)",
  },
}));

export const OperationInterfaceButtonLogo = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}));

export const OperationInterfaceButtonText = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "75%",
  left: "50%",
  width: "100%",
  textAlign: "center",
  transform: "translate(-50%, -50%)",
  fontSize: "24px",
  fontWeight: 600,
  color: Colors.greyTextBlood,
  [theme.breakpoints.down("md")]: {
    fontSize: 20,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 20,
    top: "70%",
  },
}));

export const VisualIdentityBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100%",
}));

export const VisualIdentityTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "30%",
  color: Colors.greyTextBlood,
  fontWeight: 600,
  fontSize: 24,
}));

export const VisualIdentityObject = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "70%",
  height: "50%",
  fontSize: 32,
  border: "2px solid #000",
  overflow: "hidden",
}));

export const VisualIdentityNextObjectBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  right: 0,
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
  width: "100%",
  height: "20%",
  fontSize: 26,
}));

export const VisualIdentityNextObjectTitle = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 5,
  fontSize: 16,
  fontWeight: 600,
}));

export const VisualIdentityNextObject = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "20%",
  height: "100%",
  padding: "0px 5px",
  fontSize: 16,
  borderLeft: "2px solid #000",
  borderTop: "2px solid #000",
  overflow: "hidden",
}));

export const VisualIdentityState = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "30%",
}));

export const VisualIdentityStateText = styled(Box)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 600,
}));

export const TextShowBoard = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "20%",
  zIndex: "1",
}));

export const TextShowBoardTextBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  gap: "5px",
  zIndex: "3",
}));

export const TextShowBoardText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "30px",
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: 20,
  },
}));

export const StyleDotBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  height: "45%",
}));

// InformationArea
export const InformationArea = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  height: "70vh",
  width: "50%",
  padding: "0px 40px",
  [theme.breakpoints.down("lg")]: {
    padding: "0px 20px",
  },
  [theme.breakpoints.down("md")]: {
    width: "75%",
    height: "75vh",
    marginBottom: "50px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "95%",
    height: "calc(80vh - 70px)",
  },
}));

export const InformationAreaBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mode",
})(({ theme, mode }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  height: mode ? "80%" : "100%",
  backgroundColor: Colors.lightOrange,
  borderRadius: "20px",
}));

export const InformationAreaTitleBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "10%",
  width: "100%",
}));

export const InformationAreaContentBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  position: "relative",
  width: "80%",
  height: data[1] ? "85%" : "80%",
  border: `1px ${data[0] ? "solid" : "dashed"} ${Colors.brown}`,
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    height: data[0] ? "85%" : "80%",
  },
}));

export const InformationAreaBottomBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "10%",
  width: "100%",
}));

export const NoSelectOrderText = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: Colors.greyText,
  fontWeight: 600,
  fontSize: "26px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
  },
}));

export const RobotSuccessBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100px",
}));

export const RobotSuccessTitle = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50%",
  color: Colors.darkGreenHover,
  fontWeight: 600,
  fontSize: "36px",
  [theme.breakpoints.down("md")]: {
    fontSize: 30,
  },
}));

export const RobotSuccessSubTitle = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  height: "50%",
  color: Colors.greyText,
  fontWeight: 600,
  fontSize: "14px",
  marginTop: 2,
}));

export const OrderListTitleButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: "60%",
  left: "10%",
  transform: "translateY(-50%)",
  padding: "4px 6px 3px",
  fontWeight: 600,
  color: Colors.lightOrange,
  backgroundColor: Colors.grey600,
  "&:hover": {
    transition: "scale 0.3s ease-in-out",
    transform: "scale(1.05), translateY(-50%)",
    cursor: "pointer",
    backgroundColor: Colors.greyText,
  },
  "&:active": {
    transform: "scale(0.95), translateY(-50%)",
  },
}));

export const OrderListBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
}));

export const OrderListTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "8%",
  backgroundColor: Colors.grey600,
}));

export const OrderListTitleText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: "#fff",
}));

export const OrderListContent = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "92%",
  overflowY: "auto",
}));

export const OrderListContentBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDoing",
})(({ theme, isDoing }) => ({
  display: "flex",
  width: "100%",
  height: "55px",
  backgroundColor: isDoing ? Colors.blue500 : "transparent",
  [theme.breakpoints.down("sm")]: {
    height: "50px",
  },
}));

export const OrderListContentSmBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  color: Colors.greyText,
  fontSize: 16,
  fontWeight: 600,
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
}));

export const OrderListContentAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== "count",
})(({ theme, count }) => ({
  width: "30px",
  height: "30px",
  fontSize: "14px",
  backgroundColor: count ? Colors.lightOrange : Colors.grey600,
  color: count && Colors.blue500,
  [theme.breakpoints.down("md")]: {
    width: "28px",
    height: "28px",
    fontSize: "13px",
  },
}));

export const OrderListContentName = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  marginLeft: 5,
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
}));

export const MultiOrderDetailBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "92%",
  overflowY: "auto",
}));

export const MultiOrderDetailSmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDoing",
})(({ theme, isDoing }) => ({
  boxSizing: "border-box",
  position: "relative",
  display: "flex",
  width: "100%",
  height: "55px",
  backgroundColor: isDoing ? Colors.blue500 : "transparent",
  [theme.breakpoints.down("sm")]: {
    height: "50px",
  },
}));

export const MultiOrderAvatarBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "20%",
}));

export const MultiOrderAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== "isDoing",
})(({ theme, isDoing }) => ({
  height: "23px",
  width: "23px",
  fontSize: "11px",
  color: isDoing && Colors.blue500,
  backgroundColor: isDoing ? Colors.lightOrange : Colors.grey600,
  [theme.breakpoints.down("lg")]: {
    height: "22px",
    width: "22px",
    fontSize: "10px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "20px",
    width: "20px",
    fontSize: "9px",
  },
}));

export const AvatarDivider = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDoing",
})(({ theme, isDoing }) => ({
  height: "2px",
  width: "7px",
  margin: "0px 2px",
  backgroundColor: isDoing ? Colors.lightOrange : Colors.greyText,
}));

export const MultiOrderName = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDoing",
})(({ theme, isDoing }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "60%",
  height: "inherit",
  color: isDoing ? Colors.lightOrange : Colors.greyText,
  fontWeight: 600,
}));

export const MultipleOrderInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "20%",
}));

export const MultipleOrderListIconButton = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#fff17644",
  },
}));

export const MultipleOrderInfoDialogBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isTitle",
})(({ theme, isTitle }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: isTitle ? " 30px" : "40px",
  borderBottom: `1px solid ${Colors.brown200}`,
  color: isTitle ? Colors.brown100 : Colors.greyTextBlood,
  backgroundColor: isTitle && Colors.brownHover,
  fontSize: isTitle && "14px",
  fontWeight: !isTitle && 600,
}));

export const MultipleOrderInfoDialogSmBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "20%",
  height: "100%",
}));

export const MultipleOrderInfoDialogAiResultBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isTitle",
})(({ theme, isTitle }) => ({
  display: "flex",
  alignItems: "center",
  width: "33.33%",
  height: "70px",
}));

export const MultipleOrderInfoDialogAiResultOrder = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isTitle",
})(({ theme, isTitle }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "35%",
  height: "100%",
}));

export const MultipleOrderInfoDialogAiResultName = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isTitle",
})(({ theme, isTitle }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "65%",
  height: "100%",
}));

// 相機即時辨識
export const BoardBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "20%",
}));

export const VisualBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
}));

export const ImageBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  boxSizing: "border-box",
  position: "absolute",
  top: "50%",
  left: "calc(100% - 100px)",
  transform: "translateY(-50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "90px",
  height: "50px",
  borderRadius: "5px",
  zIndex: 3,
  color: data[0] ? "#fff" : Colors.greyTextBlood,
  backgroundColor: data[0] ? data[1] : "#fff",
  boxShadow:
    "0px 0px 8px rgba(0, 0, 0, 0.4) inset, 0px 0px 2px rgba(0, 0, 0, 0.2) inset",
  [theme.breakpoints.down("lg")]: {
    left: "calc(100% - 95px)",
    width: "85px",
  },
  [theme.breakpoints.down("sm")]: {
    left: "calc(100% - 90px)",
  },
}));

export const ImageBox2 = styled(Box, {
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  boxSizing: "border-box",
  position: "absolute",
  top: "50%",
  left: "calc(100% - 200px)",
  transform: "translateY(-50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "90px",
  height: "50px",
  borderRadius: "8px",
  zIndex: 3,
  color: data[0] ? "#fff" : Colors.greyTextBlood,
  backgroundColor: data[0] ? data[1] : "#fff",
  boxShadow:
    "0px 0px 8px rgba(0, 0, 0, 0.4) inset, 0px 0px 2px rgba(0, 0, 0, 0.2) inset",
  [theme.breakpoints.down("lg")]: {
    left: "calc(100% - 190px)",
    width: "85px",
  },
  [theme.breakpoints.down("sm")]: {
    left: "calc(100% - 180px)",
  },
}));

export const ImageBox3 = styled(Box, {
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  boxSizing: "border-box",
  position: "absolute",
  top: "50%",
  left: "calc(100% - 300px)",
  transform: "translateY(-50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "90px",
  height: "50px",
  borderRadius: "8px",
  zIndex: 3,
  color: data[0] ? "#fff" : Colors.greyTextBlood,
  backgroundColor: data[0] ? data[1] : "#fff",
  boxShadow:
    "0px 0px 8px rgba(0, 0, 0, 0.4) inset, 0px 0px 2px rgba(0, 0, 0, 0.2) inset",
  [theme.breakpoints.down("lg")]: {
    left: "calc(100% - 285px)",
    width: "85px",
  },
  [theme.breakpoints.down("sm")]: {
    left: "calc(100% - 270px)",
  },
}));

export const ImageBox4 = styled(Box, {
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  boxSizing: "border-box",
  position: "absolute",
  top: "50%",
  left: "calc(100% - 400px)",
  transform: "translateY(-50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "90px",
  height: "50px",
  borderRadius: "8px",
  zIndex: 3,
  color: data[0] ? "#fff" : Colors.greyTextBlood,
  backgroundColor: data[0] ? data[1] : "#fff",
  boxShadow:
    "0px 0px 8px rgba(0, 0, 0, 0.4) inset, 0px 0px 2px rgba(0, 0, 0, 0.2) inset",
  [theme.breakpoints.down("lg")]: {
    left: "calc(100% - 380px)",
    width: "85px",
  },
  [theme.breakpoints.down("sm")]: {
    left: "calc(100% - 360px)",
  },
}));
