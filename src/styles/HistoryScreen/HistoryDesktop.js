import {
  Avatar,
  Box,
  DialogContent,
  DialogTitle,
  Typography,
  styled,
} from "@mui/material";
import { Colors } from "../theme";

export const HistoryContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "calc(100vh - 100px)",
  //   backgroundColor: "red",
}));

export const StyleBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "80%",
  height: "100%",
}));

export const HistoryBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "5px 25px 20px",
  width: "48%",
  height: "90%",
  backgroundColor: Colors.lightOrange,
  borderRadius: "10px",
  [theme.breakpoints.down("lg")]: {
    width: "60%",
  },
  [theme.breakpoints.down("md")]: {
    width: "80%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const HistoryTitleBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  //   justifyContent: "space-between",
  alignItems: "center",
  padding: "0px 3px",
  width: "100%",
  height: "10%",
  backgroundColor: Colors.lightOrange,
}));

export const HistoryTitle = styled(Typography)(({ theme }) => ({
  color: Colors.greyText,
  fontSize: 20,
  fontWeight: 600,
  marginRight: "5px",
}));

export const HistoryContent = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  width: "100%",
  height: "90%",
  paddingLeft: "3px",
  paddingRight: "4px",
  overflowY: "auto",
}));

export const HistoryListDate = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isFirst",
})(({ theme, isFirst }) => ({
  color: Colors.greyText,
  marginTop: isFirst ? "0px" : "8px",
  marginBottom: "5px",
  padding: "0px 1px",
}));

export const HistoryListDetial = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "60px",
  marginBottom: "5px",
  paddingLeft: "15px",
  paddingRight: "10px",
  color: Colors.greyText,
  fontWeight: 600,
  backgroundColor: Colors.lightOrangeHover,
  boxShadow: "1px 1px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    boxShadow: `1px 1px ${Colors.purple}`,
    cursor: "pointer",
    transform: "scale(1.01)",
    transition: "scale 0.2s ease-in-out",
  },
}));

export const HistoryName = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  color: Colors.greyText,
}));

export const HistoryTime = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  color: Colors.greyText,
}));

// dialog
export const StyleDialogTitle = styled(DialogTitle)(({ theme }) => ({
  boxSizing: "border-box",
  width: "500px",
  padding: "8px 15px 5px",
  fontSize: 20,
  color: Colors.greyText,
  backgroundColor: Colors.lightOrangeHover,
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    width: "80vw",
  },
}));

export const StyleDialogContent = styled(DialogContent)(({ theme }) => ({
  boxSizing: "border-box",
  width: "500px",
  padding: "5px 16px 10px !important",
  backgroundColor: Colors.lightOrangeHover,
  [theme.breakpoints.down("md")]: {
    width: "80vw",
  },
}));

export const DescText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isTitle",
})(({ theme, isTitle }) => ({
  display: isTitle && "inline-block",
  padding: isTitle && "0px 5px",
  marginBottom: isTitle && "4px",
  color: isTitle ? Colors.lightOrangeHover : Colors.greyText,
  backgroundColor: isTitle && Colors.greyText,
  fontWeight: 600,
}));

export const HistoryDetailBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  width: "100%",
  height: "300px",
  overflow: "auto",
  border: `1px solid ${Colors.greyText}`,
}));

export const HistoryDetailSmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isFirst",
})(({ theme, isFirst }) => ({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "50px",
  borderTop: !isFirst && `1px solid ${Colors.greyText}`,
  borderRight: `1px solid ${Colors.greyText}`,
}));

export const AvatarBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "30%",
  height: "100%",
  borderRight: `1px solid ${Colors.greyText}`,
  [theme.breakpoints.down("sm")]: {
    width: "40%",
  },
}));

export const StyleAvatar = styled(Avatar)(({ theme }) => ({
  width: "25px",
  height: "25px",
  fontSize: 14,
  color: Colors.lightOrangeHover,
  backgroundColor: Colors.greyText,
}));

export const AvatarDivider = styled(Box)({
  width: "6px",
  height: "2px",
  margin: "0px 4px",
  backgroundColor: Colors.greyText,
});

export const NameBox = styled(Box)({
  display: "flex",
  flexGrow: 1,
  justifyContent: "center",
  alignItems: "center",
  color: Colors.greyText,
});
