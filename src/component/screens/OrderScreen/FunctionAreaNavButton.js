import React from "react";
import { FunctionAreaNavBtn } from "../../../styles/OrderScreen";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_SCREEN_orderList } from "../../../redux/constants";
import {
  aiTrainingAction,
  functionAreaNavButtonAction,
} from "../../../redux/actions/OrderScreenAction";

function FunctionAreaNavButton({ orderSelectMode, orderSelectIdArray }) {
  const dispatch = useDispatch();

  const { aiTrainingState } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  const buttonHandler = (mode, aiTraining_state) => {
    dispatch(
      functionAreaNavButtonAction(mode, orderSelectIdArray, aiTraining_state)
    );
  };

  const changeMode = {
    aiResult: "orderDetail",
    multipleOrder: "multipleOrderCreate",
    multipleOrderCreate: "multipleOrder",
    edit: "edit",
    delete: "delete",
  };

  const btnName = {
    aiResult: "清單",
    multipleOrder: "建立",
    multipleOrderCreate: "創建",
    edit: "修改",
    delete: "刪除",
  };

  const NavButton = () => {
    if (orderSelectMode === "orderDetail") {
      if (aiTrainingState === "no_training") {
        return (
          <FunctionAreaNavBtn
            variant="contained"
            onClick={() => buttonHandler("orderDetail", "is_training")}
          >
            AI 演算
          </FunctionAreaNavBtn>
        );
      } else if (aiTrainingState === "finish_training") {
        return (
          <FunctionAreaNavBtn
            variant="contained"
            onClick={() => buttonHandler("aiResult", null)}
          >
            AI 結果
          </FunctionAreaNavBtn>
        );
      }
    } else if (
      [
        "aiResult",
        "multipleOrder",
        "multipleOrderCreate",
        "edit",
        "delete",
      ].includes(orderSelectMode)
    ) {
      return (
        <FunctionAreaNavBtn
          variant="contained"
          onClick={() => buttonHandler(changeMode[orderSelectMode], null)}
        >
          {btnName[orderSelectMode]}
        </FunctionAreaNavBtn>
      );
    }
    return null;
  };

  return <NavButton></NavButton>;
}

export default FunctionAreaNavButton;
