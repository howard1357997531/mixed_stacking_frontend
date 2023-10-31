import React from "react";
import { OrderListContentBox } from "../../../styles/OrderScreen";
import "./css/OrderList.css";
import OrderListContentSingleOrder from "./OrderListContentSingleOrder";
import OrderListContentMultipleOrder from "./OrderListContentMultipleOrder";

function OrderListContent(props) {
  return (
    <OrderListContentBox className="worklist-box">
      {["close", "orderDetail", "aiResult", "multipleOrderCreate"].includes(
        props.orderSelectMode
      ) ? (
        <OrderListContentSingleOrder {...props} />
      ) : null}

      {props.orderSelectMode === "multipleOrder" ? (
        <OrderListContentMultipleOrder {...props} />
      ) : null}
    </OrderListContentBox>
  );
}

export default OrderListContent;
