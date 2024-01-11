import { Avatar, Box, Typography, styled } from "@mui/material";
import { Colors } from "../theme";

export const MultiCreateBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
}));

export const MultiCreateTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "5px",
}));

export const MultiCreateCount = styled(Box)(({ theme }) => ({
  color: Colors.greyText,
  marginRight: "10px",
  padding: "0px 1px",
  fontWeight: 600,
}));

export const MultiCreateResetBtn = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: Colors.lightOrange,
  backgroundColor: Colors.grey600,
  borderRadius: "10px",
  width: "40px",
  height: "25px",
  fontSize: "12px",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.05)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));

export const MultiCreateSelectBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  paddingRight: "2px",
  flexGrow: 1,
  width: "100%",
  overflowY: "auto",
}));

export const MultiCreateSelectSmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isFouce",
})(({ theme, isFouce }) => ({
  boxSizing: "border-box",
  position: "relative",
  display: "flex",
  width: "100%",
  height: "60px",
  marginBottom: "5px",
  borderRadius: "5px",
  backgroundColor: Colors.lightOrangeHover,
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
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
  color: Colors.lightOrangeHover,
  backgroundColor: Colors.purple,
}));

export const AvatarDivider = styled(Box)(({ theme }) => ({
  height: "2px",
  width: "10px",
  margin: "0px 3px",
  backgroundColor: Colors.purple,
}));

export const MultiCreateOrderName = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "inherit",
  color: Colors.greyText,
  fontWeight: 600,
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
