import {
  ROBOT_CONTROL_SCREEN,
  ROBOT_CONTROL_SCREEN_API_executeRobot,
  ROBOT_CONTROL_SCREEN_robotSetting,
  ROBOT_CONTROL_SCREEN_robotState,
} from "../constants";
import {
  basicSwal,
  confirmSwal,
  timerSwal,
} from "./swal/RobotControlScreenActionSwal";
import { Colors } from "../../styles/theme";
import axios from "axios";
import { domain } from "../../env";

export const orderlistSelectAction = (selectOrderObject) => (dispatch) => {
  dispatch({
    type: ROBOT_CONTROL_SCREEN.robotState,
    payload: { text: "已選擇工單" },
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
    dispatch({
      type: ROBOT_CONTROL_SCREEN.multipleOrderSelect,
      payload: { data: multipleOrderSelectObject },
    });

    dispatch({
      type: ROBOT_CONTROL_SCREEN.robotState,
      payload: { text: "已選擇工單" },
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
  (robotStateMode, robotExecutionData) => (dispatch) => {
    const { executeOrderId, name, queue } = robotExecutionData;
    if (executeOrderId.length === 0) {
      basicSwal("warning", "請選擇工單", "#a1887f");
      return;
    } else if (robotStateMode !== "inactivate") {
      basicSwal("warning", "手臂執行中", "#a1887f");
      return;
    } else {
      confirmSwal(
        "確定執行?",
        `${name.at(queue - 1)}`,
        "warning",
        "#a1887f"
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
              payload: { mode: "picture" },
            });

            dispatch({
              type: ROBOT_CONTROL_SCREEN_API_executeRobot.request,
            });

            axios
              .post(`${domain}/api/executeRobot/`, { orderId })
              .then((res) => {
                dispatch({
                  type: ROBOT_CONTROL_SCREEN_API_executeRobot.success,
                  payload: res.data,
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN.robotState,
                  payload: { mode: "inactivate", text: "已結束" },
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN.informationArea,
                  payload: { mode: "order" },
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN.realtimeRobot,
                  payload: { mode: null, count: null },
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN.realtimeVisual,
                  payload: { mode: null },
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
    }
  };

export const robotSettingAction = (mode, speed) => async (dispatch) => {
  dispatch({
    type: ROBOT_CONTROL_SCREEN_robotState.mode,
    payload: mode,
  });

  dispatch({
    type: ROBOT_CONTROL_SCREEN_robotSetting[mode],
  });

  try {
    dispatch({
      type: ROBOT_CONTROL_SCREEN_robotSetting.request,
    });

    const { data } = await axios.post(`${domain}/api/robotSetting/`, {
      mode,
      speed,
    });

    dispatch({
      type: ROBOT_CONTROL_SCREEN_robotSetting.success,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROBOT_CONTROL_SCREEN_robotSetting.fail,
      payload: error.message.data.error_msg,
    });
  }
};
