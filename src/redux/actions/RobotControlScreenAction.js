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

export const multipleOrderlistSelectAction =
  (multipleOrderSelectObject) => (dispatch) => {
    const orderSelectData = multipleOrderSelectObject.multipleOrder.at(0).order;
    dispatch({
      type: ROBOT_CONTROL_SCREEN.orderSelect,
      payload: { data: orderSelectData },
    });

    dispatch({
      type: ROBOT_CONTROL_SCREEN.multipleOrderSelect,
      payload: { data: multipleOrderSelectObject },
    });

    dispatch({
      type: ROBOT_CONTROL_SCREEN.robotState,
      payload: { mode: "inactivate", text: "已選擇工單" },
    });

    dispatch({
      type: ROBOT_CONTROL_SCREEN.informationArea,
      payload: { mode: "multipleOrder" },
    });

    const executeOrderId = multipleOrderSelectObject.orderSelectId_str
      .split(",")
      .map((order) => parseInt(order));

    const name = multipleOrderSelectObject.multipleOrder.map(
      (order) => order.order.name
    );

    const allData = multipleOrderSelectObject.multipleOrder.map(
      (order) => order.order
    );

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
    const { executeOrderId, name, allData } = robotExecutionData;
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
                const mode = state === "finish" ? "inactivate" : "reset";
                const text = state === "finish" ? "已結束" : "已重置";
                const is_success = state === "finish" ? "success" : "reset";

                dispatch({
                  type: ROBOT_CONTROL_SCREEN_API_executeRobot.success,
                  payload: res.data,
                });

                if (executeLength > 1 && executeLength > queue) {
                  dispatch({
                    type: ROBOT_CONTROL_SCREEN.orderSelect,
                    payload: { data: allData[queue] },
                  });
                }

                dispatch({
                  type: ROBOT_CONTROL_SCREEN.informationArea,
                  payload: { mode: is_success },
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN.robotState,
                  payload: { mode, text, speed: 50 },
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN.realtimeItem,
                  payload: { mode: null, count: null },
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN.realtimeVisual,
                  payload: { mode: null, visualResult: [], visualCount: 1 },
                });

                // multipleOrder 只有兩單情況，executeLength = 2 會等於 queue + 1 = 2
                const robotExecutionCheck =
                  informationAreaMode === "multipleOrder"
                    ? { queue }
                    : executeLength > queue
                    ? { queue }
                    : {
                        isDoing: false,
                        executeOrderId: [],
                        name: [],
                        queue: 1,
                        allData: [],
                      };

                dispatch({
                  type: ROBOT_CONTROL_SCREEN.robotExecutionList,
                  payload: { check: true, ...robotExecutionCheck },
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
  if (["reset"].includes(mode)) {
    dispatch({
      type: ROBOT_CONTROL_SCREEN.robotState,
      payload: { mode, text: "已重置" },
    });
  }
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
  const { executeOrderId, name, allData } = robotExecutionData;
  const executeLength = executeOrderId.length;
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
          const mode = state === "finish" ? "inactivate" : "reset";
          const text = state === "finish" ? "已結束" : "已重置";
          const is_success = state === "finish" ? "success" : "reset";

          dispatch({
            type: ROBOT_CONTROL_SCREEN_API_executeRobot.success,
            payload: res.data,
          });

          if (executeLength > 1 && executeLength > queue) {
            dispatch({
              type: ROBOT_CONTROL_SCREEN.orderSelect,
              payload: { data: allData[queue] },
            });
          }

          dispatch({
            type: ROBOT_CONTROL_SCREEN.informationArea,
            payload: { mode: is_success },
          });

          dispatch({
            type: ROBOT_CONTROL_SCREEN.robotState,
            payload: { mode, text, speed: 50 },
          });

          dispatch({
            type: ROBOT_CONTROL_SCREEN.realtimeItem,
            payload: { mode: null, count: null },
          });

          dispatch({
            type: ROBOT_CONTROL_SCREEN.realtimeVisual,
            payload: { mode: null, visualResult: [], visualCount: 1 },
          });

          const robotExecutionCheck =
            executeOrderId.length > queue
              ? { queue }
              : {
                  isDoing: false,
                  executeOrderId: [],
                  name: [],
                  queue: 1,
                  allData: [],
                };

          dispatch({
            type: ROBOT_CONTROL_SCREEN.robotExecutionList,
            payload: { check: true, ...robotExecutionCheck },
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

export const insertOrderAction = (insertIndex) => (dispatch) => {
  dispatch({
    type: ROBOT_CONTROL_SCREEN.robotExecutionList,
    payload: { insertIndex, insertOrderOpen: true },
  });
};

export const selectInsertOrderAction =
  (order, robotExecutionData) => async (dispatch) => {
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
    if (insertIndex === queue) {
      dispatch({
        type: ROBOT_CONTROL_SCREEN.orderSelect,
        payload: { data: order },
      });
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
