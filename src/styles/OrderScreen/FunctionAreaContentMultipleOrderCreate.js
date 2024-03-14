import { Avatar, Box, Typography, styled } from "@mui/material";
import { Colors } from "../theme";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
  color: Colors.greyTextBlood,
  marginRight: "10px",
  padding: "0px 1px",
  fontWeight: 600,
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
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
  margin: "3px 0px",
  padding: "0px 6px 0px 2px",
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
  height: "55px",
  marginBottom: "7px",
  borderRadius: "5px",
  backgroundColor: Colors.greenHover,
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
  [theme.breakpoints.down("md")]: {
    height: "50px",
  },
}));

export const MultiCreateSwitchBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "4px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
}));

export const SwitchBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "show",
})(({ theme, show }) => ({
  boxSizing: "border-box",
  display: show ? "flex" : "none",
  flexDirection: "column",
  justifyContent: "center",
  padding: "5px",
  height: "47%",
}));

export const UpIcon = styled(ArrowDropUpIcon)(({ theme }) => ({
  boxSizing: "border-box",
  fontSize: 20,
  color: Colors.greyTextBlood,
  border: `2px solid ${Colors.greyTextBlood}`,
  borderRadius: "5px",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.15)",
    transition: "all .1s ease-in-out",
  },
  "&:active": {
    transform: "scale(1)",
  },
}));

export const DownIcon = styled(ArrowDropDownIcon)(({ theme }) => ({
  boxSizing: "border-box",
  fontSize: 20,
  color: Colors.greyTextBlood,
  border: `2px solid ${Colors.greyTextBlood}`,
  borderRadius: "5px",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.15)",
    transition: "all .1s ease-in-out",
  },
  "&:active": {
    transform: "scale(1)",
  },
}));

export const MultiCreateAvatarBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "show",
})(({ theme, show }) => ({
  position: "absolute",
  top: "50%",
  left: show ? "35px" : "10px",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
}));

export const MultiCreateAvatar = styled(Box)(({ theme }) => ({
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

export const MultiCreateOrderName = styled(Box)(({ theme }) => ({
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
