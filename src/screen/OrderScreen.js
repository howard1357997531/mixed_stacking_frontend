import React, { useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import OrderDesktop from "../component/screens/OrderScreen/OrderDesktop";
import OrderMobile from "../component/screens/OrderScreen/OrderMobile";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_SCREEN, TOAST } from "../redux/constants";
import { InfoBtnToast, timerToast } from "../swal";

function OrderScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const { mode: orderSelectMode, orderId: orderSelectIdArray } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  const { data: multipleOrderListData } = useSelector(
    (state) => state.multipleOrderList
  );

  const propsData = {
    matches,
    orderSelectMode,
    orderSelectIdArray,
    multipleOrderListData,
  };

  const dispatch = useDispatch();

  const { aiTrainingToast, aiTrainingId } = useSelector((state) => state.toast);

  const btnClick = () => {
    return dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: {
        mode: "aiResult",
        orderId: aiTrainingId,
        aiTrainingState: "finish_training",
      },
    });
  };

  useEffect(() => {
    if (aiTrainingToast) {
      dispatch({
        type: TOAST.aiTraining,
        payload: { aiTrainingToast: false },
      });

      if (
        orderSelectMode === "orderDetail" &&
        aiTrainingId === orderSelectIdArray
      ) {
        timerToast("success", "工單演算完成");
        dispatch({
          type: ORDER_SCREEN.orderSelect,
          payload: { mode: "aiResult", aiTrainingState: "finish_training" },
        });
      } else if (orderSelectMode === "multipleOrderCreate") {
        timerToast("success", "工單演算完成");
      } else {
        InfoBtnToast("success", "工單演算完成", "查看", btnClick);
      }
    }
  }, [aiTrainingToast]);

  return (
    <>
      {matches ? (
        <OrderDesktop {...propsData} />
      ) : (
        <OrderMobile {...propsData} />
      )}
    </>
  );
}

export default OrderScreen;
