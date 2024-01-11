import React, { Fragment } from "react";
import { FunctionAreaNavBtn } from "../../../styles/OrderScreen";
import { useDispatch, useSelector } from "react-redux";
import { functionAreaNavButtonAction } from "../../../redux/actions/OrderScreenAction";
import { Colors } from "../../../styles/theme";
import { MultiOrderDeleteBtn } from "../../../styles/OrderScreen/FunctionAreaContentMultipleOrder";

function FunctionAreaNavButton({ orderSelectMode }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.orderList);
  const { orderId, aiTrainingState, combineOrder, deleteIdArray } = useSelector(
    (state) => state.orderScreen_orderSelect
  );
  const { orderId: multiOrderId } = useSelector(
    (state) => state.multipleOrderList
  );

  const loadingNotShow =
    loading && !["multipleOrderCreate", "delete"].includes(orderSelectMode);

  const buttonHandler = (mode, aiTraining_state) => {
    if (mode === "orderDetail") {
      var orderSelectData = orderId;
    } else if (mode === "multipleOrder") {
      var orderSelectData = multiOrderId;
    } else if (mode === "multipleOrderCreate") {
      var orderSelectData = combineOrder;
    } else if (mode === "delete") {
      var orderSelectData = deleteIdArray.map((order) =>
        parseInt(Object.keys(order).at(0))
      );
    }
    dispatch(
      functionAreaNavButtonAction(mode, orderSelectData, aiTraining_state)
    );
  };

  return loadingNotShow ? null : (
    <Fragment>
      {orderSelectMode === "orderDetail" &&
      aiTrainingState === "no_training" &&
      orderId ? (
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
      aiTrainingState === "finish_training" &&
      orderId ? (
        <FunctionAreaNavBtn
          disableElevation
          variant="contained"
          colorData={Colors.grey600}
          onClick={() => buttonHandler(orderSelectMode, "finish_training")}
        >
          AI 結果
        </FunctionAreaNavBtn>
      ) : null}

      {orderSelectMode === "multipleOrder" && multiOrderId ? (
        <MultiOrderDeleteBtn
          onClick={() => buttonHandler(orderSelectMode, null)}
        />
      ) : null}

      {orderSelectMode === "delete" && deleteIdArray.length !== 0 ? (
        <MultiOrderDeleteBtn
          onClick={() => buttonHandler(orderSelectMode, null)}
        />
      ) : null}

      {orderSelectMode === "aiResult" ? (
        <FunctionAreaNavBtn
          disableElevation
          variant="contained"
          colorData={Colors.grey600}
          onClick={() => buttonHandler(orderSelectMode, null)}
        >
          清單
        </FunctionAreaNavBtn>
      ) : null}

      {orderSelectMode === "multipleOrderCreate" &&
      combineOrder.length !== 0 ? (
        <FunctionAreaNavBtn
          disableElevation
          variant="contained"
          colorData={Colors.darkGreen}
          onClick={() => buttonHandler(orderSelectMode, null)}
        >
          創建
        </FunctionAreaNavBtn>
      ) : null}
    </Fragment>
  );
}

export default FunctionAreaNavButton;
