import React, { Fragment } from "react";
import {
  DescText,
  DescTextBox,
  IconButtonBack,
  OrderContentBox,
  OrderContentTitleBox,
  OrderContentTitleSmBox,
  OrderDetailBox,
  OrderDetailSmBox,
  OrderListExeListBox,
  OrderListExeListNameBox2,
  OrderListExeListTitleBox,
} from "../../../../styles/RobotControlScreen/dialog";
import { useDispatch, useSelector } from "react-redux";
import { ROBOT_CONTROL_SCREEN } from "../../../../redux/constants";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LoadingCircle from "../../../../tool/LoadingCircle";
import ErrorMsgBox from "../../../../tool/ErrorMsgBox";
import { OrderListContentMsg } from "../../../../styles/OrderScreen";

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
        詳細資訊
      </OrderListExeListTitleBox>

      <OrderListExeListNameBox2 className="dialogExecutionList-detail">
        {orderListLoading ? (
          <LoadingCircle />
        ) : orderListError ? (
          <ErrorMsgBox />
        ) : orderListData.length === 0 ? (
          <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
        ) : (
          <Fragment>
            <DescTextBox>
              <DescText isTitle={true}>名稱</DescText>
              <DescText sx={{ marginLeft: "5px" }}>{orderDetail.name}</DescText>
            </DescTextBox>

            <DescTextBox>
              <DescText isTitle={true}>上傳</DescText>
              <DescText sx={{ marginLeft: "5px" }}>
                {orderDetail.createdAt}
              </DescText>
            </DescTextBox>

            <DescTextBox sx={{ justifyContent: "space-between" }}>
              <DescText isTitle={true}>詳細資訊</DescText>
              <DescText>
                總數: {orderDetail.aiTraining_order.split(",").length}
              </DescText>
            </DescTextBox>

            <OrderContentTitleBox>
              <OrderContentTitleSmBox isName={true}>
                名稱
              </OrderContentTitleSmBox>
              <OrderContentTitleSmBox>寬度</OrderContentTitleSmBox>
              <OrderContentTitleSmBox>長度</OrderContentTitleSmBox>
              <OrderContentTitleSmBox>高度</OrderContentTitleSmBox>
              <OrderContentTitleSmBox>數量</OrderContentTitleSmBox>
            </OrderContentTitleBox>

            <OrderContentBox className="dialogExecutionList-detail">
              {orderDetail.orderItem.map((order, index) =>
                order.quantity !== 0 ? (
                  <OrderDetailBox key={index}>
                    <OrderDetailSmBox isName={true}>
                      {order.name}
                    </OrderDetailSmBox>
                    <OrderDetailSmBox>{order.width}</OrderDetailSmBox>
                    <OrderDetailSmBox>{order.height}</OrderDetailSmBox>
                    <OrderDetailSmBox>{order.depth}</OrderDetailSmBox>
                    <OrderDetailSmBox>{order.quantity}</OrderDetailSmBox>
                  </OrderDetailBox>
                ) : null
              )}
            </OrderContentBox>
          </Fragment>
        )}
      </OrderListExeListNameBox2>
    </OrderListExeListBox>
  );
}

export default OrderListDialogExecutionListInsertDetail;
