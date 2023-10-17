import { Typography } from "@mui/material";
import React from "react";

function FunctionAreaNavTitle({ orderListMode }) {
  const Title = () => {
    if (orderListMode === "orderDetail") {
      return <Typography variant="h6">Order Details</Typography>;
    } else if (orderListMode === "ai_result") {
      return <Typography variant="h6">AI result</Typography>;
    }
  };

  return <Title></Title>;
}

export default FunctionAreaNavTitle;
