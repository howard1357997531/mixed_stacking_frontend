import React from "react";
import {
  AiResultBox,
  OrderBox,
  AiResultOrder,
  AiResultSmBox,
  AiResultName,
  StyleAvatar,
} from "../../../styles/dialog/OrderDetailDialogTabsAiResult";
import { AiResultAvatarBgcolor } from "../../../tool/func";

function OrderDetailDialogTabsAiResult({ source, orderId, orderSelectData }) {
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
      {orderData.aiTraining_order.split(",").map((order, index) => (
        <AiResultBox key={index}>
          <AiResultSmBox cumColor={AiResultAvatarBgcolor(index + 1)}>
            <AiResultOrder cumColor={AiResultAvatarBgcolor(index + 1)}>
              <StyleAvatar cumColor={AiResultAvatarBgcolor(index + 1)}>
                {index + 1}
              </StyleAvatar>
            </AiResultOrder>
            <AiResultName cumColor={AiResultAvatarBgcolor(index + 1)}>
              {order}
            </AiResultName>
          </AiResultSmBox>
        </AiResultBox>
      ))}
    </OrderBox>
  ) : null;
}

export default OrderDetailDialogTabsAiResult;
