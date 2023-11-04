import {
  ROBOT_CONTROL_SCREEN,
  ROBOT_CONTROL_SCREEN_API_executeRobot,
  ROBOT_CONTROL_SCREEN_informationArea,
  ROBOT_CONTROL_SCREEN_multipleOrderList,
  ROBOT_CONTROL_SCREEN_orderList,
  ROBOT_CONTROL_SCREEN_realtimeRobot,
  ROBOT_CONTROL_SCREEN_realtimeVisual,
  ROBOT_CONTROL_SCREEN_robotSetting,
  ROBOT_CONTROL_SCREEN_robotState,
} from "../constants";

export const robotControlScreen_orderSelectReducer = (
  state = { data: [] },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN.orderSelect:
      return { ...state, ...action.payload };
    case ROBOT_CONTROL_SCREEN_orderList.select:
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
};

export const robotControlScreen_multipleOrderSelectReducer = (
  state = { data: [] },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN.multipleOrderSelect:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export const robotControlScreen_informationAreaReducer = (
  state = { mode: "initial", multipleOrderId: null },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN.informationArea:
      return { ...state, ...action.payload };
    case ROBOT_CONTROL_SCREEN_informationArea.mode:
      return {
        ...state,
        mode: action.payload,
      };

    case ROBOT_CONTROL_SCREEN_informationArea.multipleOrderId:
      return {
        ...state,
        multipleOrderId: action.payload,
      };

    default:
      return state;
  }
};

export const robotControlScreen_API_executeRobotReducer = (
  state = { data: [] },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN_API_executeRobot.request:
      return {
        loading: true,
        data: [],
      };

    case ROBOT_CONTROL_SCREEN_API_executeRobot.success:
      return {
        loading: false,
        success: true,
        data: action.patload,
      };

    case ROBOT_CONTROL_SCREEN_API_executeRobot.fail:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const robotControlScreen_robotExecutionListReducer = (
  state = { executeOrderId: [], name: [], queue: 1 },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN.robotExecutionList:
      return { ...state, ...action.payload };

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
    case ROBOT_CONTROL_SCREEN.robotState:
      return { ...state, ...action.payload };
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
    case ROBOT_CONTROL_SCREEN.realtimeRobot:
      return { ...state, ...action.payload };
    case ROBOT_CONTROL_SCREEN_realtimeRobot.mode:
      return { ...state, mode: action.payload };

    case ROBOT_CONTROL_SCREEN_realtimeRobot.count:
      return { ...state, count: action.payload };

    default:
      return state;
  }
};

export const robotControlScreen_realtimeVisualReducer = (
  state = { mode: null, name: null, nextName: null },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN.realtimeVisual:
      return { ...state, ...action.payload };
    case ROBOT_CONTROL_SCREEN_realtimeVisual.mode:
      return { ...state, mode: action.payload };

    case ROBOT_CONTROL_SCREEN_realtimeVisual.name:
      return { ...state, name: action.payload };

    case ROBOT_CONTROL_SCREEN_realtimeVisual.nextName:
      return { ...state, nextName: action.payload };

    default:
      return state;
  }
};
