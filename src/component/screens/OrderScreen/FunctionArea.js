import React from "react";
import {
  MULTIPLE_ORDER_LIST,
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

  const closeBoxHandler = () => {
    if (props.orderSelectMode === "multipleOrderCreate") {
      dispatch({ type: ORDER_SCREEN_orderList.mode, payload: "multipleOrder" });
    } else {
      dispatch({ type: ORDER_SCREEN_orderList.mode, payload: "close" });
      dispatch({ type: ORDER_SCREEN_orderList.orderId, payload: [] });
      dispatch({ type: MULTIPLE_ORDER_LIST.orderId, payload: "" });
    }
  };

  return (
    <FunctionAreaBox orderSelectMode={props.orderSelectMode}>
      <FunctionAreaNav>
        <CloseIconButton onClick={closeBoxHandler}>
          {props.orderSelectMode === "multipleOrderCreate" ? (
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
