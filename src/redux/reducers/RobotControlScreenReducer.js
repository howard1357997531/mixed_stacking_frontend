import {
  ROBOT_CONTROL_SCREEN,
  ROBOT_CONTROL_SCREEN_API_executeRobot,
  ROBOT_CONTROL_SCREEN_API_robotSetting,
  ROBOT_CONTROL_SCREEN_orderList,
  ROBOT_CONTROL_SCREEN_realtimeRobot,
  ROBOT_CONTROL_SCREEN_realtimeVisual,
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
  state = { name: "" },
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
  state = { mode: "initial", multipleOrderSelectId: null },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN.informationArea:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export const robotControlScreen_robotExecutionListReducer = (
  state = {
    check: false,
    isDoing: false,
    executeOrderId: [],
    name: [],
    queue: 1,
    allData: [],
    insertIndex: null,
    insertOrderOpen: false,
    insertOrderDetailOpen: false,
    insertOrderDetailId: null,
  },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN.robotExecutionList:
      return { ...state, ...action.payload };

    case ROBOT_CONTROL_SCREEN.robotExecutionList_reset:
      return {
        check: false,
        isDoing: false,
        executeOrderId: [],
        name: [],
        queue: 1,
        allData: [],
        insertIndex: null,
        insertOrderOpen: false,
        insertOrderDetailOpen: false,
        insertOrderDetailId: null,
      };

    default:
      return state;
  }
};

export const robotControlScreen_robotStateReducer = (
  state = {
    mode: "inactivate",
    text: "尚未選擇工單",
    pause: false,
    reset: false,
    speed: 20,
  },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN.robotState:
      return { ...state, ...action.payload };

    case ROBOT_CONTROL_SCREEN.robotState_reset:
      const mode = action.payload === "success" ? "inactivate" : "reset";
      return {
        mode,
        text: "尚未選擇工單",
        pause: false,
        reset: false,
        speed: 20,
      };

    default:
      return state;
  }
};

export const robotControlScreen_realtimeItemReducer = (
  state = { mode: null, count: null },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN.realtimeItem:
      return { ...state, ...action.payload };
    case ROBOT_CONTROL_SCREEN_realtimeRobot.mode:
      return { ...state, mode: action.payload };

    case ROBOT_CONTROL_SCREEN_realtimeRobot.count:
      return { ...state, count: action.payload };

    default:
      return state;
  }
};

export const robotControlScree_realtimeVisualReducer = (
  state = {
    mode: null,
    name: null,
    nextName: null,
    visualResult: [],
    visualCount: 1,
    bufferCount: [],
    checkNumberlist: [],
  },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN.realtimeVisual:
      return { ...state, ...action.payload };

    case ROBOT_CONTROL_SCREEN.realtimeVisual_demo3:
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

export const robotControlScreen_API_robotSettingReducer = (
  state = { data: [] },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN_API_robotSetting.request:
      return {
        loading: true,
        data: [],
      };

    case ROBOT_CONTROL_SCREEN_API_robotSetting.success:
      return {
        loading: false,
        success: true,
        data: action.patload,
      };

    case ROBOT_CONTROL_SCREEN_API_robotSetting.fail:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
