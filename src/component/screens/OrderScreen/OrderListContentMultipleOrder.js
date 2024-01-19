import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingCircle from "../../../tool/LoadingCircle";
import ErrorMsgBox from "../../../tool/ErrorMsgBox";
import {
  OrderListContentMsg,
  OrderListDate,
  OrderListDetial,
  OrderListName,
  OrderListNameSelect,
} from "../../../styles/OrderScreen";
import { multipleOrderListSelectAction } from "../../../redux/actions/OrderScreenAction";
import { Button } from "@mui/material";
import { ORDER_SCREEN, ORDER_SCREEN_orderList } from "../../../redux/constants";
import { Colors } from "../../../styles/theme";

function OrderListContentMultipleOrder() {
  const dispatch = useDispatch();
  const {
    loading: multipleOrderLoading,
    error: multipleOrderError,
    data: multipleOrderData,
    orderId,
  } = useSelector((state) => state.multipleOrderList);

  const { multiOrderSearch } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  if (multipleOrderData.length > 0) {
    const tempData =
      multiOrderSearch !== null ? multiOrderSearch : multipleOrderData;
    var groupedData = tempData.reduce((acc, item) => {
      const date = item.createdAt.slice(0, -7);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  }

  const multipleOrderHandler = (orderId, name) => {
    dispatch(multipleOrderListSelectAction(orderId, name));
  };

  return multipleOrderLoading ? (
    <LoadingCircle />
  ) : multipleOrderError ? (
    <ErrorMsgBox />
  ) : !orderId ? (
    <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
  ) : multiOrderSearch !== null && multiOrderSearch.length === 0 ? (
    <OrderListContentMsg variant="h5">查無此資料</OrderListContentMsg>
  ) : (
    Object.keys(groupedData).map((date) => (
      <Fragment key={date}>
        <OrderListDate>{date}</OrderListDate>

        {groupedData[date].map((order) => (
          <OrderListDetial
            data={[order.id === orderId, Colors.greenHover, Colors.white]}
            onClick={() => multipleOrderHandler(order.id, order.name)}
          >
            <OrderListName>
              <OrderListNameSelect
                sx={{
                  backgroundColor: order.id === orderId && Colors.white,
                  border: `1px solid ${Colors.white}`,
                }}
                itemSelect={order.id === orderId}
              />
              {order.name}
            </OrderListName>
          </OrderListDetial>
        ))}
      </Fragment>
    ))

    // multipleOrderData.map((order, index) => (
    //   <Fragment key={order.id}>
    //     {order.is_today_latest ? (
    //       <OrderListDate>{order.createdAt.slice(0, -7)}</OrderListDate>
    //     ) : null}

    //     <OrderListDetial
    //       itemSelect={orderId === order.id}
    //       onClick={() => multipleOrderHandler(order.id)}
    //     >
    //       <OrderListName itemSelect={orderId === order.id}>
    //         <OrderListNameSelect itemSelect={orderId === order.id} />
    //         {order.name}
    //       </OrderListName>
    //     </OrderListDetial>
    //   </Fragment>
    // ))
  );
}

export default OrderListContentMultipleOrder;
