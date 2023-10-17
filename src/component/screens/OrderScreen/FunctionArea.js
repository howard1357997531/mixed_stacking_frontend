import React, { useState } from "react";
import {
  CloseIconButton,
  FunctionAreaBox,
  FunctionAreaNav,
} from "../../../styles/OrderScreen";
import CloseIcon from "@mui/icons-material/Close";
import FunctionAreaNavTitle from "./FunctionAreaNavTitle";
import { useDispatch } from "react-redux";
import { ORDER_SCREEN_orderList } from "../../../redux/constants";
import FunctionAreaNavButton from "./FunctionAreaNavButton";
import FunctionAreaContent from "./FunctionAreaContent";

function FunctionArea({ orderListMode }) {
  const dispatch = useDispatch();

  const closeBoxHandler = () => {
    dispatch({ type: ORDER_SCREEN_orderList.mode, payload: "close" });
    dispatch({ type: ORDER_SCREEN_orderList.orderId, payload: null });
  };

  return (
    <FunctionAreaBox orderListMode={orderListMode}>
      <FunctionAreaNav>
        <CloseIconButton onClick={closeBoxHandler}>
          <CloseIcon />
        </CloseIconButton>

        <FunctionAreaNavTitle orderListMode={orderListMode} />

        <FunctionAreaNavButton />
      </FunctionAreaNav>

      <FunctionAreaContent />
    </FunctionAreaBox>
  );
}

export default FunctionArea;
