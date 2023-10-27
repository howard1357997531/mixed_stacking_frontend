import React from "react";
import { FunctionAreaNavBtn } from "../../../styles/OrderScreen";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_SCREEN_orderList } from "../../../redux/constants";
import { aiTrainingAction } from "../../../redux/actions/OrderScreenAction";

function FunctionAreaNavButton() {
  const dispatch = useDispatch();
  const { mode, orderId, aiTrainingState } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  const buttonHandler = (mode, aiTraining_state) => {
    dispatch({
      type: ORDER_SCREEN_orderList.mode,
      payload: mode,
    });

    if (aiTraining_state === "is_training") {
      dispatch(aiTrainingAction(orderId, aiTraining_state));
    }
  };

  const NavButton = () => {
    if (mode === "orderDetail") {
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
    } else if (mode === "aiResult") {
      return (
        <FunctionAreaNavBtn
          variant="contained"
          onClick={() => buttonHandler("orderDetail", null)}
        >
          清單
        </FunctionAreaNavBtn>
      );
    } else if (mode === "multipleOrder") {
      return (
        <FunctionAreaNavBtn
          variant="contained"
          onClick={() => buttonHandler("orderDetail", null)}
        >
          清單
        </FunctionAreaNavBtn>
      );
    } else if (mode === "edit") {
      return (
        <FunctionAreaNavBtn
          variant="contained"
          onClick={() => buttonHandler("orderDetail", null)}
        >
          清單
        </FunctionAreaNavBtn>
      );
    } else if (mode === "delete") {
      return (
        <FunctionAreaNavBtn
          variant="contained"
          onClick={() => buttonHandler("orderDetail", null)}
        >
          清單
        </FunctionAreaNavBtn>
      );
    }
    return null;
  };

  return <NavButton></NavButton>;
}

export default FunctionAreaNavButton;
