import React, { useEffect, useRef, useState } from "react";
import {
  AvatarDivider,
  MenuFunctionBox,
  MenuFunctionTitle,
  MultiCreateAvatar,
  MultiCreateAvatarBox,
} from "../../../styles/OrderScreen";
import { OrderListExeListDelete } from "../../../styles/RobotControlScreen/dialog";
import "./css/FunctionAreaContentMultipleOrderCreate.css";
import { useDispatch, useSelector } from "react-redux";
import CenterText from "../../../tool/CenterText";
import {
  multipleOrderCreateDeleteAction,
  multipleOrderCreateInputChangeAction,
} from "../../../redux/actions/OrderScreenAction";
import { ORDER_SCREEN } from "../../../redux/constants";

function FunctionAreaContentMultipleOrderCreate({ orderListData }) {
  const dispatch = useDispatch();
  const {
    combineOrder,
    combineOrderFocusIndex,
    combineOrderFocusValue,
    combineOrderFocusBool,
  } = useSelector((state) => state.orderScreen_orderSelect);

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

  const inputChangeHandler = (e, index) => {
    if (e.target.value !== "") {
      const num = parseInt(e.target.value) > 0 ? e.target.value : "1";
      dispatch(multipleOrderCreateInputChangeAction(index, num, combineOrder));
      const combineOrderFocusIndex = index;
      dispatch({
        type: ORDER_SCREEN.orderSelectData,
        payload: {
          combineOrderFocusBool: !combineOrderFocusBool,
          combineOrderFocusIndex,
        },
      });
    }
  };

  // focus blur 單一動作只會觸發一次
  const inputFocusHandler = (e, index) => {
    if (e.target.value !== "") {
      // const combineOrderFocusBool = true;
      // const combineOrderFocusIndex = index;
      // const combineOrderFocusValue = e.target.value;
      // dispatch({
      //   type: ORDER_SCREEN.orderSelectData,
      //   payload: {
      //     combineOrderFocusBool,
      //     combineOrderFocusIndex,
      //     combineOrderFocusValue,
      //   },
      // });
      // setFocusValue(index);
    }
  };

  const inputBlurHandler = (e, index) => {
    if (e.target.value === "") {
      dispatch(multipleOrderCreateInputChangeAction(index, "1", combineOrder));
    }
  };

  const deleteHandler = (index) => {
    dispatch(multipleOrderCreateDeleteAction(index, combineOrder));
  };

  const inputFocusRef = useRef(null);
  const inputNoFocusRef = useRef(null);
  useEffect(() => {
    if (combineOrder.length !== 0) {
      inputFocusRef.current.focus();
    }
  }, [combineOrderFocusBool]);

  return combineOrder.length === 0 ? (
    <CenterText text={"尚未選擇工單"} />
  ) : (
    combineOrder.map((order, index) => (
      <MenuFunctionBox key={index}>
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
          className={`multi-create-input ${index}`}
          defaultValue={parseTimes(order)}
          ref={
            index === combineOrderFocusIndex ? inputFocusRef : inputNoFocusRef
          }
          onChange={(e) => inputChangeHandler(e, index)}
          onFocus={(e) => inputFocusHandler(e, index)}
          onBlur={(e) => inputBlurHandler(e, index)}
        ></input>

        <OrderListExeListDelete onClick={() => deleteHandler(index)} />
      </MenuFunctionBox>
    ))
  );
}

export default FunctionAreaContentMultipleOrderCreate;
