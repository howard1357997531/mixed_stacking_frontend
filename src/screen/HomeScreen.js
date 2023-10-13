import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import HomeDesktop from "../component/screens/HomeScreen/HomeDesktop";
import HomeMobile from "../component/screens/HomeScreen/HomeMobile";

function HomeScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {matches ? (
        <HomeDesktop matches={matches} />
      ) : (
        <HomeMobile matches={matches} />
      )}
    </>
  );
}

export default HomeScreen;
