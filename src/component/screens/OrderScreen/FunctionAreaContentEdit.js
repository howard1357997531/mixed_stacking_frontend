import React, { useEffect, useState } from "react";
import "./css/FunctionAreaContentEdit.css";
import { useDispatch, useSelector } from "react-redux";
import CenterText from "../../../tool/CenterText";
import { orderEditChangeAction } from "../../../redux/actions/OrderScreenAction";
import {
  OrderBox,
  DescText,
  DescTextBox,
  OrderContentTitleBox,
  OrderContentTitleSmBox,
  OrderContentBox,
  OrderDetailBox,
  OrderDetailSmBox,
} from "../../../styles/OrderScreen/FunctionAreaContentOrder";
import { Input, InputAdornment, Stack } from "@mui/material";
import { Colors } from "../../../styles/theme";

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

  const [qwe, setQWe] = useState({});

  useEffect(() => {
    setQWe(editData);
  }, [editData]);

  const titleHandler = (e) => {
    const { name, value } = e.target;
    setQWe((prev) => {
      const temp = { ...prev };
      temp[name] = value;
      return temp;
    });
    // dispatch(orderEditChangeAction("name", e.target.value, editData));
  };

  const countHandler = (e) => {
    const { name, value } = e.target;
    const checkValue = value !== "" ? parseInt(value) : "";
    setQWe((prev) => {
      const temp = { ...prev };
      temp[name] = checkValue;
      return temp;
    });
    // dispatch(orderEditChangeAction(name, Math.abs(e.target.value), editData));
  };
  console.log(qwe);

  const editBtnHandler = () => {
    for (let key in qwe) {
      if (qwe[key] === "") return;
    }
    console.log("asdasd");
  };

  return !edit ? (
    <CenterText text={"請選擇工單"} />
  ) : orderData.aiTraining_state === "is_training" ? (
    <CenterText text={"工單演算中..."} />
  ) : (
    <OrderBox>
      <button onClick={editBtnHandler}>123</button>
      <Stack direction={"row"} justifyContent="center">
        <Input
          name="name"
          autoFocus
          sx={{
            width: "200px",
            height: "40px",
            color: Colors.lightOrangeHover,
            backgroundColor: Colors.grey600,
          }}
          defaultValue={editData.name}
          onChange={titleHandler}
        />
      </Stack>

      <DescTextBox mt={1}>
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
        {orderData.orderItem.map((order, index) => (
          <OrderDetailBox key={index}>
            <OrderDetailSmBox isName={true}>{order.name}</OrderDetailSmBox>
            <OrderDetailSmBox>{order.width}</OrderDetailSmBox>
            <OrderDetailSmBox>{order.height}</OrderDetailSmBox>
            <OrderDetailSmBox>{order.depth}</OrderDetailSmBox>
            <OrderDetailSmBox>
              <input
                type="number"
                name={order.name}
                className={`edit-item-input ${order.name}`}
                defaultValue={editData[order.name]}
                onChange={countHandler}
              ></input>
            </OrderDetailSmBox>
          </OrderDetailBox>
        ))}
      </OrderContentBox>
    </OrderBox>
  );
}

export default FunctionAreaContentEdit;
