import React from "react";
import {
  AiIsTraingGifText,
  AiResultAvatar,
  AiResultBox,
  AiResultSmallBox,
  FunctionAreaContentBox,
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

function FunctionAreaContent() {
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const { mode, orderId, aiTrainingState, orderCurrentData, aiCurrentData } =
    useSelector((state) => state.orderScreen_orderSelect);

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

  const Content = () => {
    if (mode === "orderDetail") {
      if (aiTrainingState === "is_training") {
        return (
          <>
            <img
              src={"loading.gif"}
              alt={"loading.gif"}
              className="ai-gif"
            ></img>
            <AiIsTraingGifText>training</AiIsTraingGifText>
          </>
        );
      } else {
        return (
          <>
            <Typography>file name : {orderCurrentData.name}</Typography>
            <Typography>AI training state : {aiTrainingState}</Typography>
            <Typography>upload date : {orderCurrentData.createdAt}</Typography>
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
              Order list
            </Typography>

            <OrderListDetailBox>
              <OrderListDetailSmallBox>name</OrderListDetailSmallBox>
              <OrderListDetailSmallBox>width</OrderListDetailSmallBox>
              <OrderListDetailSmallBox>height</OrderListDetailSmallBox>
              <OrderListDetailSmallBox>depth</OrderListDetailSmallBox>
              <OrderListDetailSmallBox>quantity</OrderListDetailSmallBox>
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
    } else if (mode === "aiResult") {
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
    }
  };

  return (
    <FunctionAreaContentBox className="worklist-box">
      {orderListLoading ? (
        <CircularProgress />
      ) : orderListError ? (
        <p>{orderListError}</p>
      ) : (
        <Content></Content>
      )}
    </FunctionAreaContentBox>
  );
}

export default FunctionAreaContent;
