import React from "react";
import { OrderBox, OrderContainer } from "../../../styles/OrderScreen";
import OrderList from "./OrderList";
import FunctionArea from "./FunctionArea";
import { useSelector } from "react-redux";

function OrderDesktop({ orderSelectMode, orderSelectId }) {
  return (
    <OrderContainer>
      <OrderBox>
        <OrderList
          orderSelectMode={orderSelectMode}
          orderSelectId={orderSelectId}
        />
        <FunctionArea orderSelectMode={orderSelectMode} />
      </OrderBox>
    </OrderContainer>
  );
}

export default OrderDesktop;
