import React from "react";
import { Box, styled } from "@mui/material";
import LoadingCircle from "../../../tool/LoadingCircle";
import ErrorMsgBox from "../../../tool/ErrorMsgBox";
import { OrderListContentMsg } from "../../../styles/OrderScreen";
import { brown, grey, orange } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { orderlistSelectAction } from "../../../redux/actions/RobotControlScreenAction";
import { Colors } from "../../../styles/theme";

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
      backgroundColor: brown[500],
      cursor: "pointer",
    },
    "&:active": {
      backgroundColor: brown[700],
    },
  }));
  const StyleInnerSmallBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50px",
    color: grey[900],
    fontWeight: 600,
    "&:hover": {
      backgroundColor: brown[500],
    },
    "&:active": {
      backgroundColor: brown[700],
    },
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
    <StyleBox className="dialog-box">
      {orderListLoading ? (
        <LoadingCircle />
      ) : orderListError ? (
        <ErrorMsgBox />
      ) : orderListData.length === 0 ? (
        <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
      ) : (
        orderListData.map((order) => (
          <StyleInnerBox
            key={order.id}
            onClick={() => orderListHandler(order.id)}
          >
            <StyleInnerSmallBox>{order.name}</StyleInnerSmallBox>
          </StyleInnerBox>
        ))
      )}
    </StyleBox>
  );
}

export default OrderListDialogTabsSingleOrder;
