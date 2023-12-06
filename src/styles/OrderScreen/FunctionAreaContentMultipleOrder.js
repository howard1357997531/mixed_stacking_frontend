import { Avatar, Box, Typography, styled } from "@mui/material";
import { Colors } from "../theme";

export const MultiOrderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
}));

export const MultiOrderTitleBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  width: "100%",
  marginBottom: "5px",
}));

export const MultiOrderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: Colors.greyTextBlood,
  marginLeft: "4px",
  textAlign: "center",
}));

export const MultiOrderInfo = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "14px",
  color: Colors.greyTextBlood,
  textAlign: "right",
}));

export const MultiOrderCount = styled(Typography)(({ theme }) => ({
  position: "relative",
  fontWeight: 600,
  backgroundColor: Colors.greyBorder,
  color: "#fff",
  padding: "5px 10px",
  textAlign: "center",
}));

export const MultiOrderDeleteBtn = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: Colors.greyTextBlood,
  backgroundColor: Colors.red,
  width: "40px",
  height: "75%",
  fontSize: "12px",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.05) translateY(-50%)",
  },
  "&:active": {
    transform: "scale(0.95) translateY(-50%)",
  },
}));

export const MultiOrderDetailBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  padding: "5px",
  flexGrow: 1,
  width: "100%",
  overflowY: "auto",
}));

export const MultiOrderDetailSmBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isFirst",
})(({ theme, isFirst }) => ({
  boxSizing: "border-box",
  position: "relative",
  display: "flex",
  width: "100%",
  height: "60px",
  marginTop: !isFirst ? "4px" : "0px",
  borderRadius: "5px",
  //   borderTop: isFirst && "none",
  //   borderBottom: `1px solid ${Colors.greyBorder}`,
  backgroundColor: Colors.lightOrangeHover,
}));

export const MultiOrderAvatarBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "15px",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
}));

export const MultiOrderAvatar = styled(Avatar)(({ theme }) => ({
  height: "22px",
  width: "22px",
  fontSize: "12px",
  color: Colors.grey100,
  backgroundColor: Colors.greyBorder,
  border: `1px solid ${Colors.greyBorder}`,
}));

export const AvatarDivider = styled(Box)(({ theme }) => ({
  height: "2px",
  width: "10px",
  margin: "0px 3px",
  backgroundColor: Colors.greyText,
}));

export const MultiOrderName = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "inherit",
  color: Colors.greyText,
}));

export const MultiOrderEachCount = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "15px",
  transform: "translateY(-50%)",
  color: Colors.greyText,
}));
