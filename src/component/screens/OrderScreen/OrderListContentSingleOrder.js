import React from "react";
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
import { orderlistSelectAction } from "../../../redux/actions/OrderScreenAction";

function OrderListContentSingleOrder({ orderSelectMode, orderSelectIdArray }) {
  const dispatch = useDispatch();
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const orderListModeHandler = (orderId, aiTraining_state) => {
    dispatch(
      orderlistSelectAction(
        orderSelectMode,
        orderId,
        aiTraining_state,
        orderListData
      )
    );
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
        orderListData.map((order) =>
          orderSelectMode === "multipleOrderCreate" &&
          order.aiTraining_state !== "finish_training" ? null : (
            <OrderListDetial
              key={order.id}
              onClick={() => {
                orderListModeHandler(order.id, order.aiTraining_state);
              }}
              itemSelect={
                orderSelectIdArray.includes(order.id) &&
                orderSelectMode !== "multipleOrderCreate"
              }
            >
              <OrderListName
                itemSelect={
                  orderSelectIdArray.includes(order.id) &&
                  orderSelectMode !== "multipleOrderCreate"
                }
              >
                {order.name}
              </OrderListName>

              {/* <OrderListDate itemSelect={orderSelectIdArray.includes(order.id)}>
                {order.modifiedAt}
              </OrderListDate> */}

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
                      orderSelectIdArray.includes(order.id)
                        ? Colors.grey100
                        : Colors.greyBorder
                    }
                  />
                )}

                {order.aiTraining_state === "finish_training" && (
                  <OrderListStateText
                    sx={{
                      color: Colors.greyBorder,
                      backgroundColor:
                        orderSelectIdArray.includes(order.id) &&
                        orderSelectMode !== "multipleOrderCreate"
                          ? Colors.grey100
                          : "transparent",
                      border: `2px solid ${
                        orderSelectIdArray.includes(order.id) &&
                        orderSelectMode !== "multipleOrderCreate"
                          ? Colors.grey100
                          : Colors.greyBorder
                      }`,
                    }}
                  >
                    已演算
                  </OrderListStateText>
                )}
              </OrderListState>
            </OrderListDetial>
          )
        )
      )}
    </>
  );
}

export default OrderListContentSingleOrder;
