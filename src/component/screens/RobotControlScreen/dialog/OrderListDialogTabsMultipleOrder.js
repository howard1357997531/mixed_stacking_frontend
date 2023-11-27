import React from "react";
import { Box, styled } from "@mui/material";
import LoadingCircle from "../../../../tool/LoadingCircle";
import ErrorMsgBox from "../../../../tool/ErrorMsgBox";
import { OrderListContentMsg } from "../../../../styles/OrderScreen";
import { brown, grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../../../styles/theme";
import { multipleOrderlistSelectAction } from "../../../../redux/actions/RobotControlScreenAction";

function OrderListDialogTabsMultipleOrder({ onOrderListDialoggOpen }) {
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
    color: grey[900],
    fontWeight: 600,
  }));

  const dispatch = useDispatch();
  const {
    loading: multipleOrderListLoading,
    error: multipleOrderListError,
    data: multipleOrderListData,
  } = useSelector((state) => state.multipleOrderList);

  const multipleOrderListHandler = (orderId) => {
    const [multipleOrderSelectData] = multipleOrderListData.filter(
      (order) => order.id === orderId
    );
    dispatch(multipleOrderlistSelectAction(multipleOrderSelectData));
    onOrderListDialoggOpen(false);
  };
  return (
    <StyleBox className="dialog-box">
      {multipleOrderListLoading ? (
        <LoadingCircle />
      ) : multipleOrderListError ? (
        <ErrorMsgBox />
      ) : multipleOrderListData.length === 0 ? (
        <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
      ) : (
        multipleOrderListData.map((order) => (
          <StyleInnerBox
            key={order.id}
            onClick={() => multipleOrderListHandler(order.id)}
          >
            <StyleInnerSmallBox>{order.name}</StyleInnerSmallBox>
          </StyleInnerBox>
        ))
      )}
    </StyleBox>
  );
}

export default OrderListDialogTabsMultipleOrder;
