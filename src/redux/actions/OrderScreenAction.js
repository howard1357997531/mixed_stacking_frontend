import axios from "axios";
import {
  DIALOG,
  MULTIPLE_ORDER_LIST,
  ORDER_LIST,
  ORDER_SCREEN,
  ORDER_SCREEN_orderList,
} from "../constants";
import Swal from "sweetalert2";
import { brown } from "@mui/material/colors";
import { domain } from "../../env";
import { Colors } from "../../styles/theme";
import { confirmSwal } from "../../swal";

export const orderlistSelectAction =
  (orderId, aiTrainingState) => (dispatch) => {
    dispatch({
      type: ORDER_SCREEN.orderSelectData,
      payload: {
        mode: "orderDetail",
        orderId: orderId,
        aiTrainingState,
      },
    });
  };

export const multipleOrderListSelectAction = (multiOrderId) => (dispatch) => {
  dispatch({
    type: MULTIPLE_ORDER_LIST.orderId,
    payload: multiOrderId,
  });

  dispatch({ type: DIALOG.order, payload: { multiOrderId } });
};

export const multipleOrderDeleteAction = (orderId) => (dispatch) => {
  confirmSwal("確定刪除?").then((result) => {
    if (result.isConfirmed) {
      try {
        axios
          .post(`${domain}/api/deleteMultipleOrder/`, {
            orderId,
          })
          .then(() => {
            dispatch({
              type: MULTIPLE_ORDER_LIST.deleteData,
              payload: orderId,
            });
          });
      } catch (error) {
        console.log(error.response.data.error_msg);
      }
    }
  });
};

export const multipleOrderCreateAction = (orderId) => (dispatch) => {
  dispatch({
    type: ORDER_SCREEN.multiOrderCreateSelectData,
    payload: orderId,
  });
};

export const multipleOrderCreateInputChangeAction =
  (index, times, combineOrderTemp) => (dispatch) => {
    // console.log(inedx, times, combineOrder);
    const orderTemp = [...combineOrderTemp].at(index).split("*");
    if (times === "1") {
      orderTemp.splice(1, 1);
    } else {
      orderTemp.splice(1, 1, "*", times);
    }

    const combineOrder = [...combineOrderTemp];
    combineOrder.splice(index, 1, orderTemp.join(""));
    dispatch({
      type: ORDER_SCREEN.orderSelectData,
      payload: { combineOrder },
    });
  };

export const multipleOrderCreateDeleteAction =
  (index, combineOrderTemp) => (dispatch) => {
    const combineOrder = [...combineOrderTemp];
    combineOrder.splice(index, 1);
    dispatch({
      type: ORDER_SCREEN.orderSelectData,
      payload: { combineOrder },
    });
  };

// 寫如果不是在orderDetail 不會強制顯示ai結算畫面
export const aiTrainingAction =
  (orderId, aiTrainingState) => async (dispatch) => {
    dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: { aiTrainingState },
    });

    dispatch({
      type: ORDER_LIST.aiTrainingStateChange,
      payload: { orderId, aiTrainingState },
    });

    try {
      var { data } = await axios.post(`${domain}/api/aiTraining/`, {
        orderId,
      });

      dispatch({
        type: ORDER_LIST.aiTrainingOrderAdd,
        payload: { orderId, data: data.aiResult_str },
      });

      dispatch({
        type: ORDER_LIST.aiTrainingStateChange,
        payload: { orderId, aiTrainingState: "finish_training" },
      });

      dispatch({
        type: ORDER_SCREEN.orderSelect,
        payload: { aiTrainingState: "finish_training" },
      });
      // dispatch({
      //   type: ORDER_SCREEN_orderList.aiTrainingState,
      //   payload: "finish_training",
      // });

      // dispatch({
      //   type: ORDER_SCREEN_orderList.aiCurrentData,
      //   payload: data.aiResult_str,
      // });

      // 如果是在orderDetail 才會顯示aiResult,但還要檢查是不是在同id頁面
      dispatch({
        type: ORDER_SCREEN_orderList.currentPageCheck,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        width: "16em",
        icon: "warning",
        title: "AI 演算失敗",
        background: brown[400],
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        axios
          .post(`${domain}/api/aiTraining/`, {
            orderId,
            mode: "error",
          })
          .then(() => {
            // window.location.reload();
            return;
          });
      });
    }
  };

export const functionAreaModeAction =
  (mode, multipleOrderListData) => (dispatch) => {
    dispatch({ type: ORDER_SCREEN.orderSelect_reset });

    if (mode === "multipleOrder" && multipleOrderListData.length === 0) {
      dispatch({
        type: ORDER_SCREEN.orderSelect,
        payload: { mode: "noMultipleOrder" },
      });
      return;
    }
    dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: { mode: mode === "orderDetail" ? "close" : mode },
    });

    if (mode === "multipleOrder") {
      dispatch({
        type: MULTIPLE_ORDER_LIST.orderId,
        payload: multipleOrderListData[0].id,
      });
      const multiOrderId = multipleOrderListData[0].id;
      dispatch({ type: DIALOG.order, payload: { multiOrderId } });
    }
  };

export const functionAreaNavButtonAction =
  (changeMode, orderSelectData, aiTrainingState) => (dispatch) => {
    if (changeMode !== "multipleOrder") {
      dispatch({
        type: ORDER_SCREEN.orderSelect,
        payload: { mode: changeMode },
      });
    } else {
      // 組合單建立
      if (orderSelectData.length === 0) {
        Swal.fire({
          position: "center",
          width: "16em",
          icon: "warning",
          title: "尚未選擇工單",
          background: Colors.brown,
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
    }

    if (aiTrainingState === "no_training") {
      confirmSwal("執行 AI 演算?").then((result) => {
        if (result.isConfirmed) {
          dispatch(aiTrainingAction(orderSelectData, "is_training"));
        }
      });
    }

    if (changeMode === "multipleOrder") {
      Swal.fire({
        title: "請輸入組合單名稱",
        input: "text",
        background: Colors.darkGreen,
        // color: "#fff",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "送出",
        cancelButtonText: "返回",
        showLoaderOnConfirm: true,
        preConfirm: async (inputText) => {
          if (inputText === "") {
            return Swal.showValidationMessage(`請輸入名稱`);
          }
          try {
            const { data } = await axios.post(
              `${domain}/api/createMultipleOrder/`,
              { orderSelectData, inputText }
            );

            dispatch({
              type: MULTIPLE_ORDER_LIST.addData,
              payload: data,
            });
          } catch (error) {
            Swal.showValidationMessage(`${error.response.data.error_msg}`);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: "center",
            width: "16em",
            icon: "success",
            title: "建立成功",
            background: Colors.darkGreen,
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            dispatch({
              type: ORDER_SCREEN.orderSelect,
              payload: { mode: changeMode },
            });

            dispatch({ type: ORDER_SCREEN.orderSelect_reset });
          });
        }
      });
    }
  };
