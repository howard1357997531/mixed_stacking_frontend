// orderList
export const ORDER_LIST = {
  request: "ORDER_LIST_request",
  success: "ORDER_LIST_success",
  fail: "ORDER_LIST_fail",
  beforeTraining: "ORDER_LIST_beforeTraining",
  afterTraining: "ORDER_LIST_afterTraining",
  aiTrainingStateChange: "ORDER_LIST_aiTrainingStateChange",
  aiTrainingOrderAdd: "ORDER_LIST_aiTrainingOrderAdd",
  edit: "ORDER_LIST_edit",
  delete: "ORDER_LIST_delete",
  filter: {
    request: "ORDER_LIST_filter_request",
    success: "ORDER_LIST_filter_success",
    fail: "ORDER_LIST_filter_fail",
  },
};

// multipleOrderList
export const MULTIPLE_ORDER_LIST = {
  revise: "MULTIPLE_ORDER_LIST_revise",
  request: "MULTIPLE_ORDER_LIST_request",
  success: "MULTIPLE_ORDER_LIST_success",
  fail: "MULTIPLE_ORDER_LIST_fail",
  orderId: "MULTIPLE_ORDER_LIST_orderId",
  addData: "MULTIPLE_ORDER_LIST_addData",
  deleteData: "MULTIPLE_ORDER_LIST_deleteData",
};

// dialog
export const DIALOG = {
  order: "DIALOG_order",
  reset: "DIALOG_reset",
};

// toast
export const TOAST = {
  aiTraining: "TOAST_aiTraining",
};

// homeScreen
export const HOME_BUTTON = {
  createNewOrder: {
    hover: "HOME_BUTTON_CREATE_NEW_ORDER_HOVER",
    unhover: "HOME_BUTTON_CREATE_NEW_ORDER_UNHOVER",
  },
  robotConsole: {
    hover: "HOME_BUTTON_ROBOT_CONSOLE_HOVER",
    unhover: "HOME_BUTTON_ROBOT_CONSOLE_UNHOVER",
  },
};

// OrderScreen
export const ORDER_SCREEN = {
  orderSelect: "ORDER_SCREEN_orderSelect",
  multiOrderCreateSelectData: "ORDER_SCREEN_multiOrderCreateSelectData",
  afterTrainingCheck: "ORDER_SCREEN_afterTrainingCheck",
  // reset
  orderSelect_reset: "ORDER_SCREEN_orderSelect_reset",
};

export const ORDER_SCREEN_orderList = {
  mode: "ORDER_SCREEN_orderList_mode",
  orderId: "ORDER_SCREEN_orderList_orderId",
  aiTrainingState: "ORDER_SCREEN_orderList_aiTrainingState",
  orderCurrentData: "ORDER_SCREEN_orderList_orderCurrentData",
  aiCurrentData: "ORDER_SCREEN_orderList_aiCurrentData",
  edit: "ORDER_SCREEN_orderList_edit",
  delete: "ORDER_SCREEN_orderList_delete",
  multipleData: "ORDER_SCREEN_orderList_multipleData",
  currentPageCheck: "ORDER_SCREEN_orderList_currentPageCheck",
};

// RobotControlScreen
export const ROBOT_CONTROL_SCREEN = {
  orderSelect: "ROBOT_CONTROL_SCREEN_orderSelect",
  multipleOrderSelect: "ROBOT_CONTROL_SCREEN_multipleOrderSelect",
  informationArea: "ROBOT_CONTROL_SCREEN_informationArea",
  robotExecutionList: "ROBOT_CONTROL_SCREEN_robotExecutionList",
  robotState: "ROBOT_CONTROL_SCREEN_robotState",
  robotSetting: "ROBOT_CONTROL_SCREEN_robotSetting",
  realtimeItem: "ROBOT_CONTROL_SCREEN_realtimeItem",
  realtimeVisual: "ROBOT_CONTROL_SCREEN_realtimeVisual",
  realtimeVisual_demo3: "ROBOT_CONTROL_SCREEN_realtimeVisual_demo3",
  // api
  executeRobot: "ROBOT_CONTROL_SCREEN_executeRobot",
  robotSetting: "ROBOT_CONTROL_SCREEN_robotSetting",
  //reset
  robotExecutionList_reset: "ROBOT_CONTROL_SCREEN_robotExecutionList_reset",
  robotState_reset: "ROBOT_CONTROL_SCREEN_robotState_reset",
};

export const ROBOT_CONTROL_SCREEN_orderList = {
  select: "ROBOT_CONTROL_SCREEN_orderList_select",
};

export const ROBOT_CONTROL_SCREEN_multipleOrderList = {
  select: "ROBOT_CONTROL_SCREEN_multipleOrderList_select",
};

export const ROBOT_CONTROL_SCREEN_informationArea = {
  mode: "ROBOT_CONTROL_SCREEN_informationArea_mode",
  multipleOrderId: "ROBOT_CONTROL_SCREEN_informationArea_multipleOrderId",
};

export const ROBOT_CONTROL_SCREEN_robotState = {
  mode: "ROBOT_CONTROL_SCREEN_robotState_mode",
  text: "ROBOT_CONTROL_SCREEN_robotState_text",
};

export const ROBOT_CONTROL_SCREEN_robotSetting = {
  request: "ROBOT_CONTROL_SCREEN_robotSetting_request",
  success: "ROBOT_CONTROL_SCREEN_robotSetting_success",
  fail: "ROBOT_CONTROL_SCREEN_robotSetting_fail",
  pause: "ROBOT_CONTROL_SCREEN_robotSetting_pause",
  unPause: "ROBOT_CONTROL_SCREEN_robotSetting_unPause",
  reset: "ROBOT_CONTROL_SCREEN_robotSetting_reset",
  speedUp: "ROBOT_CONTROL_SCREEN_robotSetting_speedUp",
  speedDown: "ROBOT_CONTROL_SCREEN_robotSetting_slowDown",
};

export const ROBOT_CONTROL_SCREEN_realtimeRobot = {
  mode: "ROBOT_CONTROL_SCREEN_realtimeRobot_mode",
  count: "ROBOT_CONTROL_SCREEN_realtimeRobot_count",
};

export const ROBOT_CONTROL_SCREEN_realtimeVisual = {
  mode: "ROBOT_CONTROL_SCREEN_realtimeVisual_mode",
  name: "ROBOT_CONTROL_SCREEN_realtimeVisual_name",
  nextName: "ROBOT_CONTROL_SCREEN_realtimeVisual_nextName",
};

export const ROBOT_CONTROL_SCREEN_API_executeRobot = {
  request: "ROBOT_CONTROL_SCREEN_API_executeRobot_request",
  success: "ROBOT_CONTROL_SCREEN_API_executeRobot_success",
  fail: "ROBOT_CONTROL_SCREEN_API_executeRobot_fail",
};

export const ROBOT_CONTROL_SCREEN_API_robotSetting = {
  request: "ROBOT_CONTROL_SCREEN_API_robotSetting_request",
  success: "ROBOT_CONTROL_SCREEN_API_robotSetting_success",
  fail: "ROBOT_CONTROL_SCREEN_API_robotSetting_fail",
};

// export const ORDER_SCREEN_orderList = {
//   item: {
//     select: "ORDER_SCREEN_orderList_item_select",
//     unselect: "ORDER_SCREEN_orderList_item_unselect",
//   },
//   edit: {
//     select: "ORDER_SCREEN_orderList_edit_select",
//     unselect: "ORDER_SCREEN_orderList_edit_unselect",
//   },
//   delete: {
//     select: "ORDER_SCREEN_orderList_delete_select",
//     unselect: "ORDER_SCREEN_orderList_delete_unselect",
//   },
// };
