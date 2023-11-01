import React from "react";
import { OrderBox, OrderContainer } from "../../../styles/OrderScreen";
import OrderList from "./OrderList";
import FunctionArea from "./FunctionArea";
import "./css/swal.css";

function OrderDesktop(props) {
  return (
    <OrderContainer>
      <OrderBox>
        <OrderList {...props} />
        <FunctionArea {...props} />
      </OrderBox>
    </OrderContainer>
  );
}

export default OrderDesktop;
