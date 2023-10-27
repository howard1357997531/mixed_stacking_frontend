import { Typography } from "@mui/material";
import React from "react";

function FunctionAreaNavTitle({ orderSelectMode }) {
  const Title = () => {
    if (orderSelectMode === "orderDetail") {
      return (
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          詳細資訊
        </Typography>
      );
    } else if (orderSelectMode === "aiResult") {
      return (
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          AI 演算結果
        </Typography>
      );
    } else if (orderSelectMode === "multipleOrder") {
      return (
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          多單
        </Typography>
      );
    } else if (orderSelectMode === "edit") {
      return (
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          修改
        </Typography>
      );
    } else if (orderSelectMode === "delete") {
      return (
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          刪除
        </Typography>
      );
    }
  };

  return <Title></Title>;
}

export default FunctionAreaNavTitle;
