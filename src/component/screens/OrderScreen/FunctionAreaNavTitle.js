import { Typography } from "@mui/material";
import React from "react";

function FunctionAreaNavTitle({ orderListMode }) {
  const Title = () => {
    if (orderListMode === "orderDetail") {
      return (
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          詳細資訊
        </Typography>
      );
    } else if (orderListMode === "aiResult") {
      return (
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          AI 演算結果
        </Typography>
      );
    }
  };

  return <Title></Title>;
}

export default FunctionAreaNavTitle;
