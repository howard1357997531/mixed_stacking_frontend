import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMsgBox from "../../../tool/ErrorMsgBox";
import LoadingCircle from "../../../tool/LoadingCircle";
import { multipleOrderCreateAction } from "../../../redux/actions/OrderScreenAction";
import { Tooltip } from "@mui/material";
import {
  MultiCreateDate,
  MultiCreateDetial,
  MultiCreateName,
  IconButtonHelp,
  StyleHelpRoundedIcon,
} from "../../../styles/OrderScreen/OrderListContentMultipleOrderCreate";
import { OrderListContentMsg } from "../../../styles/OrderScreen";
import { DIALOG } from "../../../redux/constants";
import OrderDetailDialog from "../../dialog/orderDetail/OrderDetailDialog";

function OrderListContentMultipleOrderCreate() {
  const dispatch = useDispatch();
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const multiOrderSelectHandler = (orderId) => {
    dispatch(multipleOrderCreateAction(orderId));
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
  ) : (
    <>
      {orderListData.map((order, index) =>
        order.aiTraining_state === "finish_training" ? (
          <Fragment key={order.id}>
            {order.is_today_latest ? (
              <MultiCreateDate sx={{ borderTop: index === 0 && "none" }}>
                {order.createdAt.slice(0, -7)}
              </MultiCreateDate>
            ) : null}

            <MultiCreateDetial
              itemSelect={false}
              onMouseEnter={() => mouseEnterHandler(order.id)}
              onMouseLeave={mouseLeaveHandler}
              onClick={() => {
                multiOrderSelectHandler(order.id);
              }}
            >
              <MultiCreateName itemSelect={false}>
                {order.name}
                <Tooltip title="詳細資料" placement="left" arrow>
                  <IconButtonHelp
                    className="iconBtn-help"
                    display={detailHover && detailId === order.id}
                    onClick={(e) => multiOrderDetailHandler(e, order.id)}
                  >
                    <StyleHelpRoundedIcon className="icon-help" />
                  </IconButtonHelp>
                </Tooltip>
              </MultiCreateName>
            </MultiCreateDetial>
          </Fragment>
        ) : null
      )}

      <OrderDetailDialog
        openDialog={openDialog}
        onCloseDialog={onCloseDialog}
        source={"order"}
      />
    </>
  );
}

export default OrderListContentMultipleOrderCreate;
