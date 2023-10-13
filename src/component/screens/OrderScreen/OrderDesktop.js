import React from "react";
import { OrderBox, OrderContainer } from "../../../styles/OrderScreen";
import OrderList from "./OrderList";
import FunctionArea from "./FunctionArea";

function OrderDesktop() {
  return (
    <OrderContainer>
      <OrderBox>
        <OrderList />
        <FunctionArea />
      </OrderBox>
    </OrderContainer>
  );
}

export default OrderDesktop;
