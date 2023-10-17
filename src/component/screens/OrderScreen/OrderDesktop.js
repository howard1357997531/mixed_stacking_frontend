import React from "react";
import { OrderBox, OrderContainer } from "../../../styles/OrderScreen";
import OrderList from "./OrderList";
import FunctionArea from "./FunctionArea";
import { useSelector } from "react-redux";

function OrderDesktop() {
  const { mode: orderListMode, orderId: orderListId } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  return (
    <OrderContainer>
      <OrderBox>
        <OrderList orderListMode={orderListMode} orderListId={orderListId} />
        <FunctionArea orderListMode={orderListMode} />
      </OrderBox>
    </OrderContainer>
  );
}

export default OrderDesktop;
