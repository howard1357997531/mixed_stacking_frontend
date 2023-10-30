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

function OrderListContentSingleOrder({ orderSelectMode, orderSelectId }) {
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
        orderListData.map((order) => (
          <OrderListDetial
            key={order.id}
            onClick={() => {
              orderListModeHandler(order.id, order.aiTraining_state);
            }}
            itemSelect={orderSelectId.includes(order.id)}
          >
            <OrderListName itemSelect={orderSelectId.includes(order.id)}>
              {order.name}
            </OrderListName>

            <OrderListDate itemSelect={orderSelectId.includes(order.id)}>
              {order.modifiedAt}
            </OrderListDate>

            <OrderListState>
              {order.aiTraining_state === "no_training" && (
                <OrderListStateText
                  sx={{
                    color: Colors.purple,
                  }}
                >
                  尚未訓練
                </OrderListStateText>
                // <OrderListStateText>
                //   <TextEffect
                //     text={"AI演算中"}
                //     textColor={
                //       orderSelectId.includes(order.id) ? "#fff" : Colors.greyBorder
                //     }
                //   />
                // </OrderListStateText>
              )}

              {order.aiTraining_state === "is_training" && (
                <TextEffect
                  text={"AI演算中"}
                  textColor={
                    orderSelectId.includes(order.id)
                      ? "#fff"
                      : Colors.greyBorder
                  }
                />
              )}

              {order.aiTraining_state === "finish_training" && (
                <OrderListStateText
                  sx={{
                    color: orderSelectId.includes(order.id)
                      ? "#fff"
                      : Colors.greyBorder,
                    border: `2px solid ${
                      orderSelectId.includes(order.id)
                        ? "#fff"
                        : Colors.greyBorder
                    }`,
                  }}
                >
                  已訓練
                </OrderListStateText>
              )}
            </OrderListState>
          </OrderListDetial>
        ))
      )}
    </>
  );
}

export default OrderListContentSingleOrder;
