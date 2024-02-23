import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import { Colors } from "../styles/theme";

function LoadingCircle() {
  const CircleBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }));

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <CircleBox>
      <CircularProgress
        size={matches ? 40 : 30}
        sx={{ color: Colors.greyTextBlood }}
      />
    </CircleBox>
  );
}

export default LoadingCircle;
