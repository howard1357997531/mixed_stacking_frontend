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

function OrderListContent({ orderSelectId }) {
  const dispatch = useDispatch();
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const orderListModeHandler = (orderId, aiTraining_state) => {
    dispatch(orderlistSelectAction(orderId, orderListData, aiTraining_state));
    // if (mode === "multipleOrder"){

    // }
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
            itemSelect={order.id === orderSelectId}
          >
            <OrderListName itemSelect={order.id === orderSelectId}>
              {order.name}
            </OrderListName>

            <OrderListDate itemSelect={order.id === orderSelectId}>
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
                //       order.id === orderSelectId ? "#fff" : Colors.greyBorder
                //     }
                //   />
                // </OrderListStateText>
              )}

              {order.aiTraining_state === "is_training" && (
                <TextEffect
                  text={"AI演算中"}
                  textColor={
                    order.id === orderSelectId ? "#fff" : Colors.greyBorder
                  }
                />
              )}

              {order.aiTraining_state === "finish_training" && (
                <OrderListStateText
                  sx={{
                    color:
                      order.id === orderSelectId ? "#fff" : Colors.greyBorder,
                    border: `2px solid ${
                      order.id === orderSelectId ? "#fff" : Colors.greyBorder
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
    </OrderListContentBox>
  );
}

export default OrderListContent;
