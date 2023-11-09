import React from "react";
import {
  IconButtonBack,
  IconButtonHelp,
  IconButtonSearch,
  OrderListExeListBox,
  OrderListExeListInsertName,
  OrderListExeListNameBox,
  OrderListExeListTitleBox,
  StyleHelpRoundedIcon,
} from "../../../../styles/RobotControlScreen/dialog";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ROBOT_CONTROL_SCREEN } from "../../../../redux/constants";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LoadingCircle from "../../../../tool/LoadingCircle";
import ErrorMsgBox from "../../../../tool/ErrorMsgBox";
import { OrderListContentMsg } from "../../../../styles/OrderScreen";

function OrderListDialogExecutionListInsert() {
  const dispatch = useDispatch();
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const backHandler = () => {
    dispatch({
      type: ROBOT_CONTROL_SCREEN.robotExecutionList,
      payload: { insertOrderOpen: false },
    });
  };

  const selectInsertOrder = (id) => {
    console.log(id);
    dispatch({
      type: ROBOT_CONTROL_SCREEN.robotExecutionList,
      payload: { insertOrderOpen: false },
    });
  };

  const orderDetailHandler = (e, id) => {
    e.stopPropagation();
    dispatch({
      type: ROBOT_CONTROL_SCREEN.robotExecutionList,
      payload: {
        insertOrderOpen: false,
        insertOrderDetailOpen: true,
        insertOrderDetailId: id,
      },
    });
  };

  return (
    <OrderListExeListBox>
      <OrderListExeListTitleBox>
        <IconButtonBack onClick={backHandler}>
          <ChevronLeftIcon />
        </IconButtonBack>

        <Typography variant="h6">插單</Typography>

        <IconButtonSearch>
          <SearchRoundedIcon />
        </IconButtonSearch>
      </OrderListExeListTitleBox>

      <OrderListExeListNameBox className="dialogExecutionList">
        {orderListLoading ? (
          <LoadingCircle />
        ) : orderListError ? (
          <ErrorMsgBox />
        ) : orderListData.length === 0 ? (
          <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
        ) : (
          orderListData.map((order) => (
            <OrderListExeListInsertName
              onClick={() => selectInsertOrder(order.id)}
            >
              <Typography>{order.name}</Typography>

              <IconButtonHelp
                className="iconBtn-help"
                onClick={(e) => orderDetailHandler(e, order.id)}
              >
                <StyleHelpRoundedIcon className="icon-help" />
              </IconButtonHelp>
            </OrderListExeListInsertName>
          ))
        )}
      </OrderListExeListNameBox>
    </OrderListExeListBox>
  );
}

export default OrderListDialogExecutionListInsert;
