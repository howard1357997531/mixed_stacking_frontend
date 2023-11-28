import React from "react";
import {
  AiIsTraingGifText,
  AiResultAvatar,
  AiResultBox,
  AiResultSmallBox,
  FunctionAreaContentBox,
  FunctionAreaContentTitle,
  MenuFunctionBox,
  MenuFunctionTitle,
  OrderListContentMsg,
  OrderListDetailBox,
  OrderListDetailSmallBox,
} from "../../../styles/OrderScreen";
import { useSelector } from "react-redux";
import { Avatar, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorMsgBox from "../../../tool/ErrorMsgBox";
import LoadingCircle from "../../../tool/LoadingCircle";
import FunctionAreaMultipleOrderContent from "./FunctionAreaMultipleOrderContent";
import CenterText from "../../../tool/CenterText";
import { AiResultAvatarBgcolor } from "../../../tool/func";
import { Colors } from "../../../styles/theme";

function FunctionAreaContent({ orderSelectMode, orderSelectIdArray }) {
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const { aiTrainingState, orderCurrentData, aiCurrentData } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  const {
    loading: multipleOrderLoading,
    error: multipleOrderError,
    data: multipleOrderData,
    orderId: multipleOrderSelectId,
  } = useSelector((state) => state.multipleOrderList);

  if (orderCurrentData) {
    var orderCountArray = orderCurrentData.orderItem.map(
      (order) => order.quantity
    );
    var orderCount = orderCountArray.reduce((acc, value) => acc + value, 0);
  }

  const createMultipleOrderSelectData = (orderId) => {
    let [filterData] = orderListData.filter((order) => order.id === orderId);
    return filterData;
  };

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
      return multipleOrderLoading ? (
        <LoadingCircle />
      ) : multipleOrderError ? (
        <ErrorMsgBox />
      ) : multipleOrderData.length === 0 ? (
        <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
      ) : (
        <FunctionAreaMultipleOrderContent
          hasSelect={multipleOrderSelectId !== ""}
        />
      );
    } else if (orderSelectMode === "multipleOrderCreate") {
      return orderSelectIdArray.length === 0 ? (
        <CenterText text={"尚未選擇工單"} />
      ) : (
        orderSelectIdArray.map((orderId, index) => (
          <MenuFunctionBox key={orderId}>
            <Avatar
              sx={{
                position: "absolute",
                top: "50%",
                left: "15px",
                transform: "translateY(-50%)",
                height: "30px",
                width: "30px",
                color: Colors.grey100,
                backgroundColor: Colors.greyBorder,
                border: `1px solid ${Colors.greyBorder}`,
              }}
            >
              {index + 1}
            </Avatar>
            <MenuFunctionTitle>
              {createMultipleOrderSelectData(orderId).name}
            </MenuFunctionTitle>
          </MenuFunctionBox>
        ))
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
      className="functionArea-list"
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
