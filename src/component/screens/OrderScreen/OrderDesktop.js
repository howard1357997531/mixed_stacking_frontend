import React from "react";
import { OrderBox, OrderContainer } from "../../../styles/OrderScreen";
import OrderList from "./OrderList";
import FunctionArea from "./FunctionArea";
import "./css/swal.css";
import { useSelector } from "react-redux";

function OrderDesktop(props) {
  const { mode } = useSelector((state) => state.orderScreen_orderSelect);

  return (
    <OrderContainer mode={mode === "close"}>
      <OrderBox mode={mode === "close"}>
        <OrderList {...props} />
        <FunctionArea {...props} />
      </OrderBox>
    </OrderContainer>
  );
}

export default OrderDesktop;
