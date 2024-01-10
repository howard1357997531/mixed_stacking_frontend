import { Typography } from "@mui/material";
import React from "react";
import { Colors } from "../../../styles/theme";
import { useSelector } from "react-redux";

function FunctionAreaNavTitle({ orderSelectMode }) {
  const { loading, data } = useSelector((state) => state.orderList);
  const { mode, orderId } = useSelector(
    (state) => state.orderScreen_orderSelect
  );
  const { data: multiData, orderId: multiOrderId } = useSelector(
    (state) => state.multipleOrderList
  );

  var name = "";
  if (data && orderId && mode === "orderDetail") {
    const [temp] = data.filter((order) => order.id === orderId);
    name = temp.name;
  } else if (multiData && multiOrderId && mode === "multipleOrder") {
    const [temp] = multiData.filter((order) => order.id === multiOrderId);
    name = temp.name;
  }

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
    multipleOrder: name,
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

  return loading ? null : <Title></Title>;
}

export default FunctionAreaNavTitle;
