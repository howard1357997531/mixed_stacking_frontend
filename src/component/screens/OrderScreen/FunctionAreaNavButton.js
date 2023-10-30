import React from "react";
import { FunctionAreaNavBtn } from "../../../styles/OrderScreen";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_SCREEN_orderList } from "../../../redux/constants";
import {
  aiTrainingAction,
  functionAreaNavButtonAction,
} from "../../../redux/actions/OrderScreenAction";

function FunctionAreaNavButton({ orderSelectMode, orderSelectId }) {
  const dispatch = useDispatch();

  const { aiTrainingState } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  const buttonHandler = (mode, aiTraining_state) => {
    dispatch(
      functionAreaNavButtonAction(mode, orderSelectId, aiTraining_state)
    );
    // dispatch({
    //   type: ORDER_SCREEN_orderList.mode,
    //   payload: mode,
    // });

    // if (aiTraining_state === "is_training") {
    //   dispatch(aiTrainingAction(orderSelectId, aiTraining_state));
    // }
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
    } else if (orderSelectMode === "aiResult") {
      return (
        <FunctionAreaNavBtn
          variant="contained"
          onClick={() => buttonHandler("orderDetail", null)}
        >
          清單
        </FunctionAreaNavBtn>
      );
    } else if (orderSelectMode === "multipleOrder") {
      return (
        <FunctionAreaNavBtn
          variant="contained"
          onClick={() => buttonHandler("multipleOrder", null)}
        >
          建立
        </FunctionAreaNavBtn>
      );
    } else if (orderSelectMode === "edit") {
      return (
        <FunctionAreaNavBtn
          variant="contained"
          onClick={() => buttonHandler("edit", null)}
        >
          清單
        </FunctionAreaNavBtn>
      );
    } else if (orderSelectMode === "delete") {
      return (
        <FunctionAreaNavBtn
          variant="contained"
          onClick={() => buttonHandler("delete", null)}
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
