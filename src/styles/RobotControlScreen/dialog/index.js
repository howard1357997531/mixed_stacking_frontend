import { Box, styled } from "@mui/material";
import { Colors } from "../../theme";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { errorMsgIconButtonAnimation } from "../../../animation";

export const OrderListExeListBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "500px",
}));

export const OrderListExeListTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "8%",
}));

export const OrderListExeListNameBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
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
  height: "50px",
  borderTop: `1px solid ${Colors.brownHover}`,
  borderBottom: `1px solid ${Colors.brownHover}`,
}));

export const OrderListExeListCheck = styled(CheckCircleIcon)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
  color: Colors.darkGreenHover,
}));

export const OrderListExeListInProgress = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
}));

export const OrderListExeListDelete = styled(HighlightOffIcon)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
  color: Colors.red,
  fontSize: "30px",
  "&:hover": {
    transform: "scale(1.1)",
    animation: `${errorMsgIconButtonAnimation} .5s`,
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));

export const OrderListExeListAdd = styled(AddCircleIcon)(({ theme }) => ({
  color: Colors.greyText,
  fontSize: "30px",
  "&:hover": {
    transform: "scale(1.3)",
  },
  "&:active": {
    transform: "scale(0.95)",
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

export const SwiperBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
}));

export const SwiperTopBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "80%",
}));

export const SwiperPrevBtn = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "15%",
  height: "100%",
}));

export const SwiperNameBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "70%",
  height: "100%",
}));

export const SwiperNextBtn = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "15%",
  height: "100%",
}));

export const SwiperIndexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "20%",
}));
