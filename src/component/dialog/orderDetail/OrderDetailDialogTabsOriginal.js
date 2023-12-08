import React from "react";
import {
  OrderBox,
  OrderCount,
  OrderDate,
  OrderDescBox,
  OrderDetailBox,
  OrderDetailSmBox,
  OrderTitle,
} from "../../../styles/dialog/OrderDetailDialogTabsOriginal";
import { Colors } from "../../../styles/theme";

function OrderDetailDialogTabsOriginal({ source, orderId, orderSelectData }) {
  if (source === "order" && orderId) {
    var orderData = orderSelectData;
  } else if (source === "multiOrder" && orderId) {
    const [orderTemp] = orderSelectData.multipleOrder.filter(
      (order) => order.order.id === orderId
    );
    var orderData = orderTemp.order;
  }

  return orderId ? (
    <OrderBox className="order-dialog">
      <OrderTitle variant="h6">{orderData.name}</OrderTitle>

      <OrderDescBox>
        <OrderCount variant="body2">
          數量:{orderData.aiTraining_order.split(",").length}
        </OrderCount>
        <OrderDate variant="body2">{orderData.createdAt}</OrderDate>
      </OrderDescBox>

      <OrderDetailBox isTitle={true}>
        <OrderDetailSmBox>名稱</OrderDetailSmBox>
        <OrderDetailSmBox>寬度</OrderDetailSmBox>
        <OrderDetailSmBox>長度</OrderDetailSmBox>
        <OrderDetailSmBox>高度</OrderDetailSmBox>
        <OrderDetailSmBox>數量</OrderDetailSmBox>
      </OrderDetailBox>

      {orderData.orderItem.map((order, index) =>
        order.quantity !== 0 ? (
          <OrderDetailBox key={index} isTitle={false}>
            <OrderDetailSmBox
              sx={{ backgroundColor: Colors.blue700, color: Colors.brown100 }}
            >
              {order.name}
            </OrderDetailSmBox>
            <OrderDetailSmBox>{order.width}</OrderDetailSmBox>
            <OrderDetailSmBox>{order.height}</OrderDetailSmBox>
            <OrderDetailSmBox>{order.depth}</OrderDetailSmBox>
            <OrderDetailSmBox>{order.quantity}</OrderDetailSmBox>
          </OrderDetailBox>
        ) : null
      )}
    </OrderBox>
  ) : null;
}

export default OrderDetailDialogTabsOriginal;
