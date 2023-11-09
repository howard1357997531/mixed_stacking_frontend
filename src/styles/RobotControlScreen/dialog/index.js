import { Box, IconButton, styled } from "@mui/material";
import { Colors } from "../../theme";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

import {
  OrderListExeListCheckAnimation,
  OrderListExeListDeleteAnimation,
  errorMsgIconButtonAnimation,
} from "../../../animation";

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

export const OrderListExeListInsertName = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "60px",
  borderBottom: `1px solid ${Colors.brownHover}`,
  "&:hover": {
    color: Colors.brown200,
    backgroundColor: Colors.brownHover,
    cursor: "pointer",
  },
}));

export const IconButtonHelp = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
  padding: "10px",
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
    top: "calc(50% - 15px)",
    right: "10px",
    color: Colors.red800,
    fontSize: "26px",
    "&:hover": {
      cursor: "pointer",
      color: Colors.red900,
      animation: `${OrderListExeListDeleteAnimation} .3s`,
    },
    "&:active": {
      transform: "scale(0.8)",
    },
  })
);

export const IconButtonAdd = styled(IconButton)(({ theme }) => ({
  marginLeft: "50%",
  padding: "3px",
  transform: "translate(-50%)",
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
