import React, { Fragment } from "react";
import {
  OrderListContentMsg,
  OrderListDate,
  OrderListDateBox,
  OrderListDetial,
  OrderListName,
  OrderListNameSelect,
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
    if (["close", "orderDetail", "aiResult"].includes(orderSelectMode)) {
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
        orderListData.map((order) => (
          <Fragment key={order.id}>
            {order.is_today_latest ? (
              <OrderListDate>{order.createdAt.slice(0, -7)}</OrderListDate>
            ) : null}

            <OrderListDetial
              itemSelect={orderId === order.id}
              onClick={() => {
                orderListModeHandler(order.id, order.aiTraining_state);
              }}
            >
              <OrderListName>
                <OrderListNameSelect itemSelect={orderId === order.id} />
                {order.name}
              </OrderListName>

              <OrderListState>
                {order.aiTraining_state === "no_training" && (
                  <OrderListStateText sx={{ color: Colors.purple }}>
                    尚未演算
                  </OrderListStateText>
                )}

                {order.aiTraining_state === "is_training" && (
                  <TextEffect text={"AI演算中"} textColor={Colors.greyText} />
                )}

                {order.aiTraining_state === "finish_training" && (
                  <OrderListStateText sx={{ color: Colors.greyText }}>
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
