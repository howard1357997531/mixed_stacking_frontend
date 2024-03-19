import { Box, DialogContent, Typography, styled } from "@mui/material";
import { Colors } from "../theme";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const StyleDialogContent = styled(DialogContent, {
  shouldForwardProp: (prop) => prop !== "drag",
})(({ theme, drag }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  width: "600px",
  height: "400px",
  padding: "0px !important",
  backgroundColor: drag ? Colors.orange : Colors.swalBlack,
  [theme.breakpoints.down("md")]: {
    width: "80vw",
    height: "55vh",
  },
}));

export const DashBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mode",
})(({ theme, mode }) => ({
  position: "absolute",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "25%",
  height: "25%",
  border: `2px dashed ${mode ? Colors.greenHover : Colors.lightOrange}`,
  [theme.breakpoints.down("sm")]: {
    width: "50%",
    height: "23%",
  },
}));

export const UploadTextBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "60%",
  left: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  gap: "10px",
  transform: "translate(-50%, -50%)",
}));

export const UploadText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "mode",
})(({ theme, mode }) => ({
  color: mode ? Colors.greenHover : Colors.lightOrange,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));

export const StyleCloudUploadIcon = styled(CloudUploadIcon, {
  shouldForwardProp: (prop) => prop !== "mode",
})(({ theme, mode }) => ({
  color: mode ? Colors.greenHover : Colors.lightOrange,
  fontSize: "40px",
  [theme.breakpoints.down("md")]: {
    width: "30px",
  },
}));

export const BottonBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mode",
})(({ theme, mode }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "20%",
  color: mode ? Colors.greenHover : Colors.lightOrange,
  //   backgroundColor: Colors.greyTextBlood,
  borderTop: `1px solid ${mode ? Colors.greenHover : Colors.lightOrange}`,
  //fontSize: "40px",
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));
