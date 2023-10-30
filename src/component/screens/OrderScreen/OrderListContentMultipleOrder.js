import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { multipleOrderListAction } from "../../../redux/actions/OrderActions";

function OrderListContentMultipleOrder() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(multipleOrderListAction());
  }, []);
  return <div>asdasdasd</div>;
}

export default OrderListContentMultipleOrder;
