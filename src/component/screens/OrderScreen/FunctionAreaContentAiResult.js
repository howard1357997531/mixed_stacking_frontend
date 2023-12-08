import React from "react";
import {
  AiResultAvatar,
  AiResultBox,
  AiResultSmallBox,
} from "../../../styles/OrderScreen";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { AiResultAvatarBgcolor } from "../../../tool/func";
import "./css/FunctionAreaContent.css";

function FunctionAreaContentAiResult() {
  const { data } = useSelector((state) => state.orderList);
  const { orderId } = useSelector((state) => state.orderScreen_orderSelect);

  if (data) {
    var [orderData] = data.filter((order) => order.id === orderId);
    var aiResultData = orderData.aiTraining_order.split(",");
  }
  return (
    <AiResultBox>
      {aiResultData.map((result, index) => (
        <AiResultSmallBox key={index}>
          <AiResultAvatar
            sx={{
              backgroundColor: AiResultAvatarBgcolor(index + 1),
            }}
          >
            {index + 1}
          </AiResultAvatar>
          <Typography sx={{ flexGrow: 1, textAlign: "center" }}>
            {result}
          </Typography>
        </AiResultSmallBox>
      ))}
    </AiResultBox>
  );
}

export default FunctionAreaContentAiResult;
