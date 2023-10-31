import { Typography } from "@mui/material";
import React from "react";

function FunctionAreaNavTitle({ orderSelectMode }) {
  const titleArray = [
    "orderDetail",
    "aiResult",
    "multipleOrder",
    "multipleOrderCreate",
    "edit",
    "delete",
  ];
  const titleName = {
    orderDetail: "詳細資訊",
    aiResult: "AI 演算結果",
    multipleOrder: "多單資料",
    multipleOrderCreate: "多單建立",
    edit: "修改",
    delete: "刪除",
  };

  const Title = () => {
    if (titleArray.includes(orderSelectMode)) {
      return (
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {titleName[orderSelectMode]}
        </Typography>
      );
    }
  };

  return <Title></Title>;
}

export default FunctionAreaNavTitle;
