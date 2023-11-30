import React, { Fragment } from "react";
import { Box, Typography, styled } from "@mui/material";
import LoadingCircle from "../../../../tool/LoadingCircle";
import ErrorMsgBox from "../../../../tool/ErrorMsgBox";
import { OrderListContentMsg } from "../../../../styles/OrderScreen";
import { brown, grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { orderlistSelectAction } from "../../../../redux/actions/RobotControlScreenAction";
import { Colors } from "../../../../styles/theme";

function OrderListDialogTabsSingleOrder({ onOrderListDialoggOpen }) {
  const StyleBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "500px",
    overflowY: "auto",
  }));
  const StyleInnerBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "60px",
    borderBottom: `1px solid ${Colors.brownHover}`,
    "&:hover": {
      backgroundColor: Colors.brownHover,
      cursor: "pointer",
    },
    "&:active": {
      backgroundColor: brown[500],
    },
  }));
  const StyleInnerSmallBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50px",
    color: Colors.greyTextBlood,
    fontWeight: 600,
  }));

  const dispatch = useDispatch();
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const orderListHandler = (orderId) => {
    const [singalOrderSelectObject] = orderListData.filter(
      (order) => order.id === orderId
    );
    dispatch(orderlistSelectAction(singalOrderSelectObject));
    onOrderListDialoggOpen(false);
  };
  return (
    <StyleBox className="dialog-order-box">
      {orderListLoading ? (
        <LoadingCircle />
      ) : orderListError ? (
        <ErrorMsgBox />
      ) : orderListData.length === 0 ? (
        <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
      ) : (
        orderListData.map((order) =>
          order.aiTraining_state === "finish_training" ? (
            <Fragment key={order.id}>
              {order.is_today_latest ? (
                <Typography
                  sx={{
                    padding: "5px 10px",
                    borderBottom: `1px solid ${Colors.brownHover}`,
                    color: Colors.greyTextBlood,
                  }}
                >
                  {order.createdAt.slice(0, -7)}
                </Typography>
              ) : null}

              <StyleInnerBox onClick={() => orderListHandler(order.id)}>
                <StyleInnerSmallBox>{order.name}</StyleInnerSmallBox>
              </StyleInnerBox>
            </Fragment>
          ) : null
        )
      )}
    </StyleBox>
  );
}

export default OrderListDialogTabsSingleOrder;
