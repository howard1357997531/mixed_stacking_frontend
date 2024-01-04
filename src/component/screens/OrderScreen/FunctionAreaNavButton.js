import React, { Fragment } from "react";
import { FunctionAreaNavBtn } from "../../../styles/OrderScreen";
import { useDispatch, useSelector } from "react-redux";
import { functionAreaNavButtonAction } from "../../../redux/actions/OrderScreenAction";
import { Colors } from "../../../styles/theme";
import { MultiOrderDeleteBtn } from "../../../styles/OrderScreen/FunctionAreaContentMultipleOrder";

function FunctionAreaNavButton({ orderSelectMode }) {
  const dispatch = useDispatch();
  const { orderId } = useSelector((state) => state.orderScreen_orderSelect);

  const { orderId: multiOrderId } = useSelector(
    (state) => state.multipleOrderList
  );

  const {
    aiTrainingState,
    combineOrder,
    editData,
    delete: deleteArray,
  } = useSelector((state) => state.orderScreen_orderSelect);

  const buttonHandler = (mode, aiTraining_state) => {
    if (mode === "orderDetail") {
      var orderSelectData = orderId;
    } else if (mode === "multipleOrder") {
      var orderSelectData = multiOrderId;
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
    },
    multipleOrderCreate: {
      name: "創建",
      bgColor: Colors.darkGreen,
    },
    edit: {
      name: "修改",
      bgColor: Colors.brown,
    },
    delete: {
      name: "刪除",
      bgColor: Colors.brown,
    },
  };

  return (
    <Fragment>
      {orderSelectMode === "orderDetail" &&
      aiTrainingState === "no_training" ? (
        <FunctionAreaNavBtn
          disableElevation
          variant="contained"
          colorData={Colors.purple}
          onClick={() => buttonHandler(orderSelectMode, "no_training")}
        >
          AI 演算
        </FunctionAreaNavBtn>
      ) : null}

      {orderSelectMode === "orderDetail" &&
      aiTrainingState === "finish_training" ? (
        <FunctionAreaNavBtn
          disableElevation
          variant="contained"
          colorData={Colors.grey600}
          onClick={() => buttonHandler(orderSelectMode, "finish_training")}
        >
          AI 結果
        </FunctionAreaNavBtn>
      ) : null}

      {orderSelectMode === "multipleOrder" ? (
        <MultiOrderDeleteBtn
          onClick={() => buttonHandler(orderSelectMode, null)}
        />
      ) : null}

      {["aiResult", "multipleOrderCreate", "edit", "delete"].includes(
        orderSelectMode
      ) ? (
        <FunctionAreaNavBtn
          disableElevation
          variant="contained"
          colorData={modeData[orderSelectMode]["bgColor"]}
          onClick={() => buttonHandler(orderSelectMode, null)}
        >
          {modeData[orderSelectMode]["name"]}
        </FunctionAreaNavBtn>
      ) : null}
    </Fragment>
  );
}

export default FunctionAreaNavButton;
