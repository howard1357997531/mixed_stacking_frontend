import React from "react";
import {
  MULTIPLE_ORDER_LIST,
  ORDER_SCREEN,
  ORDER_SCREEN_orderList,
} from "../../../redux/constants";
import {
  CloseIconButton,
  FunctionAreaBox,
  FunctionAreaNav,
} from "../../../styles/OrderScreen";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FunctionAreaNavTitle from "./FunctionAreaNavTitle";
import FunctionAreaNavButton from "./FunctionAreaNavButton";
import FunctionAreaContent from "./FunctionAreaContent";

function FunctionArea(props) {
  const dispatch = useDispatch();
  const { orderSelectMode, multipleOrderListData } = props;

  const closeBoxHandler = () => {
    if (orderSelectMode === "multipleOrderCreate") {
      if (multipleOrderListData.length === 0) {
        dispatch({
          type: ORDER_SCREEN_orderList.mode,
          payload: "noMultipleOrder",
        });
      } else {
        dispatch({
          type: ORDER_SCREEN_orderList.mode,
          payload: "multipleOrder",
        });
      }
    } else {
      dispatch({
        type: ORDER_SCREEN.orderSelect,
        payload: { mode: "close", orderId: null },
      });
      dispatch({ type: MULTIPLE_ORDER_LIST.orderId, payload: "" });
    }
  };

  return (
    <FunctionAreaBox orderSelectMode={orderSelectMode}>
      <FunctionAreaNav>
        <CloseIconButton onClick={closeBoxHandler}>
          {orderSelectMode === "multipleOrderCreate" ? (
            <ChevronLeftIcon />
          ) : (
            <CloseIcon />
          )}
        </CloseIconButton>

        <FunctionAreaNavTitle {...props} />

        <FunctionAreaNavButton {...props} />
      </FunctionAreaNav>

      <FunctionAreaContent {...props} />
    </FunctionAreaBox>
  );
}

export default FunctionArea;
