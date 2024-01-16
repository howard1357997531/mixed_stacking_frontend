import React from "react";
import { FunctionAreaContentBox } from "../../../styles/OrderScreen";
import { useSelector } from "react-redux";
import FunctionAreaContentMultipleOrder from "./FunctionAreaContentMultipleOrder";
import FunctionAreaContentMultipleOrderCreate from "./FunctionAreaContentMultipleOrderCreate";
import FunctionAreaContentOrder from "./FunctionAreaContentOrder";
import FunctionAreaContentAiResult from "./FunctionAreaContentAiResult";
import FunctionAreaContentDelete from "./FunctionAreaContentDelete";
import FunctionAreaContentEdit from "./FunctionAreaContentEdit";
import "./css/FunctionAreaContent.css";

function FunctionAreaContent({ orderSelectMode }) {
  const { data: orderListData } = useSelector((state) => state.orderList);

  const Content = () => {
    if (orderSelectMode === "orderDetail") {
      return <FunctionAreaContentOrder />;
    } else if (orderSelectMode === "aiResult") {
      return <FunctionAreaContentAiResult />;
    } else if (orderSelectMode === "multipleOrder") {
      return <FunctionAreaContentMultipleOrder orderListData={orderListData} />;
    } else if (orderSelectMode === "multipleOrderCreate") {
      return (
        <FunctionAreaContentMultipleOrderCreate orderListData={orderListData} />
      );
    } else if (orderSelectMode === "edit") {
      return <FunctionAreaContentEdit />;
    } else if (orderSelectMode === "delete") {
      return <FunctionAreaContentDelete orderListData={orderListData} />;
    }
  };

  return (
    <FunctionAreaContentBox
      orderSelectMode={orderSelectMode}
      className="functionArea-box"
    >
      <Content></Content>
    </FunctionAreaContentBox>
  );
}

export default FunctionAreaContent;
