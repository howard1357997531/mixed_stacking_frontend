import React, { useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import OrderDesktop from "../component/screens/OrderScreen/OrderDesktop";
import OrderMobile from "../component/screens/OrderScreen/OrderMobile";
import { useDispatch, useSelector } from "react-redux";
import {
  multipleOrderListAction,
  orderListAction,
} from "../redux/actions/OrderActions";

function OrderScreen() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const { mode: orderSelectMode, orderId: orderSelectId } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  const propsData = {
    matches,
    orderSelectMode,
    orderSelectId,
  };

  useEffect(() => {
    dispatch(orderListAction());
    dispatch(multipleOrderListAction());
  }, [dispatch]);
  return (
    <>
      {matches ? (
        <OrderDesktop {...propsData} />
      ) : (
        <OrderMobile {...propsData} />
      )}
    </>
  );
}

export default OrderScreen;
