import React from "react";
import {
  AiIsTraingGifText,
  FunctionAreaContentBox,
} from "../../../styles/OrderScreen";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorMsgBox from "../../../tool/ErrorMsgBox";
import FunctionAreaContentMultipleOrder from "./FunctionAreaContentMultipleOrder";
import FunctionAreaContentMultipleOrderCreate from "./FunctionAreaContentMultipleOrderCreate";
import "./css/FunctionAreaContent.css";
import FunctionAreaContentOrder from "./FunctionAreaContentOrder";
import FunctionAreaContentAiResult from "./FunctionAreaContentAiResult";

function FunctionAreaContent({ orderSelectMode }) {
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const { aiTrainingState } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  const Content = () => {
    if (orderSelectMode === "orderDetail") {
      if (aiTrainingState === "is_training") {
        return (
          <>
            <img
              src={"loading.gif"}
              alt={"loading.gif"}
              className="ai-gif"
            ></img>
            <AiIsTraingGifText>演算中</AiIsTraingGifText>
          </>
        );
      } else {
        return <FunctionAreaContentOrder />;
      }
    } else if (orderSelectMode === "aiResult") {
      return <FunctionAreaContentAiResult />;
    } else if (orderSelectMode === "multipleOrder") {
      return <FunctionAreaContentMultipleOrder orderListData={orderListData} />;
    } else if (orderSelectMode === "multipleOrderCreate") {
      return (
        <FunctionAreaContentMultipleOrderCreate orderListData={orderListData} />
      );
    } else if (orderSelectMode === "edit") {
      return <p>edit</p>;
    } else if (orderSelectMode === "delete") {
      return <p>delete</p>;
    }
  };

  return (
    <FunctionAreaContentBox
      orderSelectMode={orderSelectMode}
      className="functionArea-box"
    >
      {orderListLoading ? (
        <CircularProgress />
      ) : orderListError ? (
        <ErrorMsgBox />
      ) : (
        <Content></Content>
      )}
    </FunctionAreaContentBox>
  );
}

export default FunctionAreaContent;
