import React from "react";
import { FunctionAreaNavBtn } from "../../../styles/OrderScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  aiTrainingAction,
  functionAreaNavButtonAction,
} from "../../../redux/actions/OrderScreenAction";
import { Colors } from "../../../styles/theme";
import { blueGrey } from "@mui/material/colors";

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

  const modeData = {
    aiResult: {
      name: "清單",
      changeMode: "orderDetail",
      bgColor: Colors.brownHover,
      bgColorHover: Colors.brown500,
    },
    multipleOrder: {
      name: "建立",
      changeMode: "multipleOrderCreate",
      bgColor: Colors.grey600,
      bgColorHover: Colors.greyText,
    },
    multipleOrderCreate: {
      name: "創建",
      changeMode: "multipleOrder",
      bgColor: Colors.darkGreen,
      bgColorHover: Colors.darkGreenHover,
    },
    edit: {
      name: "修改",
      changeMode: "edit",
      bgColor: Colors.brown,
      bgColorHover: Colors.brownHover,
    },
    delete: {
      name: "刪除",
      changeMode: "delete",
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
            colorData={[Colors.purple, Colors.purple400]}
            onClick={() => buttonHandler("orderDetail", "is_training")}
          >
            AI 演算
          </FunctionAreaNavBtn>
        );
      } else if (aiTrainingState === "finish_training") {
        return (
          <FunctionAreaNavBtn
            disableElevation
            variant="contained"
            colorData={[blueGrey[400], blueGrey[500]]}
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
          disableElevation
          variant="contained"
          colorData={[
            modeData[orderSelectMode]["bgColor"],
            modeData[orderSelectMode]["bgColorHover"],
          ]}
          onClick={() =>
            buttonHandler(modeData[orderSelectMode]["changeMode"], null)
          }
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
