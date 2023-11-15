import React from "react";
import { OrderListContentBox } from "../../../styles/OrderScreen";
import OrderListContentSingleOrder from "./OrderListContentSingleOrder";
import OrderListContentMultipleOrder from "./OrderListContentMultipleOrder";
import "./css/OrderListContent.css";

function OrderListContent(props) {
  const singleOrderNameArray = [
    "close",
    "orderDetail",
    "aiResult",
    "multipleOrderCreate",
    "edit",
    "delete",
  ];

  return (
    <OrderListContentBox className="order-list">
      {singleOrderNameArray.includes(props.orderSelectMode) ? (
        <OrderListContentSingleOrder {...props} />
      ) : null}

      {props.orderSelectMode === "multipleOrder" ? (
        <OrderListContentMultipleOrder />
      ) : null}
    </OrderListContentBox>
  );
}

export default OrderListContent;
