import React from "react";
import { OrderContainer, StyleBox } from "../styles/OrderScreen";
import { useMediaQuery, useTheme } from "@mui/material";
import OrderDesktop from "../component/screens/OrderScreen/OrderDesktop";
import OrderMobile from "../component/screens/OrderScreen/OrderMobile";
// import { OrderContainer, StyleBox } from "../../styles/OrderScreen";

function OrderScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      {matches ? (
        <OrderDesktop matches={matches} />
      ) : (
        <OrderMobile matches={matches} />
      )}
    </>
  );
}

export default OrderScreen;
