import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import {
  MultipleOrderInfoDialogBox,
  MultipleOrderInfoDialogSmBox,
} from "../../../../styles/RobotControlScreen";
import { Colors } from "../../../../styles/theme";

function MultipleOrderInfoDetailDialogTabsOriginal({
  onMultipleOrderInfoDetailDialog,
  multipleOrderId,
  multipleOrderData,
}) {
  const StyleBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "500px",
    overflowY: "auto",
  }));

  return multipleOrderId ? (
    <StyleBox className="multipleOrderInfoDetail">
      <Typography marginLeft={1} marginTop={"2px"}>
        總數量: {multipleOrderData.order.aiTraining_order.split(",").length}
      </Typography>
      <Typography marginLeft={1}>
        創建時間: {multipleOrderData.order.createdAt}
      </Typography>
      <MultipleOrderInfoDialogBox
        sx={{ borderTop: `1px solid ${Colors.brownHover}` }}
        isTitle={true}
      >
        <MultipleOrderInfoDialogSmBox>名稱</MultipleOrderInfoDialogSmBox>
        <MultipleOrderInfoDialogSmBox>寬度</MultipleOrderInfoDialogSmBox>
        <MultipleOrderInfoDialogSmBox>長度</MultipleOrderInfoDialogSmBox>
        <MultipleOrderInfoDialogSmBox>高度</MultipleOrderInfoDialogSmBox>
        <MultipleOrderInfoDialogSmBox>數量</MultipleOrderInfoDialogSmBox>
      </MultipleOrderInfoDialogBox>

      {multipleOrderData.order.orderItem.map((order, index) => (
        <MultipleOrderInfoDialogBox key={index} isTitle={false}>
          <MultipleOrderInfoDialogSmBox>
            {order.name}
          </MultipleOrderInfoDialogSmBox>
          <MultipleOrderInfoDialogSmBox>
            {order.width}
          </MultipleOrderInfoDialogSmBox>
          <MultipleOrderInfoDialogSmBox>
            {order.height}
          </MultipleOrderInfoDialogSmBox>
          <MultipleOrderInfoDialogSmBox>
            {order.depth}
          </MultipleOrderInfoDialogSmBox>
          <MultipleOrderInfoDialogSmBox>
            {order.quantity}
          </MultipleOrderInfoDialogSmBox>
        </MultipleOrderInfoDialogBox>
      ))}
    </StyleBox>
  ) : null;
}

export default MultipleOrderInfoDetailDialogTabsOriginal;
