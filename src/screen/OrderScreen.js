import React, { useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import OrderDesktop from "../component/screens/OrderScreen/OrderDesktop";
import OrderMobile from "../component/screens/OrderScreen/OrderMobile";
import { useDispatch, useSelector } from "react-redux";

function OrderScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const { mode: orderSelectMode, orderId: orderSelectIdArray } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  const { data: multipleOrderListData } = useSelector(
    (state) => state.multipleOrderList
  );

  const propsData = {
    matches,
    orderSelectMode,
    orderSelectIdArray,
    multipleOrderListData,
  };

  // useEffect(() => {
  //   dispatch(orderListAction());
  //   dispatch(multipleOrderListAction());
  // }, [dispatch]);
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
