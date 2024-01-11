import React from "react";
import {
  DescText,
  DescTextBox,
  OrderBox,
  OrderContentBox,
  OrderContentTitleBox,
  OrderContentTitleSmBox,
  OrderCount,
  OrderDate,
  OrderDescBox,
  OrderDetailBox,
  OrderDetailSmBox,
  OrderTitle,
} from "../../../styles/dialog/OrderDetailDialogTabsOriginal";

function OrderDetailDialogTabsOriginal({ source, orderId, orderSelectData }) {
  if (orderId) {
    if (source === "order") {
      var orderData = orderSelectData;
    } else if (source === "multiOrder") {
      const [orderTemp] = orderSelectData.multipleOrder.filter(
        (order) => order.order.id === orderId
      );
      var orderData = orderTemp.order;
    }
    var modifiyText =
      orderData.modifiedAt === orderData.createdAt
        ? "尚未修改過"
        : orderData.modifiedAt;
  }

  return orderId ? (
    <OrderBox className="order-dialog">
      <DescText>名稱 : {orderData.name}</DescText>
      <DescText>
        總數量 : {orderData.aiTraining_order.split(",").length}
      </DescText>
      <DescText>上傳日期 : {orderData.createdAt}</DescText>
      <DescText>修改日期 : {modifiyText}</DescText>

      <DescTextBox>
        <DescText isTitle={true}>詳細資訊</DescText>
      </DescTextBox>
      <OrderContentTitleBox>
        <OrderContentTitleSmBox isName={true}>名稱</OrderContentTitleSmBox>
        <OrderContentTitleSmBox>寬度</OrderContentTitleSmBox>
        <OrderContentTitleSmBox>長度</OrderContentTitleSmBox>
        <OrderContentTitleSmBox>高度</OrderContentTitleSmBox>
        <OrderContentTitleSmBox>數量</OrderContentTitleSmBox>
      </OrderContentTitleBox>

      <OrderContentBox className="function-order-box">
        {orderData.orderItem.map((order, index) =>
          order.quantity !== 0 ? (
            <OrderDetailBox key={index}>
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
  ) : null;
}

export default OrderDetailDialogTabsOriginal;
