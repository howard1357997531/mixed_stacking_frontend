import React from "react";
import {
  OrderListContentBox,
  OrderListDate,
  OrderListDetial,
  OrderListName,
  OrderListState,
  OrderListStateText,
} from "../../../styles/OrderScreen";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import "./css/OrderList.css";
import { ORDER_SCREEN_orderList } from "../../../redux/constants";

function OrderListContent({ orderListId }) {
  const dispatch = useDispatch();
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const orderListModeHandler = (orderId, aiTraining_state) => {
    dispatch({
      type: ORDER_SCREEN_orderList.mode,
      payload: "orderDetail",
    });

    dispatch({
      type: ORDER_SCREEN_orderList.orderId,
      payload: orderId,
    });

    dispatch({
      type: ORDER_SCREEN_orderList.aiTrainingState,
      payload: aiTraining_state,
    });

    const [OrderData] = orderListData.filter((order) => order.id === orderId);

    dispatch({
      type: ORDER_SCREEN_orderList.orderCurrentData,
      payload: OrderData.orderItem,
      payload: {
        name: OrderData.name,
        createdAt: OrderData.createdAt,
        orderItem: OrderData.orderItem,
      },
    });

    if (aiTraining_state === "finish_training") {
      dispatch({
        type: ORDER_SCREEN_orderList.aiCurrentData,
        payload: OrderData.aiTraining_order,
      });
    }
  };

  return (
    <OrderListContentBox className="worklist-box">
      {orderListLoading ? (
        <CircularProgress />
      ) : orderListError ? (
        <p>{orderListError}</p>
      ) : (
        orderListData.map((order) => (
          <OrderListDetial
            key={order.id}
            onClick={() => {
              orderListModeHandler(order.id, order.aiTraining_state);
            }}
            itemSelect={order.id === orderListId}
          >
            <OrderListName>{order.name}</OrderListName>
            <OrderListDate>{order.modifiedAt}</OrderListDate>
            <OrderListState>
              {order.aiTraining_state === "no_training" && (
                <OrderListStateText>No training</OrderListStateText>
              )}
              {order.aiTraining_state === "is_training" && (
                <OrderListStateText>training...</OrderListStateText>
              )}
              {order.aiTraining_state === "finish_training" && (
                <OrderListStateText>Finish training</OrderListStateText>
              )}
            </OrderListState>
          </OrderListDetial>
        ))
      )}
    </OrderListContentBox>
  );
}

export default OrderListContent;
