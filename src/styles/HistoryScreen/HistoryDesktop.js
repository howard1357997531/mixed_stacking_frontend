import {
  Avatar,
  Box,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { Colors } from "../theme";
import CancelIcon from "@mui/icons-material/Cancel";

export const HistoryContainer = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "calc(100vh - 100px)",
  [theme.breakpoints.down("md")]: {
    marginTop: "calc(100px)",
  },
  "@media screen and (orientation: portrait)": {
    paddingBottom: "15px",
  },

  [theme.breakpoints.down("sm")]: {
    marginTop: "calc(70px + 10px)",
    paddingBottom: "0px",
  },
}));

export const StyleBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "80%",
  height: "100%",
  [theme.breakpoints.down("lg")]: {
    width: "90%",
  },
  [theme.breakpoints.down("md")]: {
    height: "90%",
    padding: "30px 0px",
  },
}));

export const HistoryBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "48%",
  height: "90%",
  padding: "10px 20px 15px",
  backgroundColor: Colors.lightOrange,
  borderRadius: "10px",
  [theme.breakpoints.down("md")]: {
    width: "70vw",
    height: "75vh",
  },
  "@media screen and (orientation: portrait)": {
    width: "65vw",
    height: "65vh",
  },
  [theme.breakpoints.down("sm")]: {
    width: "85vw",
    height: "75vh",
    padding: "5px 8px 10px",
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
  color: Colors.greyTextBlood,
  fontSize: 20,
  fontWeight: 600,
  marginRight: "5px",
  [theme.breakpoints.down("md")]: {
    fontSize: 16,
  },
}));

export const HistoryContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isFilter",
})(({ theme, isFilter }) => ({
  boxSizing: "border-box",
  position: "relative",
  width: "100%",
  height: isFilter ? "calc(93% - 45px)" : "calc(100% - 45px)",
  paddingLeft: "3px",
  paddingRight: "6px",
  overflowY: "auto",
}));

export const HistoryListDate = styled(Typography, {
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

export const HistoryListDetial = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "55px",
  marginBottom: "7px",
  padding: "0px 10px",
  color: Colors.greyTextBlood,
  fontWeight: 600,
  backgroundColor: Colors.lightOrangeHover,
  boxShadow: "1px 1px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    boxShadow: `1.5px 1.5px ${Colors.blue500}`,
    cursor: "pointer",
    transform: "scale(1.01)",
    transition: "scale 0.2s ease-in-out",
  },
  [theme.breakpoints.down("md")]: {
    height: "50px",
    fontSize: "14px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0px 8px",
    height: "50px",
    fontSize: "14px",
  },
}));

export const HistoryName = styled(Typography)(({ theme }) => ({
  marginRight: "8px",
  color: Colors.greyTextBlood,
  fontSize: 15,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    marginRight: "4px",
    fontSize: 13,
  },
}));

export const HistoryStateMulti = styled(Typography)(({ theme }) => ({
  marginRight: "2px",
  color: Colors.greyTextBlood,
  fontSize: 12,
  fontWeight: 600,
}));

export const HistoryStateCount = styled(Typography)(({ theme }) => ({
  marginRight: "7px",
  color: Colors.greyTextBlood,
  fontSize: 12,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    marginRight: "3px",
  },
}));

export const HistoryResetState = styled(Typography)(({ theme }) => ({
  boxSizing: "border-box",
  marginRight: "4px",
  padding: "3px 6px",
  color: Colors.greyTextBlood,
  backgroundColor: Colors.softOrange,
  fontSize: 14,
  fontWeight: 600,
  borderRadius: "2px",
  [theme.breakpoints.down("sm")]: {
    padding: "2px 4px",
    fontSize: 12,
  },
}));

export const HistoryInsertState = styled(Typography)(({ theme }) => ({
  boxSizing: "border-box",
  marginRight: "4px",
  padding: "3px 6px",
  color: Colors.lightOrangeHover,
  backgroundColor: Colors.blue500,
  fontSize: 14,
  fontWeight: 600,
  borderRadius: "2px",
  [theme.breakpoints.down("sm")]: {
    padding: "2px 4px",
    fontSize: 12,
  },
}));

export const HistoryResetAllState = styled(Typography)(({ theme }) => ({
  boxSizing: "border-box",
  marginRight: "8px",
  padding: "3px 6px",
  color: Colors.lightOrangeHover,
  backgroundColor: Colors.red800,
  fontSize: 14,
  fontWeight: 600,
  borderRadius: "2px",
  [theme.breakpoints.down("sm")]: {
    marginRight: "4px",
    padding: "2px 4px",
    fontSize: 12,
  },
}));

export const HistoryTime = styled(Typography)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flex: 1,
  justifyContent: "right",
  alignItems: "center",
  color: Colors.greyTextBlood,
  fontSize: 14,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
  },
}));

// dialog
export const StyleDialogTitle = styled(DialogTitle)(({ theme }) => ({
  boxSizing: "border-box",
  width: "100%",
  padding: "8px 15px 5px",
  fontSize: 18,
  fontWeight: 600,
  color: Colors.greyTextBlood,
  backgroundColor: Colors.lightOrangeHover,
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: 16,
  },
}));

export const StyleDialogContent = styled(DialogContent)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  width: "500px",
  height: "65vh",
  padding: "5px 16px 10px !important",
  backgroundColor: Colors.lightOrangeHover,
  [theme.breakpoints.down("md")]: {
    width: "80vw",
  },
  "@media screen and (orientation: portrait)": {
    height: "60vh",
  },
  [theme.breakpoints.down("sm")]: {
    height: "65vh",
  },
}));

export const DescText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isTitle",
})(({ theme, isTitle }) => ({
  display: isTitle && "inline-flex",
  padding: isTitle && "0px 5px",
  marginBottom: isTitle && "4px",
  color: isTitle ? Colors.lightOrangeHover : Colors.greyTextBlood,
  backgroundColor: isTitle && Colors.greyTextBlood,
  fontWeight: 600,
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
}));

export const HistoryDetailBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  flex: 1,
  width: "100%",
  overflow: "auto",
  border: `1px solid ${Colors.greyTextBlood}`,
}));

export const HistoryResetAllBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "30px",
  color: Colors.orangeDialog,
  backgroundColor: Colors.red800,
  fontWeight: 600,
  borderBottom: `1px solid ${Colors.greyTextBlood}`,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));

export const HistoryDetailSmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isFirst",
})(({ theme, isFirst }) => ({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "50px",
  borderBottom: `1px solid ${Colors.greyTextBlood}`,
  [theme.breakpoints.down("sm")]: {
    height: "45px",
  },
}));

export const FirstBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isReset",
})(({ theme, isReset }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: isReset ? Colors.greyTextBlood : Colors.orangeDialog,
  backgroundColor: isReset ? Colors.softOrange : Colors.blue500,
  width: "6%",
  height: "100%",
  borderRight: `1px solid ${Colors.greyTextBlood}`,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    width: "8%",
  },
}));

export const ResetBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "40%",
  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
  },
}));

export const InsertBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "40%",
  [theme.breakpoints.down("sm")]: {
    fontSize: 13,
  },
}));

export const AvatarBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "25%",
  height: "100%",
  borderRight: `1px solid ${Colors.greyTextBlood}`,
  [theme.breakpoints.down("sm")]: {
    width: "27%",
  },
}));

export const StyleAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== "isInsert",
})(({ theme, isInsert }) => ({
  width: "25px",
  height: "25px",
  fontSize: 12,
  fontWeight: 600,
  color: Colors.lightOrangeHover,
  backgroundColor: isInsert ? Colors.greyTextBlood : Colors.greyTextBlood,
  [theme.breakpoints.down("md")]: {
    width: "20px",
    height: "20px",
    fontSize: 11,
  },
}));

export const AvatarDivider = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isInsert",
})(({ theme, isInsert }) => ({
  width: "6px",
  height: "2px",
  margin: "0px 4px",
  backgroundColor: isInsert ? Colors.greyTextBlood : Colors.greyTextBlood,
}));

export const NameBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  justifyContent: "center",
  alignItems: "center",
  color: Colors.greyTextBlood,
  fontWeight: 600,
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
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
