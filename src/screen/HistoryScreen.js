import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import HistoryDesktop from "../component/screens/HistoryScreen/HistoryDesktop";

function HistoryScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return matches ? <HistoryDesktop /> : <HistoryDesktop />;
}

export default HistoryScreen;
