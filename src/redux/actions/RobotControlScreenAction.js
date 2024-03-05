import {
  DIALOG,
  MULTIPLE_ORDER_LIST,
  ORDER_LIST,
  ROBOT_CONTROL_SCREEN,
  ROBOT_CONTROL_SCREEN_API_executeRobot,
  ROBOT_CONTROL_SCREEN_API_robotSetting,
} from "../constants";
import { basicSwal, confirmSwal, confirmSwal2, timerSwal } from "../../swal";
import { Colors } from "../../styles/theme";
import { domain } from "../../env";
import axios from "axios";

export const orderlistSelectAction = (selectOrderObject) => (dispatch) => {
  dispatch({
    type: ROBOT_CONTROL_SCREEN.robotState,
    payload: { mode: "inactivate", text: "已選擇工單" },
  });

  dispatch({
    type: ROBOT_CONTROL_SCREEN.informationArea,
    payload: { mode: "order" },
  });

  dispatch({
    type: ROBOT_CONTROL_SCREEN.orderSelect,
    payload: { data: selectOrderObject },
  });

  dispatch({
    type: ROBOT_CONTROL_SCREEN.multipleOrderSelect,
    payload: { data: [] },
  });

  dispatch({
    type: ROBOT_CONTROL_SCREEN.robotExecutionList,
    payload: {
      executeOrderId: [selectOrderObject.id],
      executeOrderStr: [String(selectOrderObject.id)],
      name: [selectOrderObject.name],
      allData: [selectOrderObject],
    },
  });
};

const parseOrderId = (data) => {
  var output = [];
  const orderArray = data.orderSelectId_str.split(",");
  orderArray.forEach((order) => {
    const id = parseInt(order.split("*").at(0));
    const times = parseInt(order.split("*").at(1));
    if (order.includes("*")) {
      Array(times)
        .fill(id)
        .forEach((id) => output.push(id));
    } else {
      output.push(parseInt(id));
    }
  });
  return output;
};

const parseOrderIdStr = (data) => {
  var output = [];
  const orderArray = data.orderSelectId_str.split(",");
  orderArray.forEach((order) => {
    const id = parseInt(order.split("*").at(0));
    const times = parseInt(order.split("*").at(1));
    if (order.includes("*")) {
      Array(times)
        .fill(id)
        .forEach((id) => output.push(String(id)));
    } else {
      output.push(String(id));
    }
  });
  return output;
};

const parseOrderName = (data) => {
  var idToName = {};
  data.multipleOrder.forEach(
    (order) => (idToName[order.order.id] = order.order.name)
  );
  const nameArray = parseOrderId(data);
  return nameArray.map((order) => idToName[order]);
};

const parseAllData = (data) => {
  // var idToAllData = {};
  // data.multipleOrder.forEach(
  //   (order) => (idToAllData[order.order.id] = order.order)
  // );

  // const nameArray = parseOrderId(data);

  const output = data.multipleOrder.map((order) => order.order);

  // return nameArray.map((order) => idToAllData[order]);
  return output;
};

export const multipleOrderlistSelectAction =
  (multipleOrderSelectData) => (dispatch) => {
    dispatch({
      type: DIALOG.order,
      payload: { multiOrderId: multipleOrderSelectData.id },
    });

    dispatch({
      type: ROBOT_CONTROL_SCREEN.orderSelect,
      payload: { data: [] },
    });

    dispatch({
      type: ROBOT_CONTROL_SCREEN.multipleOrderSelect,
      payload: { data: multipleOrderSelectData },
    });

    dispatch({
      type: ROBOT_CONTROL_SCREEN.robotState,
      payload: { mode: "inactivate", text: "已選擇工單" },
    });

    dispatch({
      type: ROBOT_CONTROL_SCREEN.informationArea,
      payload: { mode: "multipleOrder" },
    });

    const executeOrderId = parseOrderId(multipleOrderSelectData);
    const executeOrderStr = parseOrderIdStr(multipleOrderSelectData);
    const name = parseOrderName(multipleOrderSelectData);
    const allData = parseAllData(multipleOrderSelectData);

    dispatch({
      type: ROBOT_CONTROL_SCREEN.robotExecutionList,
      payload: { executeOrderId, executeOrderStr, name, allData },
    });
  };

export const dialogOrderFilterAction =
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
          type: ROBOT_CONTROL_SCREEN.multipleOrderSelect,
          payload: { searchData: data },
        });
      } else {
        dispatch({ type: ORDER_LIST.filter.success });

        dispatch({
          type: ROBOT_CONTROL_SCREEN.orderSelect,
          payload: { searchData: data },
        });
      }
    } catch (error) {
      dispatch({ type: ORDER_LIST.filter.fail });
    }
  };

const replaceInsertName = (name) => {
  return name.endsWith("_insert") ? name.replace("_insert", "") : name;
};

export const executeRobotAction =
  (robotStateMode, robotExecutionData) => (dispatch) => {
    const { startTime, executeOrderId, name, allData, isDoing, resetIndex } =
      robotExecutionData;
    const executeLength = executeOrderId.length;
    const tempQueue = robotExecutionData.queue;

    if (!startTime) {
      const date = new Date();
      const monthTemp = parseInt(date.getMonth()) + 1;
      const month = monthTemp >= 10 ? monthTemp : `0${monthTemp}`;
      const day =
        parseInt(date.getDate()) >= 10 ? date.getDate() : `0${date.getDate()}`;
      const minute =
        parseInt(date.getMinutes()) >= 10
          ? date.getMinutes()
          : `0${date.getMinutes()}`;
      const dateInfo = `${date.getFullYear()}/${month}/${day} ${date.getHours()}:${minute}`;

      dispatch({
        type: ROBOT_CONTROL_SCREEN.robotExecutionList,
        payload: { startTime: dateInfo },
      });
    }

    // isDoing = True 代表不是第一次點這邊進來
    const queue = isDoing ? tempQueue + 1 : tempQueue;

    if (executeLength === 0) {
      basicSwal("warning", "請選擇工單");
      return;
    } else if (!["inactivate", "success", "reset"].includes(robotStateMode)) {
      basicSwal("warning", "手臂執行中");
      return;
    } else {
      const orderQueue =
        executeLength !== 1 ? `(${queue}/${executeLength})` : "";
      confirmSwal(
        "確定執行?",
        `${replaceInsertName(name.at(queue - 1))} ${orderQueue}`
      ).then((result) => {
        if (result.isConfirmed) {
          const orderId = executeOrderId.at(queue - 1);
          const [allDataTemp] = allData.filter((order) => order.id === orderId);
          try {
            dispatch({
              type: ROBOT_CONTROL_SCREEN.robotState,
              payload: { mode: "activate" },
            });

            dispatch({
              type: ROBOT_CONTROL_SCREEN.orderSelect,
              payload: { data: allDataTemp },
            });

            dispatch({
              type: ROBOT_CONTROL_SCREEN.informationArea,
              payload: { mode: "order" },
            });

            if (isDoing) {
              // 此單不是第一次從這進來, queue才會加1
              dispatch({
                type: ROBOT_CONTROL_SCREEN.robotExecutionList,
                payload: { queue },
              });
            } else {
              // 此單第一次從這進來
              dispatch({
                type: ROBOT_CONTROL_SCREEN.robotExecutionList,
                payload: { isDoing: true },
              });
            }

            dispatch({
              type: ROBOT_CONTROL_SCREEN_API_executeRobot.request,
            });

            axios
              .post(`${domain}/api/executeRobot/`, { orderId })
              .then((res) => {
                const state = res.data.robot_state;
                const is_success =
                  state === "finish"
                    ? "success"
                    : state === "reset"
                    ? "reset"
                    : "resetAll";

                dispatch({
                  type: ROBOT_CONTROL_SCREEN_API_executeRobot.success,
                  payload: res.data,
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN.informationArea,
                  payload: { mode: is_success },
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN.robotState_reset,
                  payload: is_success,
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN.realtimeItem,
                  payload: { mode: null, count: null },
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN.realtimeVisual,
                  payload: { mode: null, visualResult: [], visualCount: 1 },
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN.robotExecutionList,
                  payload: { check: true },
                });

                // 如果 reset
                if (state === "reset") {
                  const resetdata = [...resetIndex];
                  resetdata.push(queue - 1);
                  dispatch({
                    type: ROBOT_CONTROL_SCREEN.robotExecutionList,
                    payload: { resetIndex: resetdata },
                  });
                } else if (state === "reset_all") {
                  dispatch({
                    type: ROBOT_CONTROL_SCREEN.robotExecutionList_reset,
                  });
                }
              });
          } catch (error) {
            const err_msg = error.response.data.error_msg;
            dispatch({
              type: ROBOT_CONTROL_SCREEN.robotState_reset,
              payload: "reset",
            });

            dispatch({
              type: ROBOT_CONTROL_SCREEN_API_executeRobot.fail,
              payload: err_msg,
            });

            // 不管單或多單第一次進來都是 queue === 1
            if (queue === 1) {
              dispatch({
                type: ROBOT_CONTROL_SCREEN.robotExecutionList,
                payload: { isDoing: false },
              });
            }

            timerSwal("warning", err_msg, Colors.brownHover, 2000);
          }
        }
      });
    }
  };

export const robotSettingAction =
  (modeTemp, speed, resetAll = null) =>
  async (dispatch) => {
    const robotSettingData = {
      pause: { pause: true },
      unPause: { pause: false },
      reset: { reset: true },
      speedUp: { speed: speed + 10 },
      speedDown: { speed: speed - 10 },
    };

    dispatch({
      type: ROBOT_CONTROL_SCREEN.robotState,
      payload: robotSettingData[modeTemp],
    });

    const mode = resetAll ? "reset_all" : modeTemp;

    try {
      dispatch({
        type: ROBOT_CONTROL_SCREEN_API_robotSetting.request,
      });

      const { data } = await axios.post(`${domain}/api/robotSetting/`, {
        mode,
        speed,
      });

      dispatch({
        type: ROBOT_CONTROL_SCREEN_API_robotSetting.success,
        payload: data,
      });

      // dispatch({ type: ROBOT_CONTROL_SCREEN.robotState, payload: { mode } });
    } catch (error) {
      dispatch({
        type: ROBOT_CONTROL_SCREEN_API_robotSetting.fail,
        payload: error.message.data.error_msg,
      });
    }
  };

export const robotExecutionAlertAction = (robotExecutionData) => (dispatch) => {
  const { executeOrderId, name, allData, resetIndex } = robotExecutionData;
  const queue = robotExecutionData.queue + 1;

  confirmSwal(
    `確定執行?`,
    `${replaceInsertName(name.at(queue - 1))} (${queue}/${name.length})`
  ).then((result) => {
    if (result.isConfirmed) {
      const orderId = executeOrderId.at(queue - 1);
      const [allDataTemp] = allData.filter((order) => order.id === orderId);
      try {
        dispatch({
          type: ROBOT_CONTROL_SCREEN.robotState,
          payload: { mode: "activate" },
        });

        dispatch({
          type: ROBOT_CONTROL_SCREEN.orderSelect,
          payload: { data: allDataTemp },
        });

        dispatch({
          type: ROBOT_CONTROL_SCREEN.informationArea,
          payload: { mode: "order" },
        });

        dispatch({
          type: ROBOT_CONTROL_SCREEN.robotExecutionList,
          payload: { queue },
        });

        dispatch({
          type: ROBOT_CONTROL_SCREEN_API_executeRobot.request,
        });

        axios.post(`${domain}/api/executeRobot/`, { orderId }).then((res) => {
          const state = res.data.robot_state;
          const is_success = state === "finish" ? "success" : "reset";

          dispatch({
            type: ROBOT_CONTROL_SCREEN_API_executeRobot.success,
            payload: res.data,
          });

          dispatch({
            type: ROBOT_CONTROL_SCREEN.informationArea,
            payload: { mode: is_success },
          });

          dispatch({
            type: ROBOT_CONTROL_SCREEN.robotState_reset,
            payload: is_success,
          });

          dispatch({
            type: ROBOT_CONTROL_SCREEN.realtimeItem,
            payload: { mode: null, count: null },
          });

          dispatch({
            type: ROBOT_CONTROL_SCREEN.realtimeVisual,
            payload: { mode: null, visualResult: [], visualCount: 1 },
          });

          dispatch({
            type: ROBOT_CONTROL_SCREEN.robotExecutionList,
            payload: { check: true },
          });

          if (state === "reset") {
            const resetdata = [...resetIndex];
            resetdata.push(queue - 1);
            dispatch({
              type: ROBOT_CONTROL_SCREEN.robotExecutionList,
              payload: { resetIndex: resetdata },
            });
          } else if (state === "reset_all") {
            dispatch({
              type: ROBOT_CONTROL_SCREEN.robotExecutionList_reset,
            });
          }
        });
      } catch (error) {
        const err_msg = error.response.data.error_msg;

        dispatch({
          type: ROBOT_CONTROL_SCREEN.robotState_reset,
          payload: "reset",
        });

        dispatch({
          type: ROBOT_CONTROL_SCREEN_API_executeRobot.fail,
          payload: err_msg,
        });

        timerSwal("warning", err_msg, Colors.brownHover, 2000);
      }
    }
  });
};

export const executeRobotFinishAction =
  (robotExecutionData, executionListQueue = null) =>
  async (dispatch) => {
    try {
      const startTime = robotExecutionData.startTime;
      const executeOrderStr = robotExecutionData.executeOrderStr;
      const resetIndex = [...robotExecutionData.resetIndex];
      // 如果是第一單就全部中斷不會加入(為了如果一二單是連一起不會拆散)
      if (executionListQueue !== null && executionListQueue !== 0) {
        resetIndex.push(executionListQueue);
      }
      const resetAllIndex = executionListQueue;
      const { _ } = axios.post(`${domain}/api/executeRobotFinish/`, {
        startTime,
        executeOrderStr,
        resetIndex,
        resetAllIndex,
      });
    } catch (error) {}
    dispatch({
      type: ROBOT_CONTROL_SCREEN.orderSelect,
      payload: { data: [] },
    });

    dispatch({
      type: ROBOT_CONTROL_SCREEN.multipleOrderSelect,
      payload: { data: [] },
    });

    dispatch({
      type: ROBOT_CONTROL_SCREEN.robotExecutionList_reset,
    });
  };

// index不對
// export const hasNextExecutionOrderAction =
//   (robotExecutionData) => (dispatch) => {
//     dispatch({
//       type: ROBOT_CONTROL_SCREEN.orderSelect,
//       payload: {
//         data: robotExecutionData.allData[robotExecutionData.queue],
//       },
//     });
//   };

export const insertOrderAction = (insertIndex) => (dispatch) => {
  dispatch({
    type: ROBOT_CONTROL_SCREEN.robotExecutionList,
    payload: { insertIndex, insertOrderOpen: true },
  });
};

export const selectInsertOrderAction =
  (order, robotStateMode, robotExecutionData, insertCount) =>
  async (dispatch) => {
    const { insertIndex, queue } = robotExecutionData;
    // 不知為何不能直接使用 { executeOrderId } = robotExecutionData; 裡面的 executeOrderId
    // 去做 executeOrderId.splice(insertIndex, 0, order.id); 會error
    // 但是複製過後就可以 ...??
    const executeOrderId = [...robotExecutionData.executeOrderId];
    const executeOrderStr = [...robotExecutionData.executeOrderStr];
    const name = [...robotExecutionData.name];
    var allData = [...robotExecutionData.allData];
    const isInAllData = allData.filter((data) => data.id === order.id);

    if (isInAllData.length === 0) {
      allData.push(order);
    }

    for (let i = 0; i < insertCount; i++) {
      executeOrderId.splice(insertIndex, 0, order.id);
      executeOrderStr.splice(insertIndex, 0, String(order.id) + "_insert");
      name.splice(insertIndex, 0, order.name + "_insert");
    }

    // executeOrderId.splice(insertIndex, 0, order.id);
    // executeOrderStr.splice(insertIndex, 0, String(order.id) + "_insert");
    // name.splice(insertIndex, 0, order.name + "_insert");
    // allData.splice(insertIndex, 0, order);

    // 若是即刻差單的 order 會加到 orderSelect
    // 必須是在 robotStateMode === 'inactivate' 才會觸發
    if (robotStateMode === "inactivate") {
      if (insertIndex === queue) {
        dispatch({
          type: ROBOT_CONTROL_SCREEN.orderSelect,
          payload: { data: order },
        });
      }
    }

    dispatch({
      type: ROBOT_CONTROL_SCREEN.robotExecutionList,
      payload: {
        executeOrderId,
        executeOrderStr,
        name,
        allData,
        insertOrderOpen: false,
      },
    });

    // try {
    //   const { data } = await axios.post(`${domain}/api/executingOrder/`, {
    //     insertIndex,
    //     executeOrderId,
    //     name,
    //   });
    // } catch (error) {
    //   console.log(error.message.data.error_msg);
    // }
  };

export const deleteExecutionListAction =
  (index, deleteName, robotExecutionData) => (dispatch) => {
    const executeOrderId = [...robotExecutionData.executeOrderId];
    const executeOrderStr = [...robotExecutionData.executeOrderStr];
    const name = [...robotExecutionData.name];

    executeOrderId.splice(index, 1);
    executeOrderStr.splice(index, 1);
    name.splice(index, 1);

    confirmSwal("確定刪除?", deleteName).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: ROBOT_CONTROL_SCREEN.robotExecutionList,
          payload: { executeOrderId, executeOrderStr, name },
        });
      }
    });
  };

export const swiperChangeAction = (mode, CurrentIndex) => (dispatch) => {
  const swiperCurrentCount =
    mode === "prev" ? CurrentIndex - 1 : CurrentIndex + 1;

  dispatch({
    type: ROBOT_CONTROL_SCREEN.robotExecutionList,
    payload: { swiperCurrentCount },
  });
};
