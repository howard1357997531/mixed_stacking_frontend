import React, { Fragment, useState } from "react";
import {
  ConfirmBox,
  IconButtonBack,
  IconButtonHelp,
  IconButtonSearch,
  OrderListExeListBox,
  OrderListExeListInsertName,
  OrderListExeListNameBox,
  OrderListExeListTitleBox,
  StyleHelpRoundedIcon,
} from "../../../../styles/RobotControlScreen/dialog";
import { Button, Collapse, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ROBOT_CONTROL_SCREEN } from "../../../../redux/constants";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LoadingCircle from "../../../../tool/LoadingCircle";
import ErrorMsgBox from "../../../../tool/ErrorMsgBox";
import { OrderListContentMsg } from "../../../../styles/OrderScreen";
import { Colors } from "../../../../styles/theme";
import { selectInsertOrderAction } from "../../../../redux/actions/RobotControlScreenAction";

function OrderListDialogExecutionListInsert(props) {
  const [insertCkeck, setInsertCheck] = useState(false);
  const [insertId, setInsertId] = useState(null);
  const dispatch = useDispatch();
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const { insertIndex } = props.robotExecutionData;

  const backHandler = () => {
    dispatch({
      type: ROBOT_CONTROL_SCREEN.robotExecutionList,
      payload: { insertOrderOpen: false },
    });
  };

  const selectInsertOrderHandler = (order) => {
    dispatch(selectInsertOrderAction(order, props.robotExecutionData));
  };

  const confirmHandler = (id) => {
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
          orderListData.map((order) =>
            order.aiTraining_order ? (
              <Fragment key={order.id}>
                <OrderListExeListInsertName
                  sx={{
                    borderTop:
                      insertCkeck && insertId === order.id + 1
                        ? `1px solid ${Colors.brownHover}`
                        : "none",
                  }}
                  onClick={() => confirmHandler(order.id)}
                >
                  <Typography>{order.name}</Typography>

                  <Tooltip title="詳細資料" placement="left" arrow>
                    <IconButtonHelp
                      className="iconBtn-help"
                      onClick={(e) => orderDetailHandler(e, order.id)}
                    >
                      <StyleHelpRoundedIcon className="icon-help" />
                    </IconButtonHelp>
                  </Tooltip>
                </OrderListExeListInsertName>
                <Collapse in={insertCkeck && insertId === order.id}>
                  <ConfirmBox>
                    <Button
                      variant="contained"
                      onClick={() => selectInsertOrderHandler(order)}
                    >
                      確定
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={confirmCancelHandler}
                    >
                      取消
                    </Button>
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
