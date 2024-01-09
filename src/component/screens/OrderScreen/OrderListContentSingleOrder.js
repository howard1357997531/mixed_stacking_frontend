import React, { Fragment } from "react";
import {
  NewText,
  OrderListContentMsg,
  OrderListDate,
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

  const { orderId, editId, deleteIdArray } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  if (orderListData.length > 0) {
    var groupedData = orderListData.reduce((acc, item) => {
      const date = item.createdAt.slice(0, -7);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  }

  const selectId = () => {
    if (["close", "orderDetail", "aiResult"].includes(orderSelectMode)) {
      return [orderId];
    } else if (orderSelectMode === "edit") {
      return [editId];
    } else if (orderSelectMode === "delete") {
      return deleteIdArray;
    }
  };

  const orderListModeHandler = (orderId, aiTraining_state) => {
    if (["close", "orderDetail", "aiResult"].includes(orderSelectMode)) {
      dispatch(orderlistSelectAction(orderId, aiTraining_state));
    } else if (orderSelectMode === "edit") {
      dispatch(orderEditSelectAction(orderId, orderListData, aiTraining_state));
    } else if (orderSelectMode === "delete") {
      dispatch(
        orderDeleteSelectAction(orderId, deleteIdArray, aiTraining_state)
      );
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
        Object.keys(groupedData).map((date) => (
          <Fragment key={date}>
            <OrderListDate>{date}</OrderListDate>

            {groupedData[date].map((order) => (
              <OrderListDetial
                key={order.id}
                itemSelect={selectId().includes(order.id)}
                onClick={() => {
                  orderListModeHandler(order.id, order.aiTraining_state);
                }}
              >
                <OrderListName>
                  {order.is_new && <NewText>New</NewText>}
                  <OrderListNameSelect
                    itemSelect={selectId().includes(order.id)}
                  />
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
            ))}
          </Fragment>
        ))
      )}
    </>
  );
}

export default OrderListContentSingleOrder;
