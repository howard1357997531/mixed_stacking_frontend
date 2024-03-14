import { Avatar, Box, Typography, styled } from "@mui/material";
import { Colors } from "../theme";
import DeleteIcon from "@mui/icons-material/Delete";

export const MultiOrderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
}));

export const MultiOrderTitleBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  width: "100%",
  padding: "5px 8px",
}));

export const MultiOrderTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 600,
  color: Colors.greyTextBlood,
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

export const MultiOrderDeleteBtn = styled(DeleteIcon)(({ theme }) => ({
  position: "absolute",
  right: 0,
  height: "60%",
  color: Colors.red800,
  fontSize: 30,
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.1)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));

export const MultiOrderDetailBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  paddingRight: "6px",
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
  height: "55px",
  marginTop: !isFirst ? "6px" : "0px",
  borderRadius: "5px",
  backgroundColor: Colors.greenHover,
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: Colors.white,
  },
  [theme.breakpoints.down("md")]: {
    height: "50px",
  },
}));

export const MultiOrderAvatarBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "15px",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
}));

export const MultiOrderAvatar = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "23px",
  width: "23px",
  fontSize: "12px",
  fontWeight: 600,
  color: Colors.greenHover,
  backgroundColor: Colors.greyTextBlood,
  borderRadius: "2px",
  [theme.breakpoints.down("md")]: {
    height: "21px",
    width: "21px",
    fontSize: "12px",
  },
}));

export const AvatarDivider = styled(Box)(({ theme }) => ({
  height: "2px",
  width: "8px",
  margin: "0px 3px",
  backgroundColor: Colors.greyTextBlood,
}));

export const MultiOrderName = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "inherit",
  color: Colors.greyTextBlood,
  fontWeight: 600,
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
}));

export const MultiOrderEachCount = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "15px",
  transform: "translateY(-50%)",
  color: Colors.greyTextBlood,
  fontWeight: 600,
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
}));
