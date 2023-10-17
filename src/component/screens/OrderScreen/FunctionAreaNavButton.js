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
            AI training
          </FunctionAreaNavBtn>
        );
      } else if (aiTrainingState === "finish_training") {
        return (
          <FunctionAreaNavBtn
            variant="contained"
            onClick={() => buttonHandler("aiResult", null)}
          >
            AI result
          </FunctionAreaNavBtn>
        );
      }
    } else if (mode === "aiResult") {
      return (
        <FunctionAreaNavBtn
          variant="contained"
          onClick={() => buttonHandler("orderDetail", null)}
        >
          Order Detail
        </FunctionAreaNavBtn>
      );
    }
    return null;
  };

  return <NavButton></NavButton>;
}

export default FunctionAreaNavButton;
