import React from "react";
import {
  ErrorMsgBox,
  ErrorMsgIconButton,
  OrderListContentBox,
  OrderListContentMsg,
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
import { Box, IconButton, Typography } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { Colors } from "../../../styles/theme";
import TextEffect from "../../../tool/TextEffect";

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
  console.log(typeof Colors.red);
  return (
    <OrderListContentBox className="worklist-box">
      {orderListLoading ? (
        <CircularProgress />
      ) : orderListError ? (
        <ErrorMsgBox>
          <Typography variant="h5" color={Colors.grey}>
            資料讀取失敗
          </Typography>
          <Box>
            <ErrorMsgIconButton
              onClick={() => {
                window.location.reload();
              }}
            >
              <CachedIcon />
            </ErrorMsgIconButton>
          </Box>
        </ErrorMsgBox>
      ) : orderListData.length === 0 ? (
        <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
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
                <OrderListStateText
                  sx={{
                    color: Colors.purple,
                    border: `2px solid ${Colors.purple}`,
                    borderRadius: "20px",
                  }}
                >
                  尚未訓練
                </OrderListStateText>
              )}
              {order.aiTraining_state === "is_training" && (
                <OrderListStateText>
                  <TextEffect text={"AI演算中"} textColor={Colors.grey} />
                </OrderListStateText>
              )}
              {order.aiTraining_state === "finish_training" && (
                <OrderListStateText
                  sx={{
                    color: Colors.grey,
                    border: `2px solid ${Colors.grey}`,
                  }}
                >
                  已訓練
                </OrderListStateText>
                // <OrderListStateText>
                //   <TextEffect text={"AI演算中"} textColor={Colors.grey} />
                // </OrderListStateText>
              )}
            </OrderListState>
          </OrderListDetial>
        ))
      )}
    </OrderListContentBox>
  );
}

export default OrderListContent;
