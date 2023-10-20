import React from "react";
import {
  OrderListContentBox,
  OrderListContentMsg,
  OrderListDate,
  OrderListDetial,
  OrderListName,
  OrderListState,
  OrderListStateText,
} from "../../../styles/OrderScreen";
import { useDispatch, useSelector } from "react-redux";
import "./css/OrderList.css";
// import { ORDER_SCREEN_orderList } from "../../../redux/constants";
import { Colors } from "../../../styles/theme";
import TextEffect from "../../../tool/TextEffect";
import ErrorMsgBox from "../../../tool/ErrorMsgBox";
import LoadingCircle from "../../../tool/LoadingCircle";
import { orderlistSelectAction } from "../../../redux/actions/OrderScreenAction";

function OrderListContent({ orderListId }) {
  const dispatch = useDispatch();
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const orderListModeHandler = (orderId, aiTraining_state) => {
    dispatch(orderlistSelectAction(orderId, orderListData, aiTraining_state));
  };

  return (
    <OrderListContentBox className="worklist-box">
      {orderListLoading ? (
        <LoadingCircle />
      ) : orderListError ? (
        <ErrorMsgBox />
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
