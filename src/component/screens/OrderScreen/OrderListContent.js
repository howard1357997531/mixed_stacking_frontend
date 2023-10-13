import React, { useEffect } from "react";
import {
  OrderListContentBox,
  OrderListDate,
  OrderListDetial,
  OrderListName,
  OrderListState,
  OrderListStateText,
} from "../../../styles/OrderScreen";
import { useDispatch, useSelector } from "react-redux";
import { orderListAction } from "../../../redux/actions/OrderActions";
import CircularProgress from "@mui/material/CircularProgress";
import "./css/OrderList.css";

function OrderListContent() {
  const dispatch = useDispatch();
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  useEffect(() => {
    dispatch(orderListAction());
  }, [dispatch]);

  return (
    <OrderListContentBox className="worklist-box">
      {orderListLoading ? (
        <CircularProgress />
      ) : orderListError ? (
        <p>{orderListError}</p>
      ) : (
        orderListData.map((order) => (
          <OrderListDetial key={order.id}>
            <OrderListName>{order.name}</OrderListName>
            <OrderListDate>{order.modifiedAt}</OrderListDate>
            <OrderListState>
              <OrderListStateText>qwe</OrderListStateText>
            </OrderListState>
          </OrderListDetial>
        ))
      )}
    </OrderListContentBox>
  );
}

export default OrderListContent;
