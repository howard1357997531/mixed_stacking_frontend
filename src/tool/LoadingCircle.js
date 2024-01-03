import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, styled } from "@mui/material";
import { Colors } from "../styles/theme";

function LoadingCircle() {
  const CircleBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }));
  return (
    <CircleBox>
      <CircularProgress sx={{ color: Colors.greyText }} />
    </CircleBox>
  );
}

export default LoadingCircle;
