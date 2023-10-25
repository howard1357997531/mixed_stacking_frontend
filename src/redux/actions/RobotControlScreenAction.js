import Swal from "sweetalert2";
import {
  ROBOT_CONTROL_SCREEN_executeRobot,
  ROBOT_CONTROL_SCREEN_informationArea,
  ROBOT_CONTROL_SCREEN_orderList,
  ROBOT_CONTROL_SCREEN_realtimeData,
  ROBOT_CONTROL_SCREEN_robotSetting,
  ROBOT_CONTROL_SCREEN_robotState,
} from "../constants";
import axios from "axios";
import { brown } from "@mui/material/colors";
import { domain } from "../../env";

export const orderlistSelectAction = (selectOrderList) => (dispatch) => {
  dispatch({
    type: ROBOT_CONTROL_SCREEN_orderList.select,
    payload: selectOrderList,
  });

  dispatch({
    type: ROBOT_CONTROL_SCREEN_informationArea.mode,
    payload: "order",
  });

  dispatch({
    type: ROBOT_CONTROL_SCREEN_robotState.text,
    payload: "已選擇工單",
  });
};

export const executeRobotAction =
  (robotStateMode, orderSelectDetail) => async (dispatch) => {
    if (orderSelectDetail.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "請選擇工單",
        background: "#a1887f",
      });
      return;
    }
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

      const { data } = await axios.post(`${domain}/api/executeRobot/`, {
        orderId,
      });

      dispatch({
        type: ROBOT_CONTROL_SCREEN_executeRobot.success,
        payload: data,
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
        type: ROBOT_CONTROL_SCREEN_realtimeData.mode,
        payload: null,
      });

      dispatch({
        type: ROBOT_CONTROL_SCREEN_realtimeData.count,
        payload: null,
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
