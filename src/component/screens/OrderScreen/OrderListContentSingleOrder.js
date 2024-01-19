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

  const { orderId, editId, deleteIdArray, orderSearch } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  if (orderListData.length > 0) {
    const tempData = orderSearch !== null ? orderSearch : orderListData;
    var groupedData = tempData.reduce((acc, item) => {
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
      const deleteArray = deleteIdArray.map((order) =>
        parseInt(Object.keys(order).at(0))
      );
      return deleteArray;
    }
  };

  const orderListModeHandler = (selectId, name, aiTraining_state) => {
    if (["close", "orderDetail", "aiResult"].includes(orderSelectMode)) {
      dispatch(orderlistSelectAction(selectId, name, aiTraining_state));
    } else if (orderSelectMode === "edit") {
      dispatch(
        orderEditSelectAction(selectId, orderListData, aiTraining_state)
      );
    } else if (orderSelectMode === "delete") {
      dispatch(orderDeleteSelectAction(selectId, name, aiTraining_state));
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
      ) : orderSearch !== null && orderSearch.length === 0 ? (
        <OrderListContentMsg variant="h5">查無此資料</OrderListContentMsg>
      ) : (
        Object.keys(groupedData).map((date) => (
          <Fragment key={date}>
            <OrderListDate>{date}</OrderListDate>

            {groupedData[date].map((order) => (
              <OrderListDetial
                key={order.id}
                data={[
                  selectId().includes(order.id),
                  Colors.lightOrangeHover,
                  Colors.blue500,
                ]}
                onClick={() => {
                  orderListModeHandler(
                    order.id,
                    order.name,
                    order.aiTraining_state
                  );
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
                    <OrderListStateText sx={{ color: Colors.blue500 }}>
                      尚未演算
                    </OrderListStateText>
                  )}

                  {order.aiTraining_state === "is_training" && (
                    <TextEffect text={"AI演算中"} textColor={Colors.blue500} />
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
