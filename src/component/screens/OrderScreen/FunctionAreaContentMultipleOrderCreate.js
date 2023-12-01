import React from "react";
import {
  AvatarDivider,
  MenuFunctionBox,
  MenuFunctionTitle,
  MultiCreateAvatar,
  MultiCreateAvatarBox,
} from "../../../styles/OrderScreen";
import { OrderListExeListDelete } from "../../../styles/RobotControlScreen/dialog";
import "./css/FunctionAreaContentMultipleOrderCreate.css";
import { useSelector } from "react-redux";
import CenterText from "../../../tool/CenterText";

function FunctionAreaContentMultipleOrderCreate({ orderListData }) {
  const { combineOrder } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  if (combineOrder.length !== 0) {
    const countArray = combineOrder.map((order) =>
      order.includes("*") ? parseInt(order.split("*").at(1)) : 1
    );
    console.log(countArray);
    const indexArray = countArray.map((count, index) =>
      countArray.slice(0, index + 1).reduce((acc, cur) => acc + cur)
    );
    console.log(indexArray);
    var parseIndex = (index) => (index === 0 ? 1 : indexArray[index - 1] + 1);
    var parseIndex2 = (index) => indexArray[index];
  }

  const parseId = (id) => {
    return parseInt(id.split("*").at(0));
  };

  const parseTimes = (times) => {
    return times.includes("*") ? parseInt(times.split("*").at(1)) : 1;
  };

  const parseName = (orderId) => {
    let [filterData] = orderListData.filter((order) => order.id === orderId);
    return filterData;
  };

  return combineOrder.length === 0 ? (
    <CenterText text={"尚未選擇工單"} />
  ) : (
    combineOrder.map((order, index) => (
      <MenuFunctionBox key={parseId(order)}>
        <MultiCreateAvatarBox>
          <MultiCreateAvatar>{parseIndex(index)}</MultiCreateAvatar>
          {order.includes("*") ? (
            <>
              <AvatarDivider />
              <MultiCreateAvatar>{parseIndex2(index)}</MultiCreateAvatar>
            </>
          ) : null}
        </MultiCreateAvatarBox>

        <MenuFunctionTitle>{parseName(parseId(order)).name}</MenuFunctionTitle>

        <input
          type="number"
          className="multi-create-input"
          defaultValue={parseTimes(order)}
        ></input>

        <OrderListExeListDelete />
      </MenuFunctionBox>
    ))
  );
}

export default FunctionAreaContentMultipleOrderCreate;
