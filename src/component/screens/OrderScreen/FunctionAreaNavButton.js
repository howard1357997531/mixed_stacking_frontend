import React from "react";
import {
  FunctionAreaNavBtn,
  FunctionAreaNavIsTraining,
} from "../../../styles/OrderScreen";
import { useDispatch, useSelector } from "react-redux";
import { functionAreaNavButtonAction } from "../../../redux/actions/OrderScreenAction";
import { Colors } from "../../../styles/theme";
import { blueGrey } from "@mui/material/colors";

function FunctionAreaNavButton({ orderSelectMode }) {
  const dispatch = useDispatch();
  const { orderId } = useSelector((state) => state.orderScreen_orderSelect);

  const {
    aiTrainingState,
    combineOrder,
    editData,
    delete: deleteArray,
  } = useSelector((state) => state.orderScreen_orderSelect);

  const buttonHandler = (mode, aiTraining_state) => {
    if (mode === "orderDetail") {
      var orderSelectData = orderId;
    } else if (mode === "multipleOrderCreate") {
      var orderSelectData = combineOrder;
    } else if (mode === "edit") {
      var orderSelectData = editData;
    } else if (mode === "delete") {
      var orderSelectData = deleteArray;
    }
    dispatch(
      functionAreaNavButtonAction(mode, orderSelectData, aiTraining_state)
    );
  };

  const modeData = {
    aiResult: {
      name: "清單",
      bgColor: Colors.grey600,
      bgColorHover: Colors.grey600,
    },
    multipleOrder: {
      name: "建立",
      bgColor: Colors.grey600,
      bgColorHover: Colors.grey600,
    },
    multipleOrderCreate: {
      name: "創建",
      bgColor: Colors.darkGreen,
      bgColorHover: Colors.darkGreenHover,
    },
    edit: {
      name: "修改",
      bgColor: Colors.brown,
      bgColorHover: Colors.brownHover,
    },
    delete: {
      name: "刪除",
      bgColor: Colors.brown,
      bgColorHover: Colors.brownHover,
    },
  };

  const NavButton = () => {
    if (orderSelectMode === "orderDetail") {
      if (aiTrainingState === "no_training") {
        return (
          <FunctionAreaNavBtn
            disableElevation
            variant="contained"
            colorData={Colors.purple}
            onClick={() => buttonHandler(orderSelectMode, "no_training")}
          >
            AI 演算
          </FunctionAreaNavBtn>
        );
      } else if (aiTrainingState === "finish_training") {
        return (
          <FunctionAreaNavBtn
            disableElevation
            variant="contained"
            colorData={Colors.grey600}
            onClick={() => buttonHandler(orderSelectMode, "finish_training")}
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
          disableElevation
          variant="contained"
          colorData={modeData[orderSelectMode]["bgColor"]}
          onClick={() => buttonHandler(orderSelectMode, null)}
        >
          {modeData[orderSelectMode]["name"]}
        </FunctionAreaNavBtn>
      );
    }
    return null;
  };

  return <NavButton></NavButton>;
}

export default FunctionAreaNavButton;
