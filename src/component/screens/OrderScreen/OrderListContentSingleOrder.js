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
        orderListData.map((order, index) =>
          orderSelectMode === "multipleOrderCreate" &&
          order.aiTraining_state !== "finish_training" ? null : (
            <Fragment key={order.id}>
              {order.is_today_latest ? (
                <OrderListDate sx={{ borderTop: index === 0 && "none" }}>
                  {order.createdAt.slice(0, -7)}
                </OrderListDate>
              ) : null}

              <OrderListDetial
                itemSelect={
                  orderSelectIdArray.includes(order.id) &&
                  orderSelectMode !== "multipleOrderCreate"
                }
                onClick={() => {
                  orderListModeHandler(order.id, order.aiTraining_state);
                }}
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
                        padding: "4px 6px",
                        color: Colors.brown200,
                        backgroundColor:
                          orderSelectIdArray.includes(order.id) &&
                          orderSelectMode !== "multipleOrderCreate"
                            ? Colors.grey100
                            : "transparent",
                        border: `2px solid ${
                          orderSelectIdArray.includes(order.id) &&
                          orderSelectMode !== "multipleOrderCreate"
                            ? Colors.grey100
                            : Colors.brown200
                        }`,
                      }}
                    >
                      已演算
                    </OrderListStateText>
                  )}
                </OrderListState>
              </OrderListDetial>
            </Fragment>
          )
        )
      )}
    </>
  );
}

export default OrderListContentSingleOrder;
