import React, { Fragment, useState } from "react";
import {
  ConfirmBox,
  ConfirmBoxButton,
  IconButtonBack,
  IconButtonHelp,
  IconButtonSearch,
  OrderListExeListBox,
  OrderListExeListInsertName,
  OrderListExeListNameBox,
  OrderListExeListTitleBox,
  StyleHelpRoundedIcon,
} from "../../../../styles/RobotControlScreen/dialog";
import { Collapse, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ROBOT_CONTROL_SCREEN } from "../../../../redux/constants";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LoadingCircle from "../../../../tool/LoadingCircle";
import ErrorMsgBox from "../../../../tool/ErrorMsgBox";
import { OrderListContentMsg } from "../../../../styles/OrderScreen";
import { Colors } from "../../../../styles/theme";
import { selectInsertOrderAction } from "../../../../redux/actions/RobotControlScreenAction";
import { teal } from "@mui/material/colors";

function OrderListDialogExecutionListInsert(props) {
  const dispatch = useDispatch();
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const robotStateMode = props.robotStateMode;

  const backHandler = () => {
    dispatch({
      type: ROBOT_CONTROL_SCREEN.robotExecutionList,
      payload: { insertOrderOpen: false },
    });
  };

  const selectInsertOrderHandler = (order) => {
    dispatch(
      selectInsertOrderAction(order, robotStateMode, props.robotExecutionData)
    );
  };

  const [insertCkeck, setInsertCheck] = useState(false);
  const [insertId, setInsertId] = useState(null);

  const confirmHandler = (id, index) => {
    if (id === insertId || !insertId) {
      setInsertCheck((prev) => !prev);
    } else if (id !== insertId) {
      setInsertCheck(true);
    }
    setInsertId(id);
  };

  const confirmCancelHandler = () => {
    setInsertCheck(false);
    setInsertId(null);
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

  // detail hover
  const [detailId, setDetailId] = useState(null);
  const [detailHover, setDetailHover] = useState(false);

  const mouseEnterHandler = (id) => {
    setDetailId(id);
    setDetailHover(true);
  };

  const mouseLeaveHandler = () => {
    setDetailId(null);
    setDetailHover(false);
  };

  return (
    <OrderListExeListBox>
      <OrderListExeListTitleBox>
        <IconButtonBack onClick={backHandler}>
          <ChevronLeftIcon />
        </IconButtonBack>
        請選擇插單
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
          orderListData.map((order, index) =>
            order.aiTraining_order ? (
              <Fragment key={order.id}>
                <OrderListExeListInsertName
                  onMouseEnter={() => mouseEnterHandler(order.id)}
                  onMouseLeave={mouseLeaveHandler}
                  onClick={() => confirmHandler(order.id, index)}
                >
                  <Typography fontWeight={600}>{order.name}</Typography>

                  <Tooltip title="詳細資料" placement="left" arrow>
                    <IconButtonHelp
                      className="iconBtn-help"
                      display={detailHover && detailId === order.id}
                      onClick={(e) => orderDetailHandler(e, order.id)}
                    >
                      <StyleHelpRoundedIcon className="icon-help" />
                    </IconButtonHelp>
                  </Tooltip>
                </OrderListExeListInsertName>

                <Collapse in={insertCkeck && insertId === order.id}>
                  <ConfirmBox>
                    <ConfirmBoxButton
                      disableElevation
                      variant="contained"
                      colorArray={[Colors.blue500, Colors.blue600]}
                      onClick={() => selectInsertOrderHandler(order)}
                    >
                      插單
                    </ConfirmBoxButton>
                    <ConfirmBoxButton
                      disableElevation
                      variant="contained"
                      colorArray={[Colors.darkred, Colors.darkredHover]}
                      onClick={confirmCancelHandler}
                    >
                      取消
                    </ConfirmBoxButton>
                  </ConfirmBox>
                </Collapse>
              </Fragment>
            ) : null
          )
        )}
      </OrderListExeListNameBox>
    </OrderListExeListBox>
  );
}

export default OrderListDialogExecutionListInsert;
