import React, { Fragment } from "react";
import {
  OrderListContentMsg,
  OrderListDate,
  OrderListDetial,
  OrderListName,
  OrderListState,
  OrderListStateText,
} from "../../../styles/OrderScreen";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../../styles/theme";
import TextEffect from "../../../tool/TextEffect";
import ErrorMsgBox from "../../../tool/ErrorMsgBox";
import LoadingCircle from "../../../tool/LoadingCircle";
import {
  orderDeleteSelectAction,
  orderEditSelectAction,
  orderlistSelectAction,
} from "../../../redux/actions/OrderScreenAction";

function OrderListContentSingleOrder({ orderSelectMode, orderSelectIdArray }) {
  const dispatch = useDispatch();
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const { orderId, delete: orderDelete } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  const orderListModeHandler = (orderId, aiTraining_state) => {
    if (["close", "orderDetail"].includes(orderSelectMode)) {
      dispatch(orderlistSelectAction(orderId, aiTraining_state));
    } else if (orderSelectMode === "edit") {
      dispatch(orderEditSelectAction(orderId, orderListData, aiTraining_state));
    } else if (orderSelectMode === "delete") {
      dispatch(orderDeleteSelectAction(orderId, orderDelete, aiTraining_state));
    }
  };

  return (
    <>
      {orderListLoading ? (
        <LoadingCircle />
      ) : orderListError ? (
        <ErrorMsgBox />
      ) : orderListData.length === 0 ? (
        <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
      ) : (
        orderListData.map((order, index) => (
          <Fragment key={order.id}>
            {order.is_today_latest ? (
              <OrderListDate sx={{ borderTop: index === 0 && "none" }}>
                {order.createdAt.slice(0, -7)}
              </OrderListDate>
            ) : null}

            <OrderListDetial
              itemSelect={orderId === order.id}
              onClick={() => {
                orderListModeHandler(order.id, order.aiTraining_state);
              }}
            >
              <OrderListName itemSelect={orderId === order.id}>
                {order.name}
              </OrderListName>

              <OrderListState>
                {order.aiTraining_state === "no_training" && (
                  <OrderListStateText
                    sx={{
                      color: Colors.purple,
                    }}
                  >
                    尚未演算
                  </OrderListStateText>
                )}

                {order.aiTraining_state === "is_training" && (
                  <TextEffect
                    text={"AI演算中"}
                    textColor={
                      orderId === order.id ? Colors.grey100 : Colors.greyBorder
                    }
                  />
                )}

                {order.aiTraining_state === "finish_training" && (
                  <OrderListStateText
                    sx={{
                      padding: "4px 6px",
                      color: Colors.brown200,
                      backgroundColor:
                        orderId === order.id ? Colors.grey100 : "transparent",
                      border: `2px solid ${
                        orderId === order.id ? Colors.grey100 : Colors.brown200
                      }`,
                    }}
                  >
                    已演算
                  </OrderListStateText>
                )}
              </OrderListState>
            </OrderListDetial>
          </Fragment>
        ))
      )}
    </>
  );
}

export default OrderListContentSingleOrder;
