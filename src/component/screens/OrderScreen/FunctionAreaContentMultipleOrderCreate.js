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

function FunctionAreaContentMultipleOrderCreate({ orderListData }) {
  const dispatch = useDispatch();
  const {
    combineOrder,
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

  const [focusValue, setFocusValue] = useState(0);

  // focus blur 單一動作只會觸發一次
  // 不知為啥 fouce 裡面不能使用 dispatch
  const inputFocusHandler = (e, index) => {
    if (e.target.value !== "") {
      setFocusValue(index);
    }
  };

  // useEffect(() => {
  //   console.log(focusValue);
  //   if (focusValue !== "") {
  //     dispatch({
  //       type: ORDER_SCREEN.orderSelect,
  //       payload: {
  //         combineOrderFocusIndex: focusValue,
  //       },
  //     });
  //   }
  // }, [focusValue]);

  const inputBlurHandler = (e, index) => {
    setFocusValue(null);
    if (e.target.value === "") {
      dispatch(multipleOrderCreateInputChangeAction(index, "1", combineOrder));
    }
  };

  const resetHandler = () => {
    // combineOrderFocusIndex要歸0,因為預設是會fouce第一個
    dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: { combineOrder: [], combineOrderFocusIndex: 0 },
    });
  };

  const deleteHandler = (index) => {
    console.log(focusValue);
    dispatch(multipleOrderCreateDeleteAction(index, combineOrder));
  };

  const inputFocusRef = useRef(null);
  const inputNoFocusRef = useRef(null);
  useEffect(() => {
    if (combineOrder.length !== 0 && combineOrderFocusIndex) {
      inputFocusRef.current.focus();
    }
  }, [combineOrderFocusBool]);

  useEffect(() => {
    if (combineOrder.length !== 0) {
      setFocusValue(combineOrderFocusIndex);
    }
  }, [combineOrderFocusIndex]);

  return combineOrder.length === 0 ? (
    <CenterText text={"尚未選擇工單"} />
  ) : (
    <MultiCreateBox>
      <MultiCreateTitle>
        <MultiCreateCount>數量: {parseCount(combineOrder)}</MultiCreateCount>
        <MultiCreateResetBtn onClick={resetHandler}>重置</MultiCreateResetBtn>
      </MultiCreateTitle>

      <MultiCreateSelectBox className="multi-create-select-box">
        {combineOrder.map((order, index) => (
          <MultiCreateSelectSmBox key={index} isFouce={index === focusValue}>
            <MultiCreateAvatarBox>
              <MultiCreateAvatar isFouce={index === focusValue}>
                {parseIndex(index)}
              </MultiCreateAvatar>
              {order.includes("*") ? (
                <>
                  <AvatarDivider isFouce={index === focusValue} />
                  <MultiCreateAvatar isFouce={index === focusValue}>
                    {parseIndex2(index)}
                  </MultiCreateAvatar>
                </>
              ) : null}
            </MultiCreateAvatarBox>

            <MultiCreateOrderName isFouce={index === focusValue}>
              {parseName(parseId(order)).name}
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
                color:
                  index === focusValue
                    ? Colors.lightOrangeHover
                    : Colors.purple,
                border:
                  index === focusValue
                    ? `2px solid ${Colors.lightOrangeHover}`
                    : `2px solid ${Colors.purple}`,
              }}
            ></input>

            <OrderListExeListDelete
              sx={{
                color:
                  index === focusValue
                    ? Colors.lightOrangeHover
                    : Colors.purple,
              }}
              onClick={() => deleteHandler(index)}
            />
          </MultiCreateSelectSmBox>
        ))}
      </MultiCreateSelectBox>
    </MultiCreateBox>
  );
}

export default FunctionAreaContentMultipleOrderCreate;
