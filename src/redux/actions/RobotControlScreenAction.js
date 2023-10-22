import Swal from "sweetalert2";
import {
  ROBOT_CONTROL_SCREEN_executeRobot,
  ROBOT_CONTROL_SCREEN_realtimeData,
  ROBOT_CONTROL_SCREEN_robotSetting,
} from "../constants";
import axios from "axios";
import { brown } from "@mui/material/colors";

export const executeRobotAction = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: ROBOT_CONTROL_SCREEN_executeRobot.request,
    });

    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/executeRobot/",
      { orderId }
    );

    dispatch({
      type: ROBOT_CONTROL_SCREEN_executeRobot.success,
      payload: data,
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
  dispatch({ type: ROBOT_CONTROL_SCREEN_robotSetting[mode] });

  try {
    dispatch({
      type: ROBOT_CONTROL_SCREEN_robotSetting.request,
    });

    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/robotSetting/",
      {
        mode,
        speed,
      }
    );

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
