import { Box, Button, Typography, styled } from "@mui/material";
import { Colors } from "../../theme";

export const ImageBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  width: "50%",
  height: "100%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  "@media screen and (orientation: portrait)": {
    width: "100%",
  },
}));

export const Title = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  width: "100%",
  paddingTop: "10px",
  color: Colors.greyTextBlood,
  fontSize: 24,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: 20,
  },
}));

export const Content = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  width: "100%",
  height: "88%",
  padding: "20px",
  paddingBottom: "5px",
}));

export const BufferBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  width: "50%",
  height: "100%",
  border: `1px solid ${Colors.greyTextBlood}`,
}));

export const BufferTitle = styled(Typography)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "10%",
  color: Colors.darkPink,
  backgroundColor: Colors.greyTextBlood,
  fontWight: 600,
  borderBottom: `1px solid ${Colors.greyTextBlood}`,
  [theme.breakpoints.down("sm")]: {
    height: "35px",
  },
}));

export const BufferContent = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  width: "100%",
  height: "90%",
  overflowY: "auto",
  [theme.breakpoints.down("sm")]: {
    height: "250px",
  },
}));

export const BufferInfoBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "60px",
  padding: "0px 10px",
  gap: "5px",
  borderBottom: `1px solid ${Colors.greyTextBlood}`,
  [theme.breakpoints.down("sm")]: {
    padding: "0px",
    height: "50px",
    gap: "0px",
  },
}));

export const BufferInfoSmBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  height: "100%",
  color: Colors.greyTextBlood,
  fontSize: "16px",
  fontWeight: 600,
}));

export const BufferInfoImageText = styled(Typography)(({ theme }) => ({
  color: Colors.greyTextBlood,
  fontSize: 14,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
  },
}));

export const BufferInfoText = styled(Box)(({ theme }) => ({
  color: Colors.darkPink,
  backgroundColor: Colors.greyTextBlood,
  padding: "4px 8px",
  borderRadius: "5px",
  fontSize: 14,
  [theme.breakpoints.down("sm")]: {
    marginLeft: "10px",
    padding: "3px 6px",
    fontSize: 12,
  },
}));
