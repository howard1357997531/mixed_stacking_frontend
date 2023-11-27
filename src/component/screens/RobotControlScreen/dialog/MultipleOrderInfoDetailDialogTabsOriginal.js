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
  multipleOrderSelectId,
  multipleOrderData,
}) {
  const StyleBox = styled(Box)(({ theme }) => ({
    boxSizing: "border-box",
    width: "100%",
    height: "500px",
    padding: "2px 10px",
    overflowY: "auto",
  }));

  return multipleOrderSelectId ? (
    <StyleBox className="multipleOrderInfoDetail">
      <Typography
        variant="h6"
        align="center"
        sx={{ color: Colors.greyTextBlood, marginTop: "10px" }}
      >
        {multipleOrderData.name}
      </Typography>
      <Typography
        textAlign="right"
        sx={{
          color: Colors.greyTextBlood,
          fontWeight: 600,
          fontSize: "14px",
        }}
      >
        數量: {multipleOrderData.aiTraining_order.split(",").length}
      </Typography>
      <Typography
        textAlign="right"
        sx={{
          color: Colors.greyTextBlood,
          fontWeight: 600,
          fontSize: "14px",
        }}
      >
        創建時間: {multipleOrderData.createdAt}
      </Typography>
      <MultipleOrderInfoDialogBox isTitle={true}>
        <MultipleOrderInfoDialogSmBox>名稱</MultipleOrderInfoDialogSmBox>
        <MultipleOrderInfoDialogSmBox>寬度</MultipleOrderInfoDialogSmBox>
        <MultipleOrderInfoDialogSmBox>長度</MultipleOrderInfoDialogSmBox>
        <MultipleOrderInfoDialogSmBox>高度</MultipleOrderInfoDialogSmBox>
        <MultipleOrderInfoDialogSmBox>數量</MultipleOrderInfoDialogSmBox>
      </MultipleOrderInfoDialogBox>

      {multipleOrderData.orderItem.map((order, index) => (
        <MultipleOrderInfoDialogBox key={index} isTitle={false}>
          <MultipleOrderInfoDialogSmBox
            sx={{ backgroundColor: Colors.blue700, color: Colors.brown100 }}
          >
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
