import React, { useEffect, useRef, useState } from "react";
import {
  AvatarDivider,
  MultiCreateAvatar,
  MultiCreateAvatarBox,
  MultiCreateBox,
  MultiCreateCount,
  MultiCreateOrderName,
  MultiCreateResetBtn,
  MultiCreateSelectBox,
  MultiCreateSelectSmBox,
  MultiCreateTitle,
} from "../../../styles/OrderScreen/FunctionAreaContentMultipleOrderCreate";
import { OrderListExeListDelete } from "../../../styles/RobotControlScreen/dialog";
import { useDispatch, useSelector } from "react-redux";
import CenterText from "../../../tool/CenterText";
import {
  multipleOrderCreateDeleteAction,
  multipleOrderCreateInputChangeAction,
} from "../../../redux/actions/OrderScreenAction";
import { ORDER_SCREEN } from "../../../redux/constants";
import "./css/FunctionAreaContentMultipleOrderCreate.css";
import { Colors } from "../../../styles/theme";

function FunctionAreaContentMultipleOrderCreate() {
  const dispatch = useDispatch();
  const {
    combineOrder,
    combineOrderName,
    combineOrderSelectBool,
    combineOrderFocusBool,
    combineOrderFocusIndex,
  } = useSelector((state) => state.orderScreen_orderSelect);

  if (combineOrder.length !== 0) {
    const countArray = combineOrder.map((order) =>
      order.includes("*") ? parseInt(order.split("*").at(1)) : 1
    );

    const indexArray = countArray.map((count, index) =>
      countArray.slice(0, index + 1).reduce((acc, cur) => acc + cur)
    );

    var parseIndex = (index) => (index === 0 ? 1 : indexArray[index - 1] + 1);
    var parseIndex2 = (index) => indexArray[index];
  }

  const parseTimes = (times) => {
    return times.includes("*") ? parseInt(times.split("*").at(1)) : 1;
  };

  const parseCount = (orders) => {
    const count = orders.map((order) =>
      order.includes("*") ? parseInt(order.split("*").at(1)) : 1
    );
    return count.reduce((acc, crr) => acc + crr);
  };

  const inputChangeHandler = (e, index) => {
    if (e.target.value !== "") {
      const num = parseInt(e.target.value) > 0 ? e.target.value : "1";
      dispatch(multipleOrderCreateInputChangeAction(index, num, combineOrder));
      const combineOrderFocusIndex = index;
      dispatch({
        type: ORDER_SCREEN.orderSelect,
        payload: {
          combineOrderFocusBool: !combineOrderFocusBool,
          combineOrderFocusIndex,
        },
      });
    }
  };

  // focus blur 單一動作只會觸發一次
  // 不知為啥 fouce 裡面不能使用 dispatch
  const inputFocusHandler = (e, index) => {
    if (e.target.value !== "") {
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
    if (combineOrder.length !== 0 && combineOrderFocusIndex !== null) {
      inputFocusRef.current.focus();
    }
  }, [combineOrderFocusBool]);

  return combineOrder.length === 0 ? (
    <CenterText text={"尚未選擇工單"} />
  ) : (
    <MultiCreateBox>
      <MultiCreateTitle>
        <MultiCreateCount>數量: {parseCount(combineOrder)}</MultiCreateCount>
      </MultiCreateTitle>

      <MultiCreateSelectBox className="multi-create-select-box">
        {combineOrder.map((order, index) => (
          <MultiCreateSelectSmBox key={index}>
            <MultiCreateAvatarBox>
              <MultiCreateAvatar>{parseIndex(index)}</MultiCreateAvatar>
              {order.includes("*") ? (
                <>
                  <AvatarDivider />
                  <MultiCreateAvatar>{parseIndex2(index)}</MultiCreateAvatar>
                </>
              ) : null}
            </MultiCreateAvatarBox>

            <MultiCreateOrderName>
              {combineOrderName[index]}
            </MultiCreateOrderName>

            <input
              type="number"
              className={`multi-create-input ${index}`}
              defaultValue={parseTimes(order)}
              onChange={(e) => inputChangeHandler(e, index)}
              onFocus={(e) => inputFocusHandler(e, index)}
              onBlur={(e) => inputBlurHandler(e, index)}
              ref={
                index === combineOrderFocusIndex
                  ? inputFocusRef
                  : inputNoFocusRef
              }
              style={{
                width: "20px",
                height: "10px",
                color: Colors.greyText,
                border: `1px solid ${Colors.greyText}`,
              }}
            ></input>

            <OrderListExeListDelete onClick={() => deleteHandler(index)} />
          </MultiCreateSelectSmBox>
        ))}
      </MultiCreateSelectBox>
    </MultiCreateBox>
  );
}

export default FunctionAreaContentMultipleOrderCreate;
