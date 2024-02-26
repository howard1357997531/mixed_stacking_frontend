import React, { Fragment } from "react";
import {
  OrderBox,
  OrderContentBox,
  OrderDetailBox,
  OrderDetailSmBox,
  DescText,
  OrderContentTitleBox,
  OrderContentTitleSmBox,
  IsTrainingText,
  DescTextBox,
  DescRectText,
} from "../../../styles/OrderScreen/FunctionAreaContentOrder";
import "./css/FunctionAreaContentOrder.css";
import { useSelector } from "react-redux";

function FunctionAreaContentOrder() {
  const { aiTrainingState } = useSelector(
    (state) => state.orderScreen_orderSelect
  );
  const { data } = useSelector((state) => state.orderList);
  const { orderId } = useSelector((state) => state.orderScreen_orderSelect);

  if (data && orderId) {
    var [orderData] = data.filter((order) => order.id === orderId);
    const count = orderData.orderItem.map((order) => order.quantity);
    var orderCount = `${count.reduce((acc, cur) => acc + cur)}`;
    var modifiyText =
      orderData.modifiedAt === orderData.createdAt
        ? "(尚未修改過)"
        : orderData.modifiedAt;
  }

  return (
    <OrderBox>
      {aiTrainingState === "is_training" ? (
        <Fragment>
          <img
            src={"loading.gif"}
            alt={"loading.gif"}
            className="is-training-gif"
          ></img>
          <IsTrainingText>演算中</IsTrainingText>
        </Fragment>
      ) : null}

      <DescTextBox>
        <DescText isTitle={true}>上傳日期</DescText>
        <DescText sx={{ marginLeft: "7px" }}>{orderData.createdAt}</DescText>
      </DescTextBox>

      <DescTextBox>
        <DescText isTitle={true}>修改日期</DescText>
        <DescText sx={{ marginLeft: "7px" }}>{modifiyText}</DescText>
      </DescTextBox>

      <DescTextBox sx={{ justifyContent: "space-between" }}>
        <DescRectText>詳細資訊</DescRectText>
        <DescText>總數: {orderCount}</DescText>
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
  );
}

export default FunctionAreaContentOrder;
