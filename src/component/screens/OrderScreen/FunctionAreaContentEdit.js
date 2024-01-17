import React, { useEffect, useState } from "react";
import "./css/FunctionAreaContentEdit.css";
import { useDispatch, useSelector } from "react-redux";
import CenterText from "../../../tool/CenterText";
import { orderEditAction } from "../../../redux/actions/OrderScreenAction";
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
import { Input, Stack, Tooltip } from "@mui/material";
import { Colors } from "../../../styles/theme";
import { StyleEditIcon } from "../../../styles/OrderScreen/FunctionAreaContentEdit";
import InfoIcon from "@mui/icons-material/Info";
import {
  OrderListNavBtn,
  OrderListNavBtnText,
} from "../../../styles/OrderScreen";

function FunctionAreaContentEdit() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.orderList);
  const { editId, editData } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  if (data && editId) {
    var [orderData] = data.filter((order) => order.id === editId);
  }

  const [title, setTitle] = useState("");
  const [allData, setAllData] = useState({});

  useEffect(() => {
    if (editData) {
      setTitle(editData["name"]);
      setAllData(editData);
    }
  }, [editData]);

  const countHandler = (e) => {
    const { name, value } = e.target;
    const checkValue = value !== "" ? Number(value) : "";
    setAllData((prev) => {
      const temp = { ...prev };
      temp[name] = checkValue;
      return temp;
    });
    // dispatch(orderEditChangeAction(name, Math.abs(e.target.value), editData));
  };

  const editBtnHandler = () => {
    console.log(allData);
    dispatch(orderEditAction(editData, title, allData));
  };

  return !editId ? (
    <CenterText text={"請選擇工單"} />
  ) : orderData.aiTraining_state === "is_training" ? (
    <CenterText text={"工單演算中..."} />
  ) : (
    <OrderBox>
      {/* <StyleEditIcon onClick={editBtnHandler} /> */}
      <OrderListNavBtn
        sx={{ position: "absolute", top: "21px", right: "20px" }}
        onClick={editBtnHandler}
      >
        <img
          style={{ width: "24px", height: "24px" }}
          src={"ok.png"}
          alt={"ok.png"}
        />
        <OrderListNavBtnText>確認修改</OrderListNavBtnText>
      </OrderListNavBtn>
      <Stack direction={"row"} justifyContent="center">
        <Input
          required
          name="name"
          autoFocus
          sx={{
            width: "200px",
            height: "40px",
            color: Colors.lightOrange,
            backgroundColor: Colors.darkGreen,
            fontWeight: 600,
          }}
          defaultValue={editData.name}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Stack>

      <DescTextBox mt={1}>
        <DescText isTitle={true}>詳細資訊</DescText>
        <Tooltip title="綠色部分為可修改部分" placement="right" arrow>
          <InfoIcon sx={{ marginLeft: "4px", color: Colors.darkGreen }} />
        </Tooltip>
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
                style={{
                  color: Colors.lightOrange,
                  backgroundColor: Colors.darkGreen,
                }}
              ></input>
            </OrderDetailSmBox>
          </OrderDetailBox>
        ))}
      </OrderContentBox>
    </OrderBox>
  );
}

export default FunctionAreaContentEdit;
