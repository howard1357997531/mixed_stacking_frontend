import {
  ROBOT_CONTROL_SCREEN,
  ROBOT_CONTROL_SCREEN_API_executeRobot,
  ROBOT_CONTROL_SCREEN_API_robotSetting,
  ROBOT_CONTROL_SCREEN_orderList,
  ROBOT_CONTROL_SCREEN_realtimeRobot,
  ROBOT_CONTROL_SCREEN_realtimeVisual,
} from "../constants";

export const robotControlScreen_orderSelectReducer = (
  state = { data: [], searchData: null },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN.orderSelect:
      localStorage.setItem(
        "robotControlScreen_orderSelect",
        JSON.stringify({ ...state, ...action.payload })
      );

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
  state = { data: [], searchData: null },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN.multipleOrderSelect:
      localStorage.setItem(
        "robotControlScreen_multipleOrderSelect",
        JSON.stringify({ ...state, ...action.payload })
      );

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
      localStorage.setItem(
        "robotControlScreen_informationArea",
        JSON.stringify({ ...state, ...action.payload })
      );

      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export const robotExecutionListState = {
  mode: "manual",
  startTime: null,
  check: false,
  autoCheck: false,
  isDoing: false,
  isOpenBool: false,
  executeOrderId: [],
  executeOrderStr: [],
  name: [],
  queue: 1,
  allData: [],
  insertIndex: null,
  insertOrderOpen: false,
  insertOrderDetailOpen: false,
  insertOrderDetailId: null,
  resetIndex: [],
};

export const robotControlScreen_robotExecutionListReducer = (
  state = robotExecutionListState,
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN.robotExecutionList:
      localStorage.setItem(
        "robotControlScreen_robotExecutionList",
        JSON.stringify({ ...state, ...action.payload })
      );
      return { ...state, ...action.payload };

    case ROBOT_CONTROL_SCREEN.robotExecutionList_reset:
      const resetData = {
        startTime: null,
        check: false,
        autoCheck: false,
        isDoing: false,
        isOpenBool: false,
        executeOrderId: [],
        executeOrderStr: [],
        name: [],
        queue: 1,
        allData: [],
        insertIndex: null,
        insertOrderOpen: false,
        insertOrderDetailOpen: false,
        insertOrderDetailId: null,
        resetIndex: [],
      };

      localStorage.setItem(
        "robotControlScreen_robotExecutionList",
        JSON.stringify({ ...state, ...resetData })
      );

      return { ...state, ...resetData };

    case ROBOT_CONTROL_SCREEN.robotExecutionList_resetAll:
      // 這裡就不改變 check and autoCheck
      const resetData2 = {
        mode: "manual",
        startTime: null,
        isDoing: false,
        isOpenBool: false,
        executeOrderId: [],
        executeOrderStr: [],
        name: [],
        queue: 1,
        allData: [],
        insertIndex: null,
        insertOrderOpen: false,
        insertOrderDetailOpen: false,
        insertOrderDetailId: null,
        resetIndex: [],
      };

      localStorage.setItem(
        "robotControlScreen_robotExecutionList",
        JSON.stringify({ ...state, ...resetData2 })
      );

      return { ...state, ...resetData2 };

    default:
      return state;
  }
};

export const robotStateState = {
  mode: "inactivate",
  text: "尚未選擇工單",
  pause: false,
  reset: false,
  speed: 20,
};

export const robotControlScreen_robotStateReducer = (
  state = robotStateState,
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN.robotState:
      localStorage.setItem(
        "robotControlScreen_robotState",
        JSON.stringify({ ...state, ...action.payload })
      );

      return { ...state, ...action.payload };

    case ROBOT_CONTROL_SCREEN.robotState_reset:
      const data = {
        text: "尚未選擇工單",
        pause: false,
        reset: false,
        speed: 20,
      };
      return { ...state, ...data };

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
    bufferquanlity: [],
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
