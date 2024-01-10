import { Box, Button, Typography, styled } from "@mui/material";
import { Colors } from "../../theme";

export const ImageBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  width: "450px",
  maxWidth: "450px",
  height: "100%",
}));

export const Title = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  width: "100%",
  height: "10%",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  color: Colors.greyTextBlood,
  fontSize: 24,
  fontWeight: 600,
  //   backgroundColor: "red",
}));

export const Content = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  width: "100%",
  height: "90%",
  padding: "20px",
  //   backgroundColor: "red",
}));

export const BufferBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  width: "50%",
  height: "100%",
  border: `1px solid ${Colors.greyTextBlood}`,
}));

export const BufferTitle = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "10%",
  backgroundColor: Colors.darkPink,
  fontWight: 600,
  borderBottom: `1px solid ${Colors.greyTextBlood}`,
}));

export const BufferContent = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  width: "100%",
  height: "90%",
  overflowY: "auto",
}));

export const BufferInfoBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "60px",
  padding: "0px 10px",
  borderBottom: `1px solid ${Colors.greyTextBlood}`,
}));

export const BufferInfoSmBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  height: "100%",
  fontSize: "20px",
}));
