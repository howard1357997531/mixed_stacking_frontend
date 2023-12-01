import React, { Fragment, useState } from "react";
import {
  IconButtonHelp,
  MultiCreateDetial,
  MultiCreateName,
  OrderListContentMsg,
  OrderListDate,
  OrderListDetial,
  OrderListName,
  OrderListState,
  OrderListStateText,
  StyleHelpRoundedIcon,
} from "../../../styles/OrderScreen";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../../styles/theme";
import TextEffect from "../../../tool/TextEffect";
import ErrorMsgBox from "../../../tool/ErrorMsgBox";
import LoadingCircle from "../../../tool/LoadingCircle";
import { multipleOrderCreateAction } from "../../../redux/actions/OrderScreenAction";
import { Tooltip } from "@mui/material";

function OrderListContentMultipleOrderCreate({
  orderSelectMode,
  orderSelectIdArray,
}) {
  const dispatch = useDispatch();
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const multiOrderSelectHandler = (orderId) => {
    dispatch(multipleOrderCreateAction(orderId));
  };

  const multiOrderDetailHandler = (e, id) => {
    e.stopPropagation();
  };

  const [detailId, setDetailId] = useState(null);
  const [detailHover, setDetailHover] = useState(false);
  const mouseEnterHandler = (id) => {
    setDetailId(id);
    setDetailHover(true);
  };

  // console.log("asd*".includes("*"));
  const mouseLeaveHandler = () => {
    setDetailId(null);
    setDetailHover(false);
  };

  return (
    <>
      {orderListLoading ? (
        <LoadingCircle />
      ) : orderListError ? (
        <ErrorMsgBox />
      ) : orderListData.length === 0 ? (
        <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
      ) : (
        orderListData.map((order, index) =>
          order.aiTraining_state === "finish_training" ? (
            <Fragment key={order.id}>
              {order.is_today_latest ? (
                <OrderListDate sx={{ borderTop: index === 0 && "none" }}>
                  {order.createdAt.slice(0, -7)}
                </OrderListDate>
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
        )
      )}
    </>
  );
}

export default OrderListContentMultipleOrderCreate;
