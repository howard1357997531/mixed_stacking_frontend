import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { multipleOrderListAction } from "../../../redux/actions/OrderActions";
import LoadingCircle from "../../../tool/LoadingCircle";
import ErrorMsgBox from "../../../tool/ErrorMsgBox";
import {
  MultipleOrderBox,
  MultipleOrderDate,
  MultipleOrderName,
  OrderListContentMsg,
} from "../../../styles/OrderScreen";
import { multipleOrderListSelectAction } from "../../../redux/actions/OrderScreenAction";

function OrderListContentMultipleOrder() {
  const dispatch = useDispatch();
  const {
    loading: multipleOrderLoading,
    error: multipleOrderError,
    data: multipleOrderData,
    orderId: multipleOrderId,
  } = useSelector((state) => state.multipleOrderList);

  const multipleOrderHandler = (orderId) => {
    dispatch(multipleOrderListSelectAction(orderId));
  };

  const itemSelectId =
    multipleOrderId === "" ? multipleOrderData[0].id : multipleOrderId;

  return multipleOrderLoading ? (
    <LoadingCircle />
  ) : multipleOrderError ? (
    <ErrorMsgBox />
  ) : multipleOrderData.length === 0 ? (
    <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
  ) : (
    multipleOrderData.map((order) => (
      <MultipleOrderBox
        key={order.id}
        itemSelect={order.id === itemSelectId}
        onClick={() => multipleOrderHandler(order.id)}
      >
        <MultipleOrderName>{order.name}</MultipleOrderName>

        <MultipleOrderDate>
          {order.orderSelectId_str.split(",").length}
        </MultipleOrderDate>
      </MultipleOrderBox>
    ))
  );
}

export default OrderListContentMultipleOrder;
