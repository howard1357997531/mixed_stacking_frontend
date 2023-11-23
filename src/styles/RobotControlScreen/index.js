import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { blueGrey, brown, deepPurple, grey, red } from "@mui/material/colors";
import { Colors } from "../theme";

export const RobotControlContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  height: "calc(100vh - 100px)",
  padding: "0px 100px",
  //   backgroundColor: "#888",
  [theme.breakpoints.down("lg")]: {
    padding: "0px 20px",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    height: "initial",
    padding: "30px 20px",
  },
}));

// OperationInterface
export const OperationInterface = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  height: "70vh",
  width: "50%",
  padding: "0px 50px",
  //   backgroundColor: red[50],
  [theme.breakpoints.down("md")]: {
    height: "80vh",
  },
  [theme.breakpoints.down("sm")]: {
    height: "60vh",
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
  position: "relative",
  width: "60%",
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
  transform: "translate(-50%, -50%)",
  fontSize: "24px",
  fontWeight: 600,
  color: Colors.greyTextBlood,
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
  height: "20%",
  color: Colors.greyTextBlood,
  fontWeight: 600,
  fontSize: 20,
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
  fontSize: "36px",
  fontWeight: 600,
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
  height: "70vh",
  width: "50%",
  padding: "0px 50px",
  [theme.breakpoints.down("md")]: {
    height: "80vh",
  },
  [theme.breakpoints.down("sm")]: {
    height: "60vh",
  },
}));

export const InformationAreaBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  height: "inherit",
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
  shouldForwardProp: (prop) => prop !== "hasOrderList",
})(({ theme, hasOrderList }) => ({
  position: "relative",
  width: "80%",
  height: "80%",
  border: `1px ${hasOrderList ? "solid" : "dashed"} ${Colors.brown}`,
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
  minWidth: "40px",
  height: "60%",
  fontWeight: 600,
  color: "#fff",
  backgroundColor: Colors.brown,
  "&:hover": {
    transition: "scale 0.3s ease-in-out",
    transform: "scale(1.05), translateY(-50%)",
    cursor: "pointer",
    backgroundColor: Colors.brownHover,
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
  backgroundColor: blueGrey[500],
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
  height: "60px",
  backgroundColor: isDoing ? Colors.lightbrown300 : "transparent",
}));

export const OrderListContentSmBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
}));

export const MultipleOrderListBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  overflowY: "auto",
}));

export const MultipleOrderListDetailBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  height: "60px",
}));

export const MultipleOrderListDetailOrder = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  paddingLeft: "20px",
  width: "25%",
  height: "100%",
}));

export const MultipleOrderListDetailName = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  height: "100%",
  color: Colors.greyText,
  fontWeight: 600,
}));

export const MultipleOrderListDetailInfo = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
  paddingRight: "10px",
  width: "25%",
  height: "100%",
}));

export const MultipleOrderInfoDialogBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isTitle",
})(({ theme, isTitle }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "40px",
  borderBottom: `1px solid ${Colors.brownHover}`,
  "&:hover": {
    color: !isTitle && deepPurple[500],
    height: !isTitle && "60px",
    fontSize: !isTitle && "24px",
    fontWeight: !isTitle && 600,
    backgroundColor: !isTitle && Colors.brownHover,
    cursor: !isTitle && "pointer",
  },
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
  // borderBottom: `1px solid ${brown[400]}`,
  // backgroundColor: Colors.yellow,
}));

export const MultipleOrderInfoDialogAiResultOrder = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isTitle",
})(({ theme, isTitle }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "35%",
  height: "100%",

  // backgroundColor: Colors.darkGreen,
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
