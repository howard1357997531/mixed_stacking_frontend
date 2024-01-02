import { Typography } from "@mui/material";
import React from "react";
import { Colors } from "../../../styles/theme";
import { useSelector } from "react-redux";

function FunctionAreaNavTitle({ orderSelectMode }) {
  const { data } = useSelector((state) => state.orderList);
  const { orderId } = useSelector((state) => state.orderScreen_orderSelect);

  var name = "";
  if (data && orderId) {
    const [temp] = data.filter((order) => order.id === orderId);
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
    multipleOrder: "組合單",
    multipleOrderCreate: "組合單建立",
    edit: "修改",
    delete: "刪除",
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
