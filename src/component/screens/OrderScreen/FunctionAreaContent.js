import React from "react";
import {
  AiIsTraingGifText,
  AiResultAvatar,
  AiResultBox,
  AiResultSmallBox,
  FunctionAreaContentBox,
  MenuFunctionBox,
  MenuFunctionTitle,
  OrderListDetailBox,
  OrderListDetailSmallBox,
} from "../../../styles/OrderScreen";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import {
  blueGrey,
  brown,
  deepPurple,
  orange,
  red,
  teal,
} from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorMsgBox from "../../../tool/ErrorMsgBox";

function FunctionAreaContent({ orderSelectMode, orderSelectId }) {
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const { aiTrainingState, orderCurrentData, aiCurrentData } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  const AiResultAvatarBgcolor = (number) => {
    if (number > 10 && number <= 20) {
      return teal[200];
    } else if (number > 20 && number <= 30) {
      return deepPurple[200];
    } else if (number > 30 && number <= 40) {
      return red[300];
    } else if (number > 40 && number <= 50) {
      return orange[300];
    } else if (number > 50 && number <= 60) {
      return brown[300];
    }
  };

  const multipleOrderSelectData = (orderId) => {
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
            <Typography>檔案名稱 : {orderCurrentData.name}</Typography>
            <Typography>是否演算 : {aiTrainingState}</Typography>
            <Typography>上傳時間 : {orderCurrentData.createdAt}</Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{
                backgroundColor: blueGrey[500],
                color: "#fff",
                marginTop: "10px",
                padding: "5px 0px",
              }}
            >
              清單
            </Typography>

            <OrderListDetailBox>
              <OrderListDetailSmallBox>名稱</OrderListDetailSmallBox>
              <OrderListDetailSmallBox>寬度</OrderListDetailSmallBox>
              <OrderListDetailSmallBox>長度</OrderListDetailSmallBox>
              <OrderListDetailSmallBox>高度</OrderListDetailSmallBox>
              <OrderListDetailSmallBox>數量</OrderListDetailSmallBox>
            </OrderListDetailBox>

            {orderCurrentData.orderItem.map((order, index) => (
              <OrderListDetailBox key={index}>
                <OrderListDetailSmallBox>{order.name}</OrderListDetailSmallBox>
                <OrderListDetailSmallBox>{order.width}</OrderListDetailSmallBox>
                <OrderListDetailSmallBox>
                  {order.height}
                </OrderListDetailSmallBox>
                <OrderListDetailSmallBox>{order.depth}</OrderListDetailSmallBox>
                <OrderListDetailSmallBox>
                  {order.quantity}
                </OrderListDetailSmallBox>
              </OrderListDetailBox>
            ))}
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
      return orderSelectId.map((orderId) => (
        <MenuFunctionBox key={orderId}>
          <MenuFunctionTitle>
            {multipleOrderSelectData(orderId).name}
          </MenuFunctionTitle>
          <MenuFunctionTitle>
            {multipleOrderSelectData(orderId).createdAt}
          </MenuFunctionTitle>
        </MenuFunctionBox>
      ));
    } else if (orderSelectMode === "edit") {
      return <p>edit</p>;
    } else if (orderSelectMode === "delete") {
      return <p>delete</p>;
    }
  };

  return (
    <FunctionAreaContentBox
      orderSelectMode={orderSelectMode}
      className="worklist-box"
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
