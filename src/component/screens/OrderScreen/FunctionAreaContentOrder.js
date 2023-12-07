import React from "react";
import {
  OrderBox,
  OrderContentBox,
  OrderDetailBox,
  OrderDetailSmBox,
  OrderTitleBox,
  OrderTitle2Box,
  OrderTitle2SmBox,
  OrderTitleCenterBox,
  OrderTitleLeftBox,
  OrderTitleRightBox,
} from "../../../styles/OrderScreen/FunctionAreaContentOrder";
import "./css/FunctionAreaContentOrder.css";

function FunctionAreaContentOrder({ orderCurrentData }) {
  if (orderCurrentData) {
    var orderCountArray = orderCurrentData.orderItem.map(
      (order) => order.quantity
    );
    var orderCount = orderCountArray.reduce((acc, value) => acc + value, 0);
  }
  console.log(orderCurrentData);
  return (
    <OrderBox>
      <OrderTitleBox>
        <OrderTitleLeftBox>總數: {orderCount}</OrderTitleLeftBox>
        <OrderTitleCenterBox>{orderCurrentData.name}</OrderTitleCenterBox>
        <OrderTitleRightBox>
          {orderCurrentData.createdAt.slice(-6)}
        </OrderTitleRightBox>
      </OrderTitleBox>

      <OrderTitle2Box>
        <OrderTitle2SmBox isName={true}>名稱</OrderTitle2SmBox>
        <OrderTitle2SmBox>寬度</OrderTitle2SmBox>
        <OrderTitle2SmBox>長度</OrderTitle2SmBox>
        <OrderTitle2SmBox>高度</OrderTitle2SmBox>
        <OrderTitle2SmBox>數量</OrderTitle2SmBox>
      </OrderTitle2Box>

      <OrderContentBox className="function-order-box">
        {orderCurrentData.orderItem.map((order, index) =>
          order.quantity !== 0 ? (
            <OrderDetailBox key={index} isFirst={index === 0}>
              <OrderDetailSmBox isName={true}>{order.name}</OrderDetailSmBox>
              <OrderDetailSmBox>{order.width}</OrderDetailSmBox>
              <OrderDetailSmBox>{order.height}</OrderDetailSmBox>
              <OrderDetailSmBox>{order.depth}</OrderDetailSmBox>
              <OrderDetailSmBox>{order.quantity}</OrderDetailSmBox>
            </OrderDetailBox>
          ) : null
        )}
      </OrderContentBox>
    </OrderBox>
  );
}

export default FunctionAreaContentOrder;
