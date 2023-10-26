import {
  ROBOT_CONTROL_SCREEN_executeRobot,
  ROBOT_CONTROL_SCREEN_informationArea,
  ROBOT_CONTROL_SCREEN_orderList,
  ROBOT_CONTROL_SCREEN_realtimeData,
  ROBOT_CONTROL_SCREEN_realtimeRobot,
  ROBOT_CONTROL_SCREEN_realtimeVisual,
  ROBOT_CONTROL_SCREEN_robotSetting,
  ROBOT_CONTROL_SCREEN_robotState,
} from "../constants";

export const robotControlScreen_orderSelectReducer = (
  state = { detail: [] },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN_orderList.select:
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
};

export const robotControlScreen_informationAreaReducer = (
  state = { mode: "initial" },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN_informationArea.mode:
      return {
        ...state,
        mode: action.payload,
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

export const robotControlScreen_robotStateReducer = (
  state = {
    mode: "inactivate",
    text: "已選擇工單",
    data: [],
    pause: false,
    reset: false,
    speed: 50,
  },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN_robotState.mode:
      return {
        ...state,
        mode: action.payload,
      };

    case ROBOT_CONTROL_SCREEN_robotState.text:
      return {
        ...state,
        text: action.payload,
      };

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

export const robotControlScreen_realtimeRobotReducer = (
  state = { mode: null, count: null },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN_realtimeRobot.mode:
      return { ...state, mode: action.payload };

    case ROBOT_CONTROL_SCREEN_realtimeRobot.count:
      return { ...state, count: action.payload };

    default:
      return state;
  }
};

export const robotControlScreen_realtimeVisualReducer = (
  state = { mode: null },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN_realtimeVisual.mode:
      return { ...state, mode: action.payload };

    default:
      return state;
  }
};
