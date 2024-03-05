import React from "react";
import {
  DescRectText,
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
import { Colors } from "../../../styles/theme";

function OrderDetailDialogTabsOriginal({ source, orderId, orderSelectData }) {
  if (orderId) {
    if (source === "order") {
      var orderData = orderSelectData;
    } else if (source === "multiOrder") {
      const [orderTemp] = orderSelectData.multipleOrder.filter(
        (order) => order.order.id === orderId
      );
      var orderData = orderTemp.order;
    } else if (source === "executeOrder") {
      var orderData = orderSelectData;
    }
  }

  const page = window.location.pathname === "/order";
  if (orderId) {
    var descData = [
      { name: "名稱", text: orderData.name },
      { name: "上傳", text: orderData.createdAt },
      // { name: "修改日期", text: modifiyText },
    ];
  }

  return orderId ? (
    <OrderBox className="order-dialog">
      {descData.map((desc, index) => (
        <DescTextBox key={index}>
          <DescText
            isTitle={true}
            sx={{ color: page ? Colors.greenDialog : Colors.orangeDialog }}
          >
            {desc.name}
          </DescText>
          <DescText sx={{ marginLeft: "7px" }}>{desc.text}</DescText>
        </DescTextBox>
      ))}

      <DescTextBox sx={{ justifyContent: "space-between" }}>
        <DescRectText
          sx={{ color: page ? Colors.greenDialog : Colors.orangeDialog }}
        >
          詳細資訊
        </DescRectText>
        <DescText>
          數量: {orderData.aiTraining_order.split(",").length}
        </DescText>
      </DescTextBox>

      <OrderContentTitleBox page={page}>
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
              <OrderDetailSmBox
                sx={{
                  width: "40%",
                  backgroundColor: page
                    ? Colors.greenDialogHover
                    : Colors.orangeDialogHover,
                }}
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
      </OrderContentBox>
    </OrderBox>
  ) : null;
}

export default OrderDetailDialogTabsOriginal;
