import React, { useEffect } from "react";
import { OrderContainer, StyleBox } from "../styles/OrderScreen";
import { useMediaQuery, useTheme } from "@mui/material";
import OrderDesktop from "../component/screens/OrderScreen/OrderDesktop";
import OrderMobile from "../component/screens/OrderScreen/OrderMobile";
import { useDispatch } from "react-redux";
import { orderListAction } from "../redux/actions/OrderActions";
// import { OrderContainer, StyleBox } from "../../styles/OrderScreen";

function OrderScreen() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    dispatch(orderListAction());
  }, [dispatch]);
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
