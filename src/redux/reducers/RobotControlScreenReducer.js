import {
  ROBOT_CONTROL_SCREEN_executeRobot,
  ROBOT_CONTROL_SCREEN_orderList,
  ROBOT_CONTROL_SCREEN_realtimeData,
  ROBOT_CONTROL_SCREEN_robotSetting,
} from "../constants";

export const robotControlScreen_orderSelectReducer = (
  state = { orderListId: null },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN_orderList.selectId:
      return {
        ...state,
        orderListId: action.payload,
      };

    default:
      return state;
  }
};

export const robotControlScreen_executeRobotReducer = (
  state = { data: [] },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN_executeRobot.request:
      return {
        loading: true,
        data: [],
      };

    case ROBOT_CONTROL_SCREEN_executeRobot.success:
      return {
        loading: false,
        success: true,
        data: action.patload,
      };

    case ROBOT_CONTROL_SCREEN_executeRobot.fail:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const robotControlScreen_robotSettingReducer = (
  state = { data: [], pause: false, reset: false, speed: 50 },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN_robotSetting.request:
      return {
        ...state,
        loading: true,
        data: [],
      };

    case ROBOT_CONTROL_SCREEN_robotSetting.success:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };

    case ROBOT_CONTROL_SCREEN_robotSetting.fail:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ROBOT_CONTROL_SCREEN_robotSetting.pause:
      return { ...state, pause: true };

    case ROBOT_CONTROL_SCREEN_robotSetting.unPause:
      return { ...state, pause: false };

    case ROBOT_CONTROL_SCREEN_robotSetting.reset:
      return { ...state, reset: true };

    case ROBOT_CONTROL_SCREEN_robotSetting.speedUp:
      return { ...state, speed: state.speed + 10 };

    case ROBOT_CONTROL_SCREEN_robotSetting.speedDown:
      return { ...state, speed: state.speed - 10 };

    default:
      return state;
  }
};

export const robotControlScreen_realtimeDataReducer = (
  state = { mode: null, count: null },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN_realtimeData.mode:
      return { ...state, mode: action.payload };

    case ROBOT_CONTROL_SCREEN_realtimeData.count:
      return { ...state, count: action.payload };

    default:
      return state;
  }
};
