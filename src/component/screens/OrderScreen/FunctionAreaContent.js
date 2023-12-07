import React from "react";
import {
  AiIsTraingGifText,
  AiResultAvatar,
  AiResultBox,
  AiResultSmallBox,
  FunctionAreaContentBox,
  FunctionAreaContentTitle,
  OrderListDetailBox,
  OrderListDetailSmallBox,
} from "../../../styles/OrderScreen";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorMsgBox from "../../../tool/ErrorMsgBox";
import { AiResultAvatarBgcolor } from "../../../tool/func";
import { Colors } from "../../../styles/theme";
import FunctionAreaContentMultipleOrder from "./FunctionAreaContentMultipleOrder";
import FunctionAreaContentMultipleOrderCreate from "./FunctionAreaContentMultipleOrderCreate";
import "./css/FunctionAreaContent.css";
import FunctionAreaContentOrder from "./FunctionAreaContentOrder";

function FunctionAreaContent({ orderSelectMode }) {
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const { aiTrainingState, orderCurrentData, aiCurrentData } = useSelector(
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
        return <FunctionAreaContentOrder orderCurrentData={orderCurrentData} />;
      }
    } else if (orderSelectMode === "aiResult") {
      return (
        <AiResultBox>
          {aiCurrentData.split(",").map((aiData, index) => (
            <AiResultSmallBox key={index}>
              <AiResultAvatar
                sx={{
                  backgroundColor: AiResultAvatarBgcolor(index + 1),
                }}
              >
                {index + 1}
              </AiResultAvatar>
              <Typography sx={{ flexGrow: 1, textAlign: "center" }}>
                {aiData}
              </Typography>
            </AiResultSmallBox>
          ))}
        </AiResultBox>
      );
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
