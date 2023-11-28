import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Demo1SelectItemsDesktop from "../component/screens/Demo1SelectItemsScreen/Demo1SelectItemsDesktop";

function Demo1SelectItemsScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return matches ? <Demo1SelectItemsDesktop /> : <Demo1SelectItemsDesktop />;
}

export default Demo1SelectItemsScreen;
