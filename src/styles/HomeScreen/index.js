import { Box, Button, Container, Typography, styled } from "@mui/material";
import { Colors } from "../theme";

export const HomeContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  height: "calc(100vh - 100px)",
  [theme.breakpoints.down("md")]: {
    marginTop: "calc(100px)",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "calc(70px + 10px)",
    height: "calc(100vh - 70px - 10px)",
  },
}));

export const HomeTitle = styled(Typography)(({ theme }) => ({
  color: Colors.blue,
  display: "flex",
  justifyContent: "center",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-end",
    height: "25%",
  },
}));

export const HomeContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    justifyContent: "space-evenly",
    height: "50%",
  },
}));

export const HomeContentButton = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: Colors.blue,
  borderColor: Colors.blue,
  "&:hover": {
    border: `2px solid ${Colors.blue}`,
    transform: "scale(1.1)",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
  },
  "&:active": {
    transform: "scale(.95)",
  },

  [theme.breakpoints.up("md")]: {
    fontSize: "20px",
    width: "25%",
    height: "50%",
  },
}));

export const HomeDescription = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  color: Colors.greyText,
  fontSize: "26px",

  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    width: "100%",
    height: "25%",
  },
}));

// mobile
export const HomeContainerMobile = styled(Container)(({ theme }) => ({
  "@media (orientation: portrait)": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "calc(100vh - 100px)",
  },
}));

export const HomeTitleMobile = styled(Typography)(({ theme }) => ({
  color: Colors.blue,
  display: "flex",
  justifyContent: "center",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
    height: "15%",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
    height: "10%",
  },
  "@media (orientation: landscape)": {
    fontSize: "24px",
  },
}));

export const HomeContentMobile = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  flexDirection: "column",
  justifyContent: "space-around",
  height: "70%",
  "@media (orientation: landscape)": {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
}));

export const HomeContentButtonMobile = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: Colors.blue,
  borderColor: Colors.blue,
  fontSize: "20px",
  width: "50%",
  height: "40%",
  "&:hover": {
    border: `2px solid ${Colors.blue}`,
    transform: "scale(1.1)",
    transition: "all 0.3s ease-in-out",
    cursor: "pointer",
  },
  "&:active": {
    transform: "scale(.95)",
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
    width: "70%",
    height: "35%",
  },
  "@media (orientation: landscape)": {
    margin: "20px 0",
    fontSize: "16px",
    width: "30%",
    height: "35vh",
  },
}));

export const HomeDescriptionMobile = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: Colors.grey,
  fontSize: "26px",
  width: "80%",
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
  },
  "@media (orientation: landscape)": {
    width: "100%",
    fontSize: "16px",
  },
}));

export const HomeHoverArea = styled(Box)(({ theme }) => ({
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "100%",
}));

export const LeftArea = styled(Box)(({ theme }) => ({
  width: "36%",
  height: "68.5%",
  marginTop: "70px",
  cursor: "pointer",
  // backgroundColor: "blue",
  // opacity: 0.2,
}));

export const RightArea = styled(Box)(({ theme }) => ({
  width: "36%",
  height: "68.5%",
  marginTop: "70px",
  cursor: "pointer",
  // backgroundColor: "green",
  // opacity: 0.2,
}));

export const AllArea = styled(Box)(({ theme }) => ({
  width: "72%",
  height: "68.5%",
  marginTop: "70px",
  cursor: "pointer",
  // backgroundColor: "red",
  // opacity: 0.2,
}));

export const HomeDescBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "13%",
  left: "50%",
  transform: "translateX(-50%)",
  textAlign: "center",
}));

export const DescText = styled(Typography)(({ theme }) => ({
  color: Colors.grey600,
  fontSize: 26,
  fontWeight: 600,
  width: "700px",
  [theme.breakpoints.down("md")]: {
    fontSize: 20,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 16,
  },
}));
