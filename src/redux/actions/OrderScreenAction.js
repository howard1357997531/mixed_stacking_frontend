import axios from "axios";
import {
  DIALOG,
  MULTIPLE_ORDER_LIST,
  ORDER_LIST,
  ORDER_SCREEN,
  TOAST,
} from "../constants";
import Swal from "sweetalert2";
import { domain } from "../../env";
import { Colors } from "../../styles/theme";
import { confirmSwal, infoBtnToast, infoToast, timerToast } from "../../swal";

export const orderlistSelectAction =
  (orderId, aiTrainingState) => (dispatch) => {
    dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: {
        mode: "orderDetail",
        orderId: orderId,
        aiTrainingState,
      },
    });
  };

export const orderEditSelectAction =
  (edit, orderListData, aiTraining_state) => (dispatch) => {
    if (aiTraining_state === "is_training") {
      timerToast("warning", "演算中，不能修改");
      return;
    }
    const [dataTemp] = orderListData.filter((order) => order.id === edit);
    const editData = dataTemp.orderItem.reduce((obj, item) => {
      obj[item.name] = item.quantity;
      return obj;
    }, {});
    editData["id"] = edit;
    editData["name"] = dataTemp.name;
    editData["aiTraining_state"] = dataTemp.aiTraining_state;
    dispatch({ type: ORDER_SCREEN.orderSelect, payload: { edit, editData } });
  };

export const orderEditChangeAction = (name, value, data) => (dispatch) => {
  const editData = { ...data };
  editData[name] = value;
  dispatch({
    type: ORDER_SCREEN.orderSelect,
    payload: { editData },
  });
};

export const orderDeleteSelectAction =
  (orderId, orderDelete, aiTraining_state) => (dispatch) => {
    if (aiTraining_state === "is_training") {
      timerToast("warning", "演算中，不能刪除");
      return;
    }
    if (orderDelete.includes(orderId)) {
      var deleteArray = orderDelete.filter((id) => id !== orderId);
    } else {
      var deleteArray = [...orderDelete, orderId];
    }

    dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: { delete: deleteArray },
    });
  };

export const orderDeleteAction = (orderId) => async (dispatch) => {
  const { data } = axios.post(`${domain}/api/deleteOrder/`, { orderId });
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
      // infoToast("error", "刪除中");
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
      type: ORDER_SCREEN.orderSelect,
      payload: { combineOrder },
    });
  };

export const multipleOrderCreateDeleteAction =
  (index, combineOrderTemp) => (dispatch) => {
    const combineOrder = [...combineOrderTemp];
    combineOrder.splice(index, 1);
    dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: { combineOrder },
    });
  };

// 寫如果不是在orderDetail 不會強制顯示ai結算畫面
export const aiTrainingAction =
  (orderId, aiTrainingState) => async (dispatch) => {
    dispatch({
      type: ORDER_LIST.beforeTraining,
      payload: { orderId, aiTrainingState },
    });

    dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: { aiTrainingState },
    });

    try {
      var { data } = await axios.post(`${domain}/api/aiTraining/`, {
        orderId,
      });

      dispatch({
        type: ORDER_LIST.afterTraining,
        payload: {
          orderId,
          data: data.aiResult_str,
          aiTrainingState: "finish_training",
        },
      });
      // 如果是在orderDetail和同id 才會跳轉aiResult
      // dispatch({
      //   type: ORDER_SCREEN.afterTrainingCheck,
      //   payload: { orderId },
      // });

      dispatch({
        type: TOAST.aiTraining,
        payload: { aiTrainingToast: true, aiTrainingId: orderId },
      });
    } catch (error) {
      timerToast("error", "演算失敗");

      dispatch({
        type: ORDER_LIST.beforeTraining,
        payload: { orderId, aiTrainingState: "no_training" },
      });

      dispatch({
        type: ORDER_SCREEN.orderSelect,
        payload: { aiTrainingState: "no_training" },
      });
    }
  };

export const functionAreaModeAction =
  (mode, multipleOrderListData) => (dispatch) => {
    // dispatch({ type: ORDER_SCREEN.orderSelect, payload: { orderId: null } });

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
  (mode, orderSelectData, aiTrainingState) => (dispatch) => {
    if (mode === "orderDetail" && aiTrainingState === "no_training") {
      confirmSwal("執行 AI 演算?").then((result) => {
        if (result.isConfirmed) {
          dispatch(aiTrainingAction(orderSelectData, "is_training"));
        }
      });
    }

    if (mode === "orderDetail" && aiTrainingState === "finish_training") {
      dispatch({
        type: ORDER_SCREEN.orderSelect,
        payload: { mode: "aiResult" },
      });
    }

    if (mode === "aiResult") {
      dispatch({
        type: ORDER_SCREEN.orderSelect,
        payload: { mode: "orderDetail" },
      });
    }

    if (mode === "multipleOrder") {
      dispatch({
        type: ORDER_SCREEN.orderSelect,
        payload: { mode: "multipleOrderCreate" },
      });
    }

    if (mode === "multipleOrderCreate") {
      if (orderSelectData.length === 0) {
        timerToast("warning", "尚未選擇工單");
        return;
      } else {
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
            timerToast("success", "建立成功");

            dispatch({
              type: ORDER_SCREEN.orderSelect,
              payload: { mode: "multipleOrder", combineOrder: [] },
            });
          }
        });
      }
    }

    if (mode === "edit") {
      if (!orderSelectData) {
        timerToast("info", "尚未選擇工單");
        return;
      }
      confirmSwal("確定修改?").then((result) => {
        if (result.isConfirmed) {
          infoToast("warning", "修改中");
          try {
            axios
              .post(`${domain}/api/editOrder/`, { orderSelectData })
              .then((res) => {
                Swal.close();
                timerToast("success", "修改成功");
                dispatch({ type: ORDER_LIST.edit, payload: orderSelectData });
              });
          } catch (error) {}
        }
      });
    }

    if (mode === "delete") {
      if (orderSelectData.length === 0) {
        timerToast("info", "尚未選擇工單");
        return;
      }
      confirmSwal("確定刪除?").then((result) => {
        if (result.isConfirmed) {
          infoToast("error", "刪除中");
          try {
            axios
              .post(`${domain}/api/deleteOrder/`, { orderSelectData })
              .then((res) => {
                Swal.close();
                dispatch({
                  type: ORDER_SCREEN.orderSelect,
                  payload: { delete: [] },
                });
                dispatch({ type: ORDER_LIST.delete, payload: orderSelectData });
                timerToast("success", "刪除成功");
              });
          } catch (error) {}
        }
      });
    }
  };
