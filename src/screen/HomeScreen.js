import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import HomeMobile from "../component/HomeScreen/HomeMobile";
import HomeDesktop from "../component/HomeScreen/HomeDesktop";

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
