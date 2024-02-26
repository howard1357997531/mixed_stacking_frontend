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
import { confirmSwal, infoToast, timerToast } from "../../swal";
import { orderListAction } from "./OrderActions";

export const orderlistSelectAction =
  (orderId, name, aiTrainingState) => (dispatch) => {
    dispatch({ type: ORDER_LIST.revise, payload: { name } });

    dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: {
        mode: "orderDetail",
        orderId: orderId,
        aiTrainingState,
      },
    });
  };

export const orderlistFilterAction =
  (state, value, mode) => async (dispatch) => {
    try {
      if (mode === "multipleOrder") {
        dispatch({ type: MULTIPLE_ORDER_LIST.filter.request });
      } else {
        dispatch({ type: ORDER_LIST.filter.request });
      }

      const { data } = await axios.get(
        `${domain}/api/filterOrderData?state=${state}&value=${value}&mode=${mode}`
      );

      if (mode === "multipleOrder") {
        dispatch({ type: MULTIPLE_ORDER_LIST.filter.success });

        dispatch({
          type: ORDER_SCREEN.orderSelect,
          payload: { multiOrderSearch: data },
        });
      } else {
        dispatch({ type: ORDER_LIST.filter.success });

        dispatch({
          type: ORDER_SCREEN.orderSelect,
          payload: { orderSearch: data },
        });
      }

      if (data.length !== 0) {
        if (mode === "close") {
          dispatch({
            type: ORDER_SCREEN.orderSelect,
            payload: { orderId: null },
          });
        } else if (["orderDetail", "aiResult"].includes(mode)) {
          dispatch({
            type: ORDER_LIST.revise,
            payload: { name: data.at(0).name },
          });
          dispatch({
            type: ORDER_SCREEN.orderSelect,
            payload: { orderId: data.at(0).id },
          });
        } else if (mode === "edit") {
          dispatch({
            type: ORDER_SCREEN.orderSelect,
            payload: { editId: null, editData: null },
          });
        } else if (mode === "delete") {
        } else if (mode === "multipleOrder") {
          dispatch({
            type: MULTIPLE_ORDER_LIST.revise,
            payload: { orderId: data.at(0).id, name: data.at(0).name },
          });

          dispatch({
            type: DIALOG.order,
            payload: { multiOrderId: data.at(0).id },
          });
        }
      }
    } catch (error) {
      dispatch({ type: ORDER_LIST.filter.fail });
    }
  };

export const removeFilterAction = (mode, data) => (dispatch) => {
  if (mode === "multipleOrder") {
    dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: { multiOrderSearch: null },
    });
  } else {
    dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: { orderSearch: null },
    });
  }

  if (data.length !== 0) {
    if (mode === "close") {
      dispatch({
        type: ORDER_SCREEN.orderSelect,
        payload: { orderId: null },
      });
    } else if (["orderDetail", "aiResult"].includes(mode)) {
      dispatch({
        type: ORDER_LIST.revise,
        payload: { name: data.at(0).name },
      });
      dispatch({
        type: ORDER_SCREEN.orderSelect,
        payload: { orderId: data.at(0).id },
      });
    } else if (mode === "edit") {
      dispatch({
        type: ORDER_SCREEN.orderSelect,
        payload: { editId: null, editData: null },
      });
    } else if (mode === "delete") {
    } else if (mode === "multipleOrder") {
      dispatch({
        type: MULTIPLE_ORDER_LIST.revise,
        payload: { orderId: data.at(0).id, name: data.at(0).name },
      });

      dispatch({
        type: DIALOG.order,
        payload: { multiOrderId: data.at(0).id },
      });
    }
  }
};

export const orderEditSelectAction =
  (editId, orderListData, aiTraining_state = null) =>
  (dispatch) => {
    if (aiTraining_state === "is_training") {
      timerToast("warning", "演算中，不能修改");
      return;
    }
    const [dataTemp] = orderListData.filter((order) => order.id === editId);
    const editData = dataTemp.orderItem.reduce((obj, item) => {
      obj[item.name] = item.quantity;
      return obj;
    }, {});
    editData["id"] = editId;
    editData["name"] = dataTemp.name;
    editData["aiTraining_state"] = dataTemp.aiTraining_state;
    dispatch({ type: ORDER_LIST.revise, payload: { name: dataTemp.name } });
    dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: { orderId: editId, editId, editData },
    });
  };

export const orderEditChangeAction = (name, value, data) => (dispatch) => {
  const editData = { ...data };
  editData[name] = value;
  dispatch({
    type: ORDER_SCREEN.orderSelect,
    payload: { editData },
  });
};

function deepEqual(obj1, obj2) {
  // 检查对象引用是否相同
  if (obj1 === obj2) {
    return true;
  }

  // 检查对象类型是否相同
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  // 获取对象的属性名称
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // 检查属性数量是否相同
  if (keys1.length !== keys2.length) {
    return false;
  }

  // 递归比较每个属性的值
  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  // 如果所有属性都相等，则对象相等
  return true;
}

export const orderEditAction =
  (editData, title, allData) => async (dispatch) => {
    if (editData.name === title && deepEqual(allData, editData)) {
      return timerToast("info", "尚未改變內容");
    }

    const tempData = { ...allData };
    delete tempData.id;
    delete tempData.name;
    delete tempData.aiTraining_state;

    for (let key in tempData) {
      if (tempData[key] === "" && title === "")
        return timerToast("info", "名稱、數量不能空白");
      if (tempData[key] === "") return timerToast("info", "數量不能空白");
      if (tempData[key] < 0) return timerToast("info", "數量不能為負數");
      if (!Number.isInteger(tempData[key]))
        return timerToast("info", "數量不能為小數");
    }

    if (title === "") return timerToast("info", "名稱不能空白");

    var orderData = { ...allData };
    orderData["name"] = title;
    orderData["count_change"] = !deepEqual(allData, editData);

    if (
      editData.aiTraining_state === "finish_training" &&
      !deepEqual(allData, editData)
    ) {
      confirmSwal(
        "此工單已演算過",
        `已演算工單是不能被修改"貨物數量"的(但名稱可以改)，而目前已自動偵測到您想修改貨物的數量，如果要修改(已演算工單的任意貨物的數量)，系統會自動生成剛剛您想修改的新工單，然後必須去重新演算~`
      ).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(`${domain}/api/editOrder/`, {
              orderData,
            })
            .then((res) => {
              const data = res.data;
              dispatch({
                type: ORDER_LIST.finishTrainingEdit,
                payload: data.allData,
              });

              dispatch({
                type: ORDER_LIST.edit,
                payload: { allData: data.editData },
              });

              dispatch({
                type: ORDER_SCREEN.finishTrainingEdit,
                payload: editData.name,
              });
            });
        } else return;
      });
      return;
    }

    const { data } = await axios.post(`${domain}/api/editOrder/`, {
      orderData,
    });
    timerToast("success", "修改成功");

    dispatch({
      type: ORDER_LIST.edit,
      payload: { allData: data.allData },
    });

    dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: { editData: data.editData },
    });
  };

export const orderDeleteSelectAction =
  (selectId, name = null, aiTraining_state = null) =>
  (dispatch) => {
    if (aiTraining_state === "is_training") {
      timerToast("warning", "演算中，不能刪除");
      return;
    }
    dispatch({
      type: ORDER_SCREEN.selectDelete,
      payload: { selectId, name, check: false },
    });
  };

export const orderDeleteAction = (orderId) => async (dispatch) => {
  const { data } = axios.post(`${domain}/api/deleteOrder/`, { orderId });
};

export const multipleOrderListSelectAction =
  (multiOrderId, name) => (dispatch) => {
    dispatch({
      type: MULTIPLE_ORDER_LIST.revise,
      payload: { orderId: multiOrderId, name },
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

export const multipleOrderCreateAction = (orderId, name) => (dispatch) => {
  dispatch({
    type: ORDER_SCREEN.multiOrderCreateSelectData,
    payload: { orderId, name },
  });
};

export const multipleOrderCreateInputChangeAction =
  (index, times, combineOrderTemp) => (dispatch) => {
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
  (index, combineOrderTemp, combineOrderNameTemp) => (dispatch) => {
    const combineOrder = [...combineOrderTemp];
    const combineOrderName = [...combineOrderNameTemp];
    combineOrder.splice(index, 1);
    combineOrderName.splice(index, 1);
    dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: {
        combineOrder,
        combineOrderName,
        // -------------
        combineOrderFocusIndex: null,
      },
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
      payload: { aiTrainingState, isTraining: true },
    });

    try {
      var { data } = await axios.post(`${domain}/api/aiTraining/`, {
        orderId,
      });

      dispatch({
        type: ORDER_SCREEN.orderSelect,
        payload: { isTraining: false },
      });

      dispatch({
        type: ORDER_LIST.afterTraining,
        payload: {
          orderId,
          aiTrainingOrder: data.aiResult_str,
          aiLayerOrder: data.aiLayer_order,
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
        payload: { aiTrainingState: "no_training", isTraining: false },
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

    // if (mode === "multipleOrder") {
    //   dispatch({
    //     type: MULTIPLE_ORDER_LIST.orderId,
    //     payload: multipleOrderListData[0].id,
    //   });
    //   const multiOrderId = multipleOrderListData[0].id;
    //   dispatch({ type: DIALOG.order, payload: { multiOrderId } });
    // }
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
      confirmSwal("確定刪除?").then((result) => {
        if (result.isConfirmed) {
          // infoToast("error", "刪除中");
          try {
            axios
              .post(`${domain}/api/deleteMultipleOrder/`, {
                orderId: orderSelectData,
              })
              .then(() => {
                dispatch({
                  type: MULTIPLE_ORDER_LIST.deleteData,
                  payload: orderSelectData,
                });
                timerToast("success", "已刪除");
              });
          } catch (error) {
            console.log(error.response.data.error_msg);
          }
        }
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
          background: "#757575",
          color: "#fff",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "送出",
          cancelButtonText: "返回",
          cancelButtonColor: Colors.greyText,
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

              dispatch({
                type: ORDER_SCREEN.orderSelect,
                payload: { combineOrderFocusIndex: 0 },
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
                  payload: {
                    orderId: null,
                    editId: null,
                    editData: null,
                    deleteIdArray: [],
                  },
                });
                dispatch({ type: ORDER_LIST.delete, payload: orderSelectData });
                timerToast("success", "刪除成功");
              });
          } catch (error) {}
        }
      });
    }
  };
