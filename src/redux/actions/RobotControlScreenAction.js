import {
  ROBOT_CONTROL_SCREEN,
  ROBOT_CONTROL_SCREEN_API_executeRobot,
  ROBOT_CONTROL_SCREEN_API_robotSetting,
} from "../constants";
import {
  basicSwal,
  confirmSwal,
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

    const name = multipleOrderSelectObject.multipleOrder.map((order) => {
      return order.order.name;
    });

    dispatch({
      type: ROBOT_CONTROL_SCREEN.robotExecutionList,
      payload: { executeOrderId, name },
    });
  };

export const executeRobotAction =
  (robotStateMode, multipleOrderSelectData, robotExecutionData) =>
  (dispatch) => {
    const { executeOrderId, name, queue } = robotExecutionData;
    const executeLength = executeOrderId.length;
    if (executeLength === 0) {
      basicSwal("warning", "請選擇工單", "#a1887f");
      return;
    } else if (robotStateMode !== "inactivate") {
      basicSwal("warning", "手臂執行中", "#a1887f");
      return;
    } else {
      const orderQueue =
        executeLength !== 1 ? `(${queue}/${executeLength})` : "";
      confirmSwal("確定執行?", `${name.at(queue - 1)} ${orderQueue}`).then(
        (result) => {
          if (result.isConfirmed) {
            const orderId = executeOrderId.at(queue - 1);
            try {
              if (multipleOrderSelectData.length !== 0 && queue !== 1) {
                dispatch({
                  type: ROBOT_CONTROL_SCREEN.robotExecutionList,
                  payload: { swiperCurrentCount: queue },
                });
              }

              dispatch({
                type: ROBOT_CONTROL_SCREEN.robotState,
                payload: { mode: "activate" },
              });

              dispatch({
                type: ROBOT_CONTROL_SCREEN.informationArea,
                payload: { mode: "picture" },
              });

              dispatch({
                type: ROBOT_CONTROL_SCREEN_API_executeRobot.request,
              });

              axios
                .post(`${domain}/api/executeRobot/`, { orderId })
                .then((res) => {
                  const state = res.data.robot_state;
                  const mode = state === "finish" ? "inactivate" : "reset";
                  const text = state === "finish" ? "已結束" : "已重置";

                  dispatch({
                    type: ROBOT_CONTROL_SCREEN_API_executeRobot.success,
                    payload: res.data,
                  });

                  if (multipleOrderSelectData.length !== 0 && queue !== 1) {
                    const [orderSelectData] =
                      multipleOrderSelectData.multipleOrder.filter(
                        (order) => order.order.id === executeOrderId.at(queue)
                      );
                    dispatch({
                      type: ROBOT_CONTROL_SCREEN.orderSelect,
                      payload: orderSelectData,
                    });
                  }

                  dispatch({
                    type: ROBOT_CONTROL_SCREEN.informationArea,
                    payload: { mode: "success" },
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
                    payload: { mode: null },
                  });

                  const robotExecutionCheck =
                    executeLength > queue
                      ? { queue: queue + 1 }
                      : {
                          executeOrderId: [],
                          name: [],
                          queue: 1,
                          swiperCurrentCount: 1,
                        };

                  dispatch({
                    type: ROBOT_CONTROL_SCREEN.robotExecutionList,
                    payload: robotExecutionCheck,
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
        }
      );
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

export const robotExecutionAlertAction =
  (multipleOrderSelectData, robotExecutionData) => (dispatch) => {
    const { executeOrderId, name, queue } = robotExecutionData;
    confirmSwal(
      `確定執行?`,
      `${name.at(queue - 1)} (${queue}/${name.length})`
    ).then((result) => {
      if (result.isConfirmed) {
        const orderId = executeOrderId.at(queue - 1);
        try {
          if (multipleOrderSelectData.length !== 0) {
            const [orderSelectData] =
              multipleOrderSelectData.multipleOrder.filter(
                (order) => order.order.id === executeOrderId.at(queue - 1)
              );
            dispatch({
              type: ROBOT_CONTROL_SCREEN.orderSelect,
              payload: { data: orderSelectData.order },
            });

            dispatch({
              type: ROBOT_CONTROL_SCREEN.robotExecutionList,
              payload: { swiperCurrentCount: queue },
            });
          }

          dispatch({
            type: ROBOT_CONTROL_SCREEN.robotState,
            payload: { mode: "activate" },
          });

          dispatch({
            type: ROBOT_CONTROL_SCREEN.informationArea,
            payload: { mode: "picture" },
          });

          dispatch({
            type: ROBOT_CONTROL_SCREEN_API_executeRobot.request,
          });

          axios.post(`${domain}/api/executeRobot/`, { orderId }).then((res) => {
            const state = res.data.robot_state;
            const mode = state === "finish" ? "inactivate" : "reset";
            const text = state === "finish" ? "已結束" : "已重置";

            dispatch({
              type: ROBOT_CONTROL_SCREEN_API_executeRobot.success,
              payload: res.data,
            });

            dispatch({
              type: ROBOT_CONTROL_SCREEN.informationArea,
              payload: { mode: "success" },
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
              payload: { mode: null },
            });

            const robotExecutionCheck =
              executeOrderId.length > queue
                ? { queue: queue + 1 }
                : {
                    executeOrderId: [],
                    name: [],
                    queue: 1,
                    swiperCurrentCount: 1,
                  };

            dispatch({
              type: ROBOT_CONTROL_SCREEN.robotExecutionList,
              payload: robotExecutionCheck,
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

export const insertOrderAction = (index) => (dispatch) => {
  dispatch({
    type: ROBOT_CONTROL_SCREEN.robotExecutionList,
    payload: { insertOrderOpen: true },
  });
  console.log(index);
};

export const swiperChangeAction = (mode, CurrentIndex) => (dispatch) => {
  const swiperCurrentCount =
    mode === "prev" ? CurrentIndex - 1 : CurrentIndex + 1;

  dispatch({
    type: ROBOT_CONTROL_SCREEN.robotExecutionList,
    payload: { swiperCurrentCount },
  });
};
