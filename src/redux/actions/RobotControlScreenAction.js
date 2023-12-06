import {
  ROBOT_CONTROL_SCREEN,
  ROBOT_CONTROL_SCREEN_API_executeRobot,
  ROBOT_CONTROL_SCREEN_API_robotSetting,
} from "../constants";
import {
  basicSwal,
  confirmSwal,
  confirmSwal2,
  timerSwal,
} from "./swal/RobotControlScreenActionSwal";
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
    type: ROBOT_CONTROL_SCREEN.robotExecutionList,
    payload: {
      executeOrderId: [selectOrderObject.id],
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

const parseOrderName = (data) => {
  var idToName = {};
  data.multipleOrder.forEach(
    (order) => (idToName[order.order.id] = order.order.name)
  );
  const nameArray = parseOrderId(data);
  return nameArray.map((order) => idToName[order]);
};

const parseAllData = (data) => {
  var idToAllData = {};
  data.multipleOrder.forEach(
    (order) => (idToAllData[order.order.id] = order.order)
  );
  const nameArray = parseOrderId(data);
  return nameArray.map((order) => idToAllData[order]);
};

export const multipleOrderlistSelectAction =
  (multipleOrderSelectData) => (dispatch) => {
    console.log(multipleOrderSelectData);
    const orderSelectData = multipleOrderSelectData.multipleOrder.at(0).order;
    dispatch({
      type: ROBOT_CONTROL_SCREEN.orderSelect,
      payload: { data: orderSelectData },
    });

    dispatch({
      type: ROBOT_CONTROL_SCREEN.multipleOrderSelect,
      payload: { name: multipleOrderSelectData.name },
    });

    dispatch({
      type: ROBOT_CONTROL_SCREEN.robotState,
      payload: { mode: "inactivate", text: "已選擇工單" },
    });

    dispatch({
      type: ROBOT_CONTROL_SCREEN.informationArea,
      payload: { mode: "multipleOrder" },
    });

    // const executeOrderId = multipleOrderSelectData.orderSelectId_str
    //   .split(",")
    //   .map((order) => parseInt(order));

    // const name = multipleOrderSelectData.multipleOrder.map(
    //   (order) => order.order.name
    // );
    // const allData = multipleOrderSelectData.multipleOrder.map(
    //   (order) => order.order
    // );

    const executeOrderId = parseOrderId(multipleOrderSelectData);
    const name = parseOrderName(multipleOrderSelectData);
    const allData = parseAllData(multipleOrderSelectData);

    dispatch({
      type: ROBOT_CONTROL_SCREEN.robotExecutionList,
      payload: { executeOrderId, name, allData },
    });
  };

const replaceInsertName = (name) => {
  return name.endsWith("_insert") ? name.replace("_insert", "") : name;
};

export const executeRobotAction =
  (robotStateMode, informationAreaMode, robotExecutionData) => (dispatch) => {
    const { executeOrderId, name } = robotExecutionData;
    const executeLength = executeOrderId.length;
    const tempQueue = robotExecutionData.queue;

    if (informationAreaMode === "multipleOrder") {
      var queue = tempQueue;
    } else {
      var queue = executeLength === 1 ? tempQueue : tempQueue + 1;
    }

    if (executeLength === 0) {
      basicSwal("warning", "請選擇工單", "#a1887f");
      return;
    } else if (robotStateMode !== "inactivate") {
      basicSwal("warning", "手臂執行中", "#a1887f");
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
          try {
            dispatch({
              type: ROBOT_CONTROL_SCREEN.robotState,
              payload: { mode: "activate" },
            });

            dispatch({
              type: ROBOT_CONTROL_SCREEN.informationArea,
              payload: { mode: "order" },
            });

            dispatch({
              type: ROBOT_CONTROL_SCREEN.robotExecutionList,
              payload: { isDoing: true },
            });

            // 此單不是第一次從這進來
            if (
              informationAreaMode !== "multipleOrder" &&
              executeLength !== 1
            ) {
              dispatch({
                type: ROBOT_CONTROL_SCREEN.robotExecutionList,
                payload: { queue: tempQueue + 1 },
              });
            }

            dispatch({
              type: ROBOT_CONTROL_SCREEN_API_executeRobot.request,
            });

            axios
              .post(`${domain}/api/executeRobot/`, { orderId })
              .then((res) => {
                const state = res.data.robot_state;
                const is_finish = state === "finish" ? "success" : "reset";

                dispatch({
                  type: ROBOT_CONTROL_SCREEN_API_executeRobot.success,
                  payload: res.data,
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN.informationArea,
                  payload: { mode: is_finish },
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN.robotState_reset,
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
              });
          } catch (error) {
            const err_msg = error.response.data.error_msg;
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

export const robotSettingAction = (mode, speed) => async (dispatch) => {
  const robotSettingData = {
    pause: { pause: true },
    unPause: { pause: false },
    reset: { reset: true },
    speedUp: { speed: speed + 10 },
    speedDown: { speed: speed - 10 },
  };

  dispatch({
    type: ROBOT_CONTROL_SCREEN.robotState,
    payload: robotSettingData[mode],
  });

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
  } catch (error) {
    dispatch({
      type: ROBOT_CONTROL_SCREEN_API_robotSetting.fail,
      payload: error.message.data.error_msg,
    });
  }
};

export const robotExecutionAlertAction = (robotExecutionData) => (dispatch) => {
  const { executeOrderId, name } = robotExecutionData;
  const queue = robotExecutionData.queue + 1;

  confirmSwal2(
    `確定執行?`,
    `${replaceInsertName(name.at(queue - 1))} (${queue}/${name.length})`
  ).then((result) => {
    if (result.isConfirmed) {
      const orderId = executeOrderId.at(queue - 1);
      try {
        dispatch({
          type: ROBOT_CONTROL_SCREEN.robotState,
          payload: { mode: "activate" },
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
          const is_finish = state === "finish" ? "success" : "reset";

          dispatch({
            type: ROBOT_CONTROL_SCREEN_API_executeRobot.success,
            payload: res.data,
          });

          dispatch({
            type: ROBOT_CONTROL_SCREEN.informationArea,
            payload: { mode: is_finish },
          });

          dispatch({
            type: ROBOT_CONTROL_SCREEN.robotState_reset,
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
        });
      } catch (error) {
        const err_msg = error.response.data.error_msg;
        dispatch({
          type: ROBOT_CONTROL_SCREEN_API_executeRobot.fail,
          payload: err_msg,
        });

        timerSwal("warning", err_msg, Colors.brownHover, 2000);
      }
    }
  });
};

// index不對
export const hasNextExecutionOrderAction =
  (robotExecutionData) => (dispatch) => {
    dispatch({
      type: ROBOT_CONTROL_SCREEN.orderSelect,
      payload: {
        data: robotExecutionData.allData[robotExecutionData.queue],
      },
    });
  };

export const insertOrderAction = (insertIndex) => (dispatch) => {
  dispatch({
    type: ROBOT_CONTROL_SCREEN.robotExecutionList,
    payload: { insertIndex, insertOrderOpen: true },
  });
};

export const selectInsertOrderAction =
  (order, robotStateMode, robotExecutionData) => async (dispatch) => {
    const { insertIndex, queue } = robotExecutionData;
    // 不知為何不能直接使用 { executeOrderId } = robotExecutionData; 裡面的 executeOrderId
    // 去做 executeOrderId.splice(insertIndex, 0, order.id); 會error
    // 但是複製過後就可以 ...??
    const executeOrderId = [...robotExecutionData.executeOrderId];
    const name = [...robotExecutionData.name];
    const allData = [...robotExecutionData.allData];

    executeOrderId.splice(insertIndex, 0, order.id);
    name.splice(insertIndex, 0, order.name + "_insert");
    allData.splice(insertIndex, 0, order);

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
      payload: { executeOrderId, name, allData, insertOrderOpen: false },
    });

    try {
      const { data } = await axios.post(`${domain}/api/executingOrder/`, {
        insertIndex,
        executeOrderId,
        name,
      });
    } catch (error) {
      console.log(error.message.data.error_msg);
    }
  };

export const deleteExecutionListAction =
  (index, deleteName, robotExecutionData) => (dispatch) => {
    const executeOrderId = [...robotExecutionData.executeOrderId];
    const name = [...robotExecutionData.name];
    const allData = [...robotExecutionData.allData];

    executeOrderId.splice(index, 1);
    name.splice(index, 1);
    allData.splice(index, 1);

    confirmSwal("確定刪除?", deleteName).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: ROBOT_CONTROL_SCREEN.robotExecutionList,
          payload: { executeOrderId, name, allData },
        });
      }
    });
    console.log(executeOrderId);
    console.log(name);
    console.log(allData);
  };

export const swiperChangeAction = (mode, CurrentIndex) => (dispatch) => {
  const swiperCurrentCount =
    mode === "prev" ? CurrentIndex - 1 : CurrentIndex + 1;

  dispatch({
    type: ROBOT_CONTROL_SCREEN.robotExecutionList,
    payload: { swiperCurrentCount },
  });
};
