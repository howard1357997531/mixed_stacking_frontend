import React from "react";
import {
  OrderBox,
  OrderContentBox,
  OrderDetailBox,
  OrderDetailSmBox,
  OrderTitleBox,
  OrderTitle2Box,
  OrderTitle2SmBox,
  OrderTitleLeftBox,
  OrderTitleRightBox,
} from "../../../styles/OrderScreen/FunctionAreaContentEdit";
import "./css/FunctionAreaContentEdit.css";
import { useDispatch, useSelector } from "react-redux";
import CenterText from "../../../tool/CenterText";
import { orderEditChangeAction } from "../../../redux/actions/OrderScreenAction";

function FunctionAreaContentEdit() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.orderList);
  const { edit, editData } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  if (data && edit) {
    var [orderData] = data.filter((order) => order.id === edit);
    const count = orderData.orderItem.map((order) => order.quantity);
    var orderCount = `總數: ${count.reduce((acc, cur) => acc + cur, 0)}`;
  }

  const titleHandler = (e) => {
    dispatch(orderEditChangeAction("name", e.target.value, editData));
  };

  const countHandler = (e, name) => {
    if (e.target.value === "") {
      return;
    }
    dispatch(orderEditChangeAction(name, Math.abs(e.target.value), editData));
  };

  return !edit ? (
    <CenterText text={"請選擇工單"} />
  ) : orderData.aiTraining_state === "is_training" ? (
    <CenterText text={"工單演算中..."} />
  ) : (
    <OrderBox>
      <OrderTitleBox>
        <OrderTitleLeftBox>{orderCount}</OrderTitleLeftBox>
        <input
          type="text"
          className={`edit-title-input`}
          defaultValue={editData.name}
          onChange={titleHandler}
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
        {orderData.orderItem.map((order, index) => (
          <OrderDetailBox key={index} isFirst={index === 0}>
            <OrderDetailSmBox isName={true}>{order.name}</OrderDetailSmBox>
            <OrderDetailSmBox>{order.width}</OrderDetailSmBox>
            <OrderDetailSmBox>{order.height}</OrderDetailSmBox>
            <OrderDetailSmBox>{order.depth}</OrderDetailSmBox>
            <OrderDetailSmBox>
              <input
                type="number"
                className={`edit-item-input ${order.name}`}
                defaultValue={editData[order.name]}
                onChange={(e) => countHandler(e, order.name)}
              ></input>
            </OrderDetailSmBox>
          </OrderDetailBox>
        ))}
      </OrderContentBox>
    </OrderBox>
  );
}

export default FunctionAreaContentEdit;
