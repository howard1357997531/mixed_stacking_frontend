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
import { useSelector } from "react-redux";

function FunctionAreaContentOrder() {
  const { data } = useSelector((state) => state.orderList);
  const { orderId } = useSelector((state) => state.orderScreen_orderSelect);

  if (data) {
    var [orderData] = data.filter((order) => order.id === orderId);
    var orderCount = orderData.aiTraining_order
      ? `總數: ${orderData.aiTraining_order.split(",").length}`
      : "";
  }

  return (
    <OrderBox>
      <OrderTitleBox>
        <OrderTitleLeftBox>{orderCount}</OrderTitleLeftBox>
        <OrderTitleCenterBox>{orderData.name}</OrderTitleCenterBox>
        <OrderTitleRightBox>{orderData.createdAt.slice(-6)}</OrderTitleRightBox>
      </OrderTitleBox>

      <OrderTitle2Box>
        <OrderTitle2SmBox isName={true}>名稱</OrderTitle2SmBox>
        <OrderTitle2SmBox>寬度</OrderTitle2SmBox>
        <OrderTitle2SmBox>長度</OrderTitle2SmBox>
        <OrderTitle2SmBox>高度</OrderTitle2SmBox>
        <OrderTitle2SmBox>數量</OrderTitle2SmBox>
      </OrderTitle2Box>

      <OrderContentBox className="function-order-box">
        {orderData.orderItem.map((order, index) =>
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
