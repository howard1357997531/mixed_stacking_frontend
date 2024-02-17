import React, { Fragment } from "react";
import {
  FunctionAreaNavBtn,
  OrderListNavBtn,
  OrderListNavBtnBox,
  OrderListNavBtnText,
  OrderListNavRowBtn,
} from "../../../styles/OrderScreen";
import { useDispatch, useSelector } from "react-redux";
import { functionAreaNavButtonAction } from "../../../redux/actions/OrderScreenAction";
import { Colors } from "../../../styles/theme";
import { MultiOrderDeleteBtn } from "../../../styles/OrderScreen/FunctionAreaContentMultipleOrder";
import { ORDER_SCREEN } from "../../../redux/constants";

function FunctionAreaNavButton({ orderSelectMode }) {
  const dispatch = useDispatch();
  const { orderId, aiTrainingState, combineOrder, deleteIdArray } = useSelector(
    (state) => state.orderScreen_orderSelect
  );
  const { orderId: multiOrderId } = useSelector(
    (state) => state.multipleOrderList
  );

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

  const orderDeleteResetHandler = () => {
    dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: { deleteIdArray: [] },
    });
  };

  const multiCreateResetHandler = () => {
    dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: {
        combineOrder: [],
        combineOrderName: [],
        combineOrderFocusIndex: 0, // 要歸0,因為預設是會fouce第一個
      },
    });
  };

  return (
    <OrderListNavBtnBox noPadding={["orderDetail"].includes(orderSelectMode)}>
      {orderSelectMode === "orderDetail" &&
      aiTrainingState === "no_training" &&
      orderId ? (
        <OrderListNavRowBtn
          onClick={() => buttonHandler(orderSelectMode, "no_training")}
        >
          AI 演算
        </OrderListNavRowBtn>
      ) : null}

      {orderSelectMode === "orderDetail" &&
      aiTrainingState === "finish_training" &&
      orderId ? (
        <OrderListNavBtn
          sx={{ marginLeft: "5px", marginRight: 0 }}
          onClick={() => buttonHandler(orderSelectMode, "finish_training")}
        >
          <img
            style={{ width: "28px", height: "20px" }}
            src={"aiResult.png"}
            alt={"aiResult.png"}
          />
          <OrderListNavBtnText sx={{ color: Colors.blue500, fontSize: 14 }}>
            演算結果
          </OrderListNavBtnText>
        </OrderListNavBtn>
      ) : null}

      {orderSelectMode === "aiResult" ? (
        <Fragment>
          <OrderListNavBtn
            sx={{ marginLeft: "5px", marginRight: 0 }}
            onClick={() => buttonHandler(orderSelectMode, null)}
          >
            <img
              style={{ width: "20px", height: "20px" }}
              src={"orderList.png"}
              alt={"orderList.png"}
            />
            <OrderListNavBtnText sx={{ color: Colors.blue500 }}>
              清單
            </OrderListNavBtnText>
          </OrderListNavBtn>
        </Fragment>
      ) : null}

      {orderSelectMode === "delete" && deleteIdArray.length !== 0 ? (
        <Fragment>
          <OrderListNavBtn onClick={orderDeleteResetHandler}>
            <img
              style={{ width: "20px", height: "20px" }}
              src={"reset.png"}
              alt={"reset.png"}
            />
            <OrderListNavBtnText
              sx={{ color: orderSelectMode === "edit" && "#FF494B" }}
            >
              重置
            </OrderListNavBtnText>
          </OrderListNavBtn>{" "}
          <OrderListNavBtn
            sx={{ marginLeft: "5px", marginRight: 0 }}
            onClick={() => buttonHandler(orderSelectMode, null)}
          >
            <img
              style={{ width: "20px", height: "20px" }}
              src={"ok.png"}
              alt={"ok.png"}
            />
            <OrderListNavBtnText
              sx={{ color: orderSelectMode === "edit" && "#FF494B" }}
            >
              確認刪除
            </OrderListNavBtnText>
          </OrderListNavBtn>
        </Fragment>
      ) : null}

      {orderSelectMode === "multipleOrder" && multiOrderId ? (
        // <MultiOrderDeleteBtn
        //   onClick={() => buttonHandler(orderSelectMode, null)}
        // />
        <OrderListNavBtn
          sx={{ marginLeft: "5px", marginRight: 0 }}
          onClick={() => buttonHandler(orderSelectMode, null)}
        >
          <img
            style={{ width: "20px", height: "20px" }}
            src={"ok.png"}
            alt={"ok.png"}
          />
          <OrderListNavBtnText
            sx={{ color: orderSelectMode === "edit" && "#FF494B" }}
          >
            確認刪除
          </OrderListNavBtnText>
        </OrderListNavBtn>
      ) : null}

      {orderSelectMode === "multipleOrderCreate" &&
      combineOrder.length !== 0 ? (
        <Fragment>
          <OrderListNavBtn onClick={multiCreateResetHandler}>
            <img
              style={{ width: "20px", height: "20px" }}
              src={"reset.png"}
              alt={"reset.png"}
            />
            <OrderListNavBtnText
              sx={{ color: orderSelectMode === "edit" && "#FF494B" }}
            >
              重置
            </OrderListNavBtnText>
          </OrderListNavBtn>{" "}
          <OrderListNavBtn
            sx={{ marginLeft: "5px", marginRight: 0 }}
            onClick={() => buttonHandler(orderSelectMode, null)}
          >
            <img
              style={{ width: "20px", height: "20px" }}
              src={"ok.png"}
              alt={"ok.png"}
            />
            <OrderListNavBtnText
              sx={{ color: orderSelectMode === "edit" && "#FF494B" }}
            >
              確認創建
            </OrderListNavBtnText>
          </OrderListNavBtn>
        </Fragment>
      ) : null}
    </OrderListNavBtnBox>
  );
}

export default FunctionAreaNavButton;
