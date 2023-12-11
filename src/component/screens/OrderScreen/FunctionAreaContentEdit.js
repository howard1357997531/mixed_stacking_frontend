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
} from "../../../styles/OrderScreen/FunctionAreaContentEdit";
import "./css/FunctionAreaContentEdit.css";
import { useSelector } from "react-redux";
import CenterText from "../../../tool/CenterText";

function FunctionAreaContentEdit() {
  const { data } = useSelector((state) => state.orderList);
  const { edit } = useSelector((state) => state.orderScreen_orderSelect);

  if (data && edit) {
    var [orderData] = data.filter((order) => order.id === edit);
    const count = orderData.orderItem.map((order) => order.quantity);
    var orderCount = `總數: ${count.reduce((acc, cur) => acc + cur, 0)}`;
  }

  return !edit ? (
    <CenterText text={"請選擇工單"} />
  ) : (
    <OrderBox>
      <OrderTitleBox>
        <OrderTitleLeftBox>{orderCount}</OrderTitleLeftBox>
        <input
          type="text"
          className={`edit-title-input`}
          defaultValue={orderData.name}
        ></input>
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
              <OrderDetailSmBox>
                <input
                  type="text"
                  className={`edit-item-input ${order.name}`}
                  defaultValue={order.quantity}
                ></input>
              </OrderDetailSmBox>
            </OrderDetailBox>
          ) : null
        )}
      </OrderContentBox>
    </OrderBox>
  );
}

export default FunctionAreaContentEdit;
