import { Box, Stack, Typography, styled } from "@mui/material";
import { red } from "@mui/material/colors";
import { Colors } from "../theme";

export const RobotControlContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  height: "calc(100vh - 100px)",
  padding: "0px 100px",
  //   backgroundColor: "#888",
  [theme.breakpoints.down("lg")]: {
    padding: "0px 20px",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    height: "initial",
    padding: "30px 20px",
  },
}));

// OperationInterface
export const OperationInterface = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  height: "70vh",
  width: "50%",
  padding: "0px 50px",
  //   backgroundColor: red[50],
  [theme.breakpoints.down("md")]: {
    height: "80vh",
  },
  [theme.breakpoints.down("sm")]: {
    height: "60vh",
  },
}));

export const FortyRadioHeightBox = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "40%",
  [theme.breakpoints.down("md")]: {},
}));

export const FortyRadioWidthButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "customColor",
})(({ theme, customColor }) => ({
  position: "relative",
  width: "40%",
  borderRadius: "20px",
  backgroundColor: customColor[0],
  "&:hover": {
    backgroundColor: customColor[1],
    transition: "all 0.3s ease-in-out",
    transform: "scale(1.1)",
    cursor: "pointer",
    zIndex: 2,
  },
  "&:active": {
    transform: "scale(0.9)",
  },
}));

export const SixtyRadioWidthButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "customColor",
})(({ theme, customColor }) => ({
  position: "relative",
  width: "60%",
  borderRadius: "20px",
  backgroundColor: customColor[0],
  "&:hover": {
    backgroundColor: customColor[1],
    transition: "all 0.3s ease-in-out",
    transform: "scale(1.1)",
    cursor: "pointer",
    zIndex: 2,
  },
  "&:active": {
    transform: "scale(0.9)",
  },
}));

export const OperationInterButtonLogo = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}));

export const OperationInterButtonText = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "75%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "24px",
  fontWeight: 600,
  color: Colors.geryText,
}));

export const TextShowBoard = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "20%",
  zIndex: "1",
}));

export const TextShowBoardTextBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "90%",
  gap: "5px",
  zIndex: "3",
}));

export const TextShowBoardText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "45px",
  fontWeight: 600,
  width: "100%",
  color: Colors.geryText,
}));

export const StyleDotBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  height: "45%",
}));

// InformationArea
export const InformationArea = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  height: "70vh",
  width: "50%",
  padding: "0px 50px",
  [theme.breakpoints.down("md")]: {
    height: "80vh",
  },
  [theme.breakpoints.down("sm")]: {
    height: "60vh",
  },
}));

export const InformationAreaBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  height: "inherit",
  backgroundColor: Colors.lightOrange,
  borderRadius: "20px",
}));

export const InformationAreaTitleBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "10%",
}));

export const InformationAreaContentBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "80%",
  height: "80%",
  // border: `1px ${
  //   currentState === "No order selected yet" ? "dashed" : "solid"
  // } ${brown[500]}`,
  border: `1px dashed ${Colors.geryText}`,
}));

export const NoSelectOrderText = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: Colors.geryText,
  fontWeight: 600,
  fontSize: "26px",
}));
