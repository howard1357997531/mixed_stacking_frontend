import React from "react";
import {
  MULTIPLE_ORDER_LIST,
  ORDER_SCREEN,
  ORDER_SCREEN_orderList,
} from "../../../redux/constants";
import {
  CloseIconButton,
  FunctionAreaBox,
  FunctionAreaNav,
  OrderListContentMsg,
  StyleChevronLeftIcon,
  StyleCloseIcon,
} from "../../../styles/OrderScreen";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FunctionAreaNavTitle from "./FunctionAreaNavTitle";
import FunctionAreaNavButton from "./FunctionAreaNavButton";
import FunctionAreaContent from "./FunctionAreaContent";
import LoadingCircle from "../../../tool/LoadingCircle";
import ErrorMsgBox from "../../../tool/ErrorMsgBox";

function FunctionArea(props) {
  const dispatch = useDispatch();
  const { orderSelectMode } = props;
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);
  const {
    loading: multipleOrderListLoading,
    error: multipleOrderListError,
    data: multipleOrderListData,
  } = useSelector((state) => state.multipleOrderList);

  const { orderId, orderSearch, multiOrderSearch } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  const orderMode = !["multipleOrder", "multipleOrderCreate"].includes(
    orderSelectMode
  )
    ? true
    : false;

  if (orderSelectMode === "multipleOrder") {
    var loading = multipleOrderListLoading;
    var error = multipleOrderListError;
    var data = multipleOrderListData;
    var search = multiOrderSearch;
  } else if (
    ["close", "orderDetail", "aiResult", "edit"].includes(orderSelectMode)
  ) {
    var loading = orderListLoading;
    var error = orderListError;
    var data = orderListData;
    var search = orderSearch;
  } else {
    var loading = false;
    var error = false;
    var data = orderListData;
    var search = null;
  }

  const closeBoxHandler = () => {
    if (orderSelectMode === "multipleOrderCreate") {
      if (multipleOrderListData.length === 0) {
        dispatch({
          type: ORDER_SCREEN.orderSelect,
          payload: { mode: "noMultipleOrder" },
        });
      } else {
        dispatch({
          type: ORDER_SCREEN.orderSelect,
          payload: { mode: "multipleOrder" },
        });
      }
    } else if (["edit", "delete"].includes(orderSelectMode)) {
      dispatch({
        type: ORDER_SCREEN.orderSelect,
        payload: { mode: "orderDetail" },
      });

      if (!orderId && orderListData.length !== 0) {
        dispatch({
          type: ORDER_SCREEN.orderSelect,
          payload: { orderId: orderListData.at(0).id },
        });
      }
    } else {
      dispatch({
        type: ORDER_SCREEN.orderSelect,
        payload: { mode: "close", orderId: null, editId: null, editData: null },
      });
    }
  };

  return (
    <FunctionAreaBox mode={orderSelectMode}>
      {loading ? (
        <LoadingCircle />
      ) : error ? (
        <ErrorMsgBox />
      ) : data.length === 0 ? (
        <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
      ) : search !== null && search.length === 0 ? (
        <OrderListContentMsg variant="h5">查無此資料</OrderListContentMsg>
      ) : (
        <>
          <FunctionAreaNav>
            <CloseIconButton onClick={closeBoxHandler}>
              {["edit", "delete", "multipleOrderCreate"].includes(
                orderSelectMode
              ) ? (
                <StyleChevronLeftIcon />
              ) : (
                <StyleCloseIcon />
              )}
            </CloseIconButton>

            <FunctionAreaNavTitle {...props} />

            <FunctionAreaNavButton {...props} />
          </FunctionAreaNav>

          <FunctionAreaContent {...props} />
        </>
      )}
    </FunctionAreaBox>
  );
}

export default FunctionArea;
