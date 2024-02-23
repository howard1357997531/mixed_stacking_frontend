import { Typography, useMediaQuery, useTheme } from "@mui/material";
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

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const Title = () => {
    if (titleArray.includes(orderSelectMode)) {
      return (
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: matches ? "18px" : "16px",
            fontWeight: 600,
            color: Colors.greyTextBlood,
          }}
        >
          {titleName[orderSelectMode]}
        </Typography>
      );
    }
  };

  return <Title></Title>;
}

export default FunctionAreaNavTitle;
