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

function FunctionAreaContent({ orderSelectMode }) {
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const { aiTrainingState, orderCurrentData, aiCurrentData } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  if (orderCurrentData) {
    var orderCountArray = orderCurrentData.orderItem.map(
      (order) => order.quantity
    );
    var orderCount = orderCountArray.reduce((acc, value) => acc + value, 0);
  }

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
        return (
          <>
            <FunctionAreaContentTitle variant="h5">
              {orderCurrentData.name}
            </FunctionAreaContentTitle>

            <Typography
              textAlign="right"
              sx={{
                color: Colors.greyTextBlood,
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              數量: {orderCount}
            </Typography>

            <Typography
              textAlign="right"
              sx={{
                color: Colors.greyTextBlood,
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              上傳時間 : {orderCurrentData.createdAt}
            </Typography>

            <OrderListDetailBox isTitle={true}>
              <OrderListDetailSmallBox>名稱</OrderListDetailSmallBox>
              <OrderListDetailSmallBox>寬度</OrderListDetailSmallBox>
              <OrderListDetailSmallBox>長度</OrderListDetailSmallBox>
              <OrderListDetailSmallBox>高度</OrderListDetailSmallBox>
              <OrderListDetailSmallBox>數量</OrderListDetailSmallBox>
            </OrderListDetailBox>

            {orderCurrentData.orderItem.map((order, index) =>
              order.quantity !== 0 ? (
                <OrderListDetailBox key={index} isTitle={false}>
                  <OrderListDetailSmallBox>
                    {order.name}
                  </OrderListDetailSmallBox>
                  <OrderListDetailSmallBox>
                    {order.width}
                  </OrderListDetailSmallBox>
                  <OrderListDetailSmallBox>
                    {order.height}
                  </OrderListDetailSmallBox>
                  <OrderListDetailSmallBox>
                    {order.depth}
                  </OrderListDetailSmallBox>
                  <OrderListDetailSmallBox>
                    {order.quantity}
                  </OrderListDetailSmallBox>
                </OrderListDetailBox>
              ) : null
            )}
          </>
        );
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
