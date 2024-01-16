import { Typography } from "@mui/material";
import React from "react";
import { Colors } from "../../../styles/theme";
import { useSelector } from "react-redux";

function FunctionAreaNavTitle({ orderSelectMode }) {
  const { name } = useSelector((state) => state.orderList);

  const { name: multiName } = useSelector((state) => state.multipleOrderList);

  const titleArray = [
    "orderDetail",
    "aiResult",
    "multipleOrder",
    "multipleOrderCreate",
    "edit",
    "delete",
  ];
  const titleName = {
    orderDetail: name,
    aiResult: "AI 演算結果",
    multipleOrder: multiName,
    multipleOrderCreate: "",
    edit: "",
    delete: "",
  };

  const Title = () => {
    if (titleArray.includes(orderSelectMode)) {
      return (
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: Colors.greyText }}
        >
          {titleName[orderSelectMode]}
        </Typography>
      );
    }
  };

  return <Title></Title>;
}

export default FunctionAreaNavTitle;
