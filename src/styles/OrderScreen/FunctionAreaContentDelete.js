import { Avatar, Box, Typography, styled } from "@mui/material";
import { Colors } from "../theme";

export const DeleteBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
}));

export const DeleteCount = styled(Typography)(({ theme }) => ({
  position: "relative",
  color: "#fff",
  fontWeight: 600,
  backgroundColor: Colors.greyBorder,
  padding: "5px 10px",
  textAlign: "center",
}));

export const DeleteResetBtn = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: Colors.greyTextBlood,
  backgroundColor: Colors.purple,
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

export const DeleteSelectBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: "auto",
}));

export const DeleteSelectSmBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  width: "100%",
  height: "60px",
  borderBottom: `1px solid ${Colors.greyBorder}`,
}));

export const DeleteAvatarBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "15px",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
}));

export const DeleteAvatar = styled(Avatar)(({ theme }) => ({
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

export const DeleteOrderName = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "inherit",
  color: Colors.greyText,
}));

export const DeletePlusBox = styled(Box)(({ theme }) => ({
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
