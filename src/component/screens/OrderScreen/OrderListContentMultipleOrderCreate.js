import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMsgBox from "../../../tool/ErrorMsgBox";
import LoadingCircle from "../../../tool/LoadingCircle";
import {
  aiTrainingAction,
  multipleOrderCreateAction,
} from "../../../redux/actions/OrderScreenAction";
import { Tooltip } from "@mui/material";
import {
  IconButtonHelp,
  StyleHelpRoundedIcon,
} from "../../../styles/OrderScreen/OrderListContentMultipleOrderCreate";
import {
  NewText,
  OrderListContentMsg,
  OrderListDate,
  OrderListDetial,
  OrderListName,
  OrderListNameSelect,
  OrderListState,
  OrderListStateText,
} from "../../../styles/OrderScreen";
import { DIALOG, ORDER_SCREEN } from "../../../redux/constants";
import OrderDetailDialog from "../../dialog/orderDetail/OrderDetailDialog";
import { Colors } from "../../../styles/theme";
import TextEffect from "../../../tool/TextEffect";
import { InfoBtnToast, timerToast } from "../../../swal";

function OrderListContentMultipleOrderCreate() {
  const dispatch = useDispatch();
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const { combineOrder, orderSearch } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  if (orderListData.length > 0) {
    const tempData = orderSearch !== null ? orderSearch : orderListData;
    var groupedData = tempData.reduce((acc, item) => {
      const date = item.createdAt.slice(0, -7);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  }

  if (combineOrder) {
    var checkItemSelect = combineOrder.map((order) =>
      parseInt(order.split("*").at(0))
    );
  }

  const trainingCilck = (orderId) => {
    return dispatch(aiTrainingAction(orderId, "is_training"));
  };

  const multiOrderSelectHandler = (orderId, name, aiTraining_state) => {
    if (aiTraining_state === "finish_training") {
      dispatch(multipleOrderCreateAction(orderId, name));
      dispatch({
        type: ORDER_SCREEN.orderSelect,
        payload: { combineOrderSelectBool: true },
      });
    } else if (aiTraining_state === "is_training") {
      timerToast("warning", "演算中，不能選擇");
    } else {
      dispatch({ type: ORDER_SCREEN.orderSelect, payload: { orderId } });
      InfoBtnToast("warning", "尚未演算", "去演算", () =>
        trainingCilck(orderId)
      );
    }
  };

  const multiOrderDetailHandler = (e, orderId) => {
    e.stopPropagation();
    dispatch({ type: DIALOG.order, payload: { orderId } });
    setOpenDialog(true);
  };

  // hover
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

  // dialog
  const [openDialog, setOpenDialog] = useState(false);
  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  return orderListLoading ? (
    <LoadingCircle />
  ) : orderListError ? (
    <ErrorMsgBox />
  ) : orderListData.length === 0 ? (
    <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
  ) : orderSearch !== null && orderSearch.length === 0 ? (
    <OrderListContentMsg variant="h5">查無此資料</OrderListContentMsg>
  ) : (
    <>
      {Object.keys(groupedData).map((date, index) => (
        <Fragment key={date}>
          <OrderListDate isFirst={index === 0}>{date}</OrderListDate>

          {groupedData[date].map((order) => (
            <OrderListDetial
              key={order.id}
              data={[
                checkItemSelect.includes(order.id),
                Colors.greenHover,
                Colors.white,
              ]}
              onMouseEnter={() => mouseEnterHandler(order.id)}
              onMouseLeave={mouseLeaveHandler}
              onClick={() => {
                multiOrderSelectHandler(
                  order.id,
                  order.name,
                  order.aiTraining_state
                );
              }}
            >
              <OrderListName>
                {order.is_new && <NewText>New</NewText>}
                <OrderListNameSelect
                  sx={{
                    backgroundColor:
                      checkItemSelect.includes(order.id) && Colors.white,
                    border: `1px solid ${Colors.white}`,
                  }}
                  itemSelect={checkItemSelect.includes(order.id)}
                />
                {order.name}
              </OrderListName>

              <OrderListState>
                {order.aiTraining_state === "no_training" && (
                  <OrderListStateText sx={{ color: Colors.white }}>
                    尚未演算
                  </OrderListStateText>
                )}

                {order.aiTraining_state === "is_training" && (
                  <TextEffect text={"AI演算中"} textColor={Colors.white} />
                )}

                {order.aiTraining_state === "finish_training" && (
                  <OrderListStateText sx={{ color: Colors.greyTextBlood }}>
                    已演算
                  </OrderListStateText>
                )}

                {order.aiTraining_state === "finish_training" ? (
                  <Tooltip title="詳細資料" placement="top" arrow>
                    <IconButtonHelp
                      className="iconBtn-help-orderlist"
                      display={detailHover && detailId === order.id}
                      onClick={(e) => multiOrderDetailHandler(e, order.id)}
                    >
                      <StyleHelpRoundedIcon className="icon-help-orderlist" />
                    </IconButtonHelp>
                  </Tooltip>
                ) : null}
              </OrderListState>
            </OrderListDetial>
          ))}
        </Fragment>
      ))}

      {openDialog ? (
        <OrderDetailDialog
          openDialog={openDialog}
          onCloseDialog={onCloseDialog}
          source={"order"}
        />
      ) : null}
    </>
  );
}

export default OrderListContentMultipleOrderCreate;
