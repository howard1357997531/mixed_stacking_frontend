import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { multipleOrderListAction } from "../../../redux/actions/OrderActions";
import LoadingCircle from "../../../tool/LoadingCircle";
import ErrorMsgBox from "../../../tool/ErrorMsgBox";
import {
  MultipleOrderBox,
  MultipleOrderDate,
  MultipleOrderName,
  OrderListContentMsg,
  OrderListDate,
  OrderListDetial,
  OrderListName,
  OrderListNameSelect,
  OrderListState,
  OrderListStateText,
} from "../../../styles/OrderScreen";
import { multipleOrderListSelectAction } from "../../../redux/actions/OrderScreenAction";
import { Button } from "@mui/material";
import { ORDER_SCREEN_orderList } from "../../../redux/constants";
import { Colors } from "../../../styles/theme";

function OrderListContentMultipleOrder() {
  const dispatch = useDispatch();
  const {
    loading: multipleOrderLoading,
    error: multipleOrderError,
    data: multipleOrderData,
    orderId,
  } = useSelector((state) => state.multipleOrderList);

  const multipleOrderHandler = (orderId) => {
    dispatch(multipleOrderListSelectAction(orderId));
  };

  const createMultipleOrder = () => {
    dispatch({
      type: ORDER_SCREEN_orderList.mode,
      payload: "multipleOrderCreate",
    });
  };

  // const itemSelect = (id) => {
  //   return multipleOrderId && id === multipleOrderId ? true : false;
  // };

  return multipleOrderLoading ? (
    <LoadingCircle />
  ) : multipleOrderError ? (
    <ErrorMsgBox />
  ) : multipleOrderData.length === 0 ? (
    <OrderListContentMsg variant="h5">
      <Button
        variant="contained"
        sx={{
          backgroundColor: Colors.greyBorder,
          "&:hover": { backgroundColor: Colors.greyText },
        }}
        onClick={createMultipleOrder}
      >
        建立組合單
      </Button>
    </OrderListContentMsg>
  ) : (
    multipleOrderData.map((order, index) => (
      <Fragment key={order.id}>
        {order.is_today_latest ? (
          <OrderListDate>{order.createdAt.slice(0, -7)}</OrderListDate>
        ) : null}

        {/* <MultipleOrderBox
          itemSelect={itemSelect(order.id)}
          onClick={() => multipleOrderHandler(order.id)}
        >
          <MultipleOrderName itemSelect={itemSelect(order.id)}>
            {order.name}
          </MultipleOrderName>
        </MultipleOrderBox> */}

        <OrderListDetial
          itemSelect={orderId === order.id}
          onClick={() => multipleOrderHandler(order.id)}
        >
          <OrderListName itemSelect={orderId === order.id}>
            <OrderListNameSelect itemSelect={orderId === order.id} />
            {order.name}
          </OrderListName>

          <OrderListState>12</OrderListState>
        </OrderListDetial>
      </Fragment>
    ))
  );
}

export default OrderListContentMultipleOrder;
