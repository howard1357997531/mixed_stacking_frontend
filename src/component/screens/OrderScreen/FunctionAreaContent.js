import React from "react";
import {
  FunctionAreaContentBox,
  OrderListContentMsg,
} from "../../../styles/OrderScreen";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorMsgBox from "../../../tool/ErrorMsgBox";
import FunctionAreaContentMultipleOrder from "./FunctionAreaContentMultipleOrder";
import FunctionAreaContentMultipleOrderCreate from "./FunctionAreaContentMultipleOrderCreate";
import FunctionAreaContentOrder from "./FunctionAreaContentOrder";
import FunctionAreaContentAiResult from "./FunctionAreaContentAiResult";
import FunctionAreaContentDelete from "./FunctionAreaContentDelete";
import FunctionAreaContentEdit from "./FunctionAreaContentEdit";
import "./css/FunctionAreaContent.css";
import LoadingCircle from "../../../tool/LoadingCircle";

function FunctionAreaContent({ orderSelectMode }) {
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const { orderId, editId, deleteIdArray } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  const Content = () => {
    if (orderSelectMode === "orderDetail") {
      return <FunctionAreaContentOrder />;
    } else if (orderSelectMode === "aiResult") {
      return <FunctionAreaContentAiResult />;
    } else if (orderSelectMode === "multipleOrder") {
      return <FunctionAreaContentMultipleOrder orderListData={orderListData} />;
    } else if (orderSelectMode === "multipleOrderCreate") {
      return (
        <FunctionAreaContentMultipleOrderCreate orderListData={orderListData} />
      );
    } else if (orderSelectMode === "edit") {
      return <FunctionAreaContentEdit />;
    } else if (orderSelectMode === "delete") {
      return <FunctionAreaContentDelete orderListData={orderListData} />;
    }
  };

  return (
    <FunctionAreaContentBox
      orderSelectMode={orderSelectMode}
      className="functionArea-box"
    >
      {orderListLoading && orderSelectMode !== "delete" ? (
        <LoadingCircle />
      ) : orderListError ? (
        <ErrorMsgBox />
      ) : ["orderDetail", "aiResult"].includes(orderSelectMode) && !orderId ? (
        <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
      ) : (
        <Content></Content>
      )}
    </FunctionAreaContentBox>
  );
}

export default FunctionAreaContent;
