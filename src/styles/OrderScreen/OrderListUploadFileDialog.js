import { Box, DialogContent, Typography, styled } from "@mui/material";
import { Colors } from "../theme";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import {
  OrderListExeListCheckAnimation,
  dragAnimation,
  uploadAnimation,
} from "../../animation";
import ReportIcon from "@mui/icons-material/Report";

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
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  boxSizing: "border-box",
  position: "absolute",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: data[2] ? "block" : "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "4px 0px",
  width: data[1] ? "35%" : "25%",
  height: data[1] ? "35%" : "25%",
  border: `2px ${data[2] ? "solid" : "dashed"} ${
    data[0] ? Colors.greenHover : Colors.lightOrange
  }`,
  transition: "all .2s ease-in-out",
  overflowY: "auto",
  [theme.breakpoints.down("sm")]: {
    width: "60%",
    height: data[1] ? "35%" : "23%",
  },
}));

export const DragNameBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: "4px 0px",
  color: data[0] ? Colors.greenHover : Colors.lightOrange,
  fontWeight: 600,
}));

export const DragIndexBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
  width: "15%",
  height: "100%",
}));

export const DragIndex = styled(Box, {
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "16px",
  height: "16px",
  color: Colors.orange,
  backgroundColor: data[0] ? Colors.greenHover : Colors.lightOrange,
  fontSize: 14,
  fontWeight: 600,
  borderRadius: "50%",
  [theme.breakpoints.down("sm")]: {
    width: "14px",
    height: "14px",
  },
}));

export const DragName = styled(Box, {
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  color: data[0] ? Colors.greenHover : Colors.lightOrange,
  fontSize: 16,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));

export const UploadTextBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  position: "absolute",
  top: data[1] ? "65%" : "60%",
  left: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // width: "100%",
  gap: "10px",
  transform: "translate(-50%, -50%)",
  zIndex: 0,
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

export const UploadBtn = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "mode",
})(({ theme, mode }) => ({
  marginLeft: "5px",
  padding: "6px 9px",
  color: Colors.orange,
  backgroundColor: Colors.lightOrange,
  fontSize: 14,
  fontWeight: 600,
  borderRadius: "10px",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.05)",
    transition: "all 0.1s ease-in-out",
  },
  "&:active": {
    transform: "scale(1)",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));

export const StyleDocumentScannerIcon = styled(DocumentScannerIcon, {
  shouldForwardProp: (prop) => prop !== "mode",
})(({ theme, mode }) => ({
  color: mode ? Colors.greenHover : Colors.lightOrange,
  fontSize: "40px",
  animation: `${dragAnimation} 1s infinite`,
  [theme.breakpoints.down("md")]: {
    width: "30px",
  },
}));

export const StyleCloudUploadIcon = styled(FileUploadIcon, {
  shouldForwardProp: (prop) => prop !== "mode",
})(({ theme, mode }) => ({
  color: mode ? Colors.greenHover : Colors.lightOrange,
  fontSize: "36px",
  animation: `${uploadAnimation} 1.5s infinite`,
  [theme.breakpoints.down("md")]: {
    width: "30px",
  },
}));

export const BottonBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "15%",
  borderTop: `1px solid ${
    data[1] ? Colors.red800 : data[0] ? Colors.greenHover : Colors.lightOrange
  }`,
}));

export const StyleReportIcon = styled(ReportIcon)(({ theme }) => ({
  color: Colors.red800,
  fontSize: 24,
  animation: `${OrderListExeListCheckAnimation} 1.5s ease`,
  [theme.breakpoints.down("md")]: {
    fontSize: 18,
  },
}));

export const FileFormat = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "data",
})(({ theme, data }) => ({
  paddingTop: "3px",
  color: data[1]
    ? Colors.red800
    : data[0]
    ? Colors.greenHover
    : Colors.lightOrange,
  // backgroundColor: data[1] && Colors.red800,
  fontSize: data[1] ? 18 : 16,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));
