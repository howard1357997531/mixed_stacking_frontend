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
  position: "relative",
  width: "100%",
  height: "90%",
  overflowY: "auto",
  border: `1px solid ${Colors.greyBorder}`,
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
  color: Colors.grey,
}));

export const OrderListDetial = styled(Box, {
  shouldForwardProp: (prop) => prop !== "itemSelect",
})(({ theme, itemSelect }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "60px",
  backgroundColor: itemSelect ? Colors.greyHover : null,
  "&:hover": {
    backgroundColor: itemSelect ? Colors.greyHover : Colors.lightOrangeHover,
    cursor: "pointer",
  },
}));

export const OrderListName = styled(Box, {
  shouldForwardProp: (prop) => prop !== "itemSelect",
})(({ theme, itemSelect }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "33%",
  height: "100%",
  color: itemSelect ? "#fff" : Colors.greyText,
}));

export const OrderListDate = styled(Box, {
  shouldForwardProp: (prop) => prop !== "itemSelect",
})(({ theme, itemSelect }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "33%",
  height: "100%",
  color: itemSelect ? "#fff" : Colors.greyText,
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
  padding: "6px 0px",
  fontSize: "16px",
  fontWeight: 600,
}));

// functionArea
export const FunctionAreaBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "orderListMode",
})(({ theme, orderListMode }) => ({
  display: orderListMode !== "close" ? "flex" : "none",
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

export const FunctionAreaNav = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
  width: "100%",
  height: "10%",
}));

export const CloseIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  left: 0,
}));

export const FunctionAreaNavBtn = styled(Button)(({ theme }) => ({
  position: "absolute",
  right: 0,
  textTransform: "initial",
  // display:
  //   functionBoxData.aiTraining_state === "is_training" ? "none" : "block",
}));

export const FunctionAreaContentBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "90%",
  overflowY: "auto",
  border: `1px solid ${Colors.greyBorder}`,
  boxSizing: "border-box",
  // padding: functionBoxMode === "order" ? 10 : 0,
  padding: 10,
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

export const OrderListDetailBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "50px",
  borderBottom: `1px solid ${blueGrey[100]}`,
  "&:hover": {
    color: deepPurple[500],
    fontSize: "24px",
    fontWeight: 600,
    backgroundColor: grey[300],
    cursor: "pointer",
  },
}));

export const OrderListDetailSmallBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "20%",
  height: "100%",
}));

export const AiResultBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
}));

export const AiResultSmallBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "33.3%",
  height: "70px",
  borderBottom: `1px solid ${blueGrey[100]}`,
  // "&:hover": {
  //   color: deepPurple[500],
  //   backgroundColor: brown[300],
  //   cursor: "pointer",
  // },
}));

export const AiResultAvatar = styled(Avatar)(({ theme }) => ({
  marginLeft: "20px",
  // "&:hover": {
  //   color: brown[300],
  //   backgroundColor: yellow[300],
  //   cursor: "pointer",
  // },
}));
