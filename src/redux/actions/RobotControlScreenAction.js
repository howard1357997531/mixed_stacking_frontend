import Swal from "sweetalert2";
import {
  ROBOT_CONTROL_SCREEN_executeRobot,
  ROBOT_CONTROL_SCREEN_informationArea,
  ROBOT_CONTROL_SCREEN_multipleOrderList,
  ROBOT_CONTROL_SCREEN_orderList,
  ROBOT_CONTROL_SCREEN_realtimeRobot,
  ROBOT_CONTROL_SCREEN_realtimeVisual,
  ROBOT_CONTROL_SCREEN_robotExecutionList,
  ROBOT_CONTROL_SCREEN_robotSetting,
  ROBOT_CONTROL_SCREEN_robotState,
} from "../constants";
import axios from "axios";
import { brown } from "@mui/material/colors";
import { domain } from "../../env";

export const orderlistSelectAction = (selectOrderObject) => (dispatch) => {
  dispatch({
    type: ROBOT_CONTROL_SCREEN_orderList.select,
    payload: selectOrderObject,
  });

  dispatch({
    type: ROBOT_CONTROL_SCREEN_informationArea.mode,
    payload: "order",
  });

  dispatch({
    type: ROBOT_CONTROL_SCREEN_robotState.text,
    payload: "已選擇工單",
  });

  dispatch({
    type: ROBOT_CONTROL_SCREEN_robotExecutionList.executeOrderId,
    payload: [selectOrderObject.id],
  });
};

export const multipleOrderlistSelectAction =
  (multipleOrderSelectObject) => (dispatch) => {
    dispatch({
      type: ROBOT_CONTROL_SCREEN_multipleOrderList.select,
      payload: multipleOrderSelectObject,
    });

    dispatch({
      type: ROBOT_CONTROL_SCREEN_orderList.select,
      payload: multipleOrderSelectObject.multipleOrder[0].order,
    });

    dispatch({
      type: ROBOT_CONTROL_SCREEN_informationArea.mode,
      payload: "multipleOrder",
    });

    dispatch({
      type: ROBOT_CONTROL_SCREEN_robotState.text,
      payload: "已選擇工單",
    });
  };

export const executeRobotAction =
  (robotStateMode, orderSelectDetail) => (dispatch) => {
    if (orderSelectDetail.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "請選擇工單",
        background: "#a1887f",
      });
      return;
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "確定",
        cancelButtonText: "返回",
      }).then((result) => {
        if (result.isConfirmed) {
          const orderId = orderSelectDetail.id;

          try {
            dispatch({
              type: ROBOT_CONTROL_SCREEN_robotState.mode,
              payload: "activate",
            });

            dispatch({
              type: ROBOT_CONTROL_SCREEN_informationArea.mode,
              payload: "picture",
            });

            dispatch({
              type: ROBOT_CONTROL_SCREEN_executeRobot.request,
            });

            axios
              .post(`${domain}/api/executeRobot/`, {
                orderId,
              })
              .then((res) => {
                dispatch({
                  type: ROBOT_CONTROL_SCREEN_executeRobot.success,
                  payload: res.data,
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN_robotState.mode,
                  payload: "inactivate",
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN_robotState.text,
                  payload: "已結束",
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN_informationArea.mode,
                  payload: "order",
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN_realtimeRobot.mode,
                  payload: null,
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN_realtimeRobot.count,
                  payload: null,
                });

                dispatch({
                  type: ROBOT_CONTROL_SCREEN_realtimeVisual.mode,
                  payload: null,
                });

                setTimeout(() => {
                  dispatch({
                    type: ROBOT_CONTROL_SCREEN_realtimeVisual.name,
                    payload: null,
                  });
                }, 1500);
              });
          } catch (error) {
            dispatch({
              type: ROBOT_CONTROL_SCREEN_executeRobot.fail,
              payload: error.response.data.error_msg,
            });

            Swal.fire({
              position: "center",
              width: "16em",
              icon: "warning",
              title: error.response.data.error_msg,
              background: brown[400],
              showConfirmButton: false,
              timer: 2000,
            });
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
