import React from "react";
import {
  IconButtonBack,
  IconButtonHelp,
  IconButtonSearch,
  OrderListExeListBox,
  OrderListExeListInsertName,
  OrderListExeListNameBox,
  OrderListExeListTitleBox,
} from "../../../../styles/RobotControlScreen/dialog";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ROBOT_CONTROL_SCREEN } from "../../../../redux/constants";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import LoadingCircle from "../../../../tool/LoadingCircle";
import ErrorMsgBox from "../../../../tool/ErrorMsgBox";
import {
  OrderListContentMsg,
  OrderListDetailBox,
  OrderListDetailSmallBox,
} from "../../../../styles/OrderScreen";
import { Colors } from "../../../../styles/theme";

function OrderListDialogExecutionListInsertDetail({ robotExecutionData }) {
  const dispatch = useDispatch();
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const [orderDetail] = orderListData.filter(
    (order) => order.id === robotExecutionData.insertOrderDetailId
  );

  const backHandler = () => {
    dispatch({
      type: ROBOT_CONTROL_SCREEN.robotExecutionList,
      payload: { insertOrderOpen: true, insertOrderDetailOpen: false },
    });
  };

  return (
    <OrderListExeListBox>
      <OrderListExeListTitleBox>
        <IconButtonBack onClick={backHandler}>
          <ChevronLeftIcon />
        </IconButtonBack>
        詳細資料
        <IconButtonSearch>
          <SearchRoundedIcon />
        </IconButtonSearch>
      </OrderListExeListTitleBox>

      <OrderListExeListNameBox
        className="dialogExecutionList"
        sx={{ padding: "2px 10px" }}
      >
        {orderListLoading ? (
          <LoadingCircle />
        ) : orderListError ? (
          <ErrorMsgBox />
        ) : orderListData.length === 0 ? (
          <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
        ) : (
          <>
            <Typography
              variant="h6"
              align="center"
              sx={{ color: Colors.greyTextBlood, marginTop: "10px" }}
            >
              {orderDetail.name}
            </Typography>

            <Typography
              textAlign="right"
              sx={{
                color: Colors.greyTextBlood,
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              數量: {orderDetail.aiTraining_order.split(",").length}
            </Typography>

            <Typography
              textAlign="right"
              sx={{
                color: Colors.greyTextBlood,
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              創建時間: {orderDetail.createdAt}
            </Typography>

            <OrderListDetailBox isTitle={true}>
              <OrderListDetailSmallBox>名稱</OrderListDetailSmallBox>
              <OrderListDetailSmallBox>寬度</OrderListDetailSmallBox>
              <OrderListDetailSmallBox>長度</OrderListDetailSmallBox>
              <OrderListDetailSmallBox>高度</OrderListDetailSmallBox>
              <OrderListDetailSmallBox>數量</OrderListDetailSmallBox>
            </OrderListDetailBox>

            {orderDetail.orderItem.map((order, index) =>
              order.quantity !== 0 ? (
                <OrderListDetailBox key={index} isTitle={false}>
                  <OrderListDetailSmallBox
                    sx={{ backgroundColor: Colors.darkGreenHover }}
                  >
                    {order.name}
                  </OrderListDetailSmallBox>
                  <OrderListDetailSmallBox>
                    {order.width}
                  </OrderListDetailSmallBox>
                  <OrderListDetailSmallBox>
                    {order.height}
                  </OrderListDetailSmallBox>
                  <OrderListDetailSmallBox>
                    {order.depth}
                  </OrderListDetailSmallBox>
                  <OrderListDetailSmallBox>
                    {order.quantity}
                  </OrderListDetailSmallBox>
                </OrderListDetailBox>
              ) : null
            )}
          </>
        )}
      </OrderListExeListNameBox>
    </OrderListExeListBox>
  );
}

export default OrderListDialogExecutionListInsertDetail;
