import React from "react";
import { OrderListContentBox } from "../../../styles/OrderScreen";
import OrderListContentSingleOrder from "./OrderListContentSingleOrder";
import OrderListContentMultipleOrder from "./OrderListContentMultipleOrder";
import "./css/OrderListContent.css";
import OrderListContentMultipleOrderCreate from "./OrderListContentMultipleOrderCreate";

function OrderListContent(props) {
  const singleOrderNameArray = [
    "close",
    "orderDetail",
    "aiResult",
    "edit",
    "delete",
  ];

  return (
    <>
      {singleOrderNameArray.includes(props.orderSelectMode) ? (
        <OrderListContentSingleOrder {...props} />
      ) : null}

      {["multipleOrder", "noMultipleOrder"].includes(props.orderSelectMode) ? (
        <OrderListContentMultipleOrder />
      ) : null}

      {props.orderSelectMode === "multipleOrderCreate" ? (
        <OrderListContentMultipleOrderCreate {...props} />
      ) : null}
    </>
  );
}

export default OrderListContent;
