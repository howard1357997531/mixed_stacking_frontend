import React from "react";
import { OrderListContentBox } from "../../../styles/OrderScreen";
import "./css/OrderList.css";
import OrderListContentSingleOrder from "./OrderListContentSingleOrder";
import OrderListContentMultipleOrder from "./OrderListContentMultipleOrder";

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
    <OrderListContentBox className="worklist-box">
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
