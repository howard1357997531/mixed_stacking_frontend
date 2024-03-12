import { configureStore } from "@reduxjs/toolkit";
import {
  multipleOrderListReducer,
  orderListReducer,
} from "./reducers/orderReducers";
import { HomeButtonHoverReducer } from "./reducers/homeScreenReducer";
import { orderScreen_orderSelectReducer } from "./reducers/OrderScreenReducer";
import {
  robotControlScreen_robotStateReducer,
  robotControlScreen_orderSelectReducer,
  robotControlScreen_informationAreaReducer,
  robotControlScreen_multipleOrderSelectReducer,
  robotControlScreen_robotExecutionListReducer,
  robotControlScreen_realtimeItemReducer,
  robotControlScree_realtimeVisualReducer,
  robotControlScreen_API_robotSettingReducer,
  robotControlScreen_API_executeRobotReducer,
  robotExecutionListState,
  robotStateState,
} from "./reducers/RobotControlScreenReducer";
import { dialogReducer } from "./reducers/dialogReducer";
import { toastReducer } from "./reducers/toastReducer";

const reducer = {
  HomeButtonHover: HomeButtonHoverReducer,
  dialog: dialogReducer,
  toast: toastReducer,
  orderList: orderListReducer,
  multipleOrderList: multipleOrderListReducer,
  orderScreen_orderSelect: orderScreen_orderSelectReducer,
  robotControlScreen_orderSelect: robotControlScreen_orderSelectReducer,
  robotControlScreen_multipleOrderSelect:
    robotControlScreen_multipleOrderSelectReducer,
  robotControlScreen_informationArea: robotControlScreen_informationAreaReducer,
  robotControlScreen_robotExecutionList:
    robotControlScreen_robotExecutionListReducer,
  robotControlScreen_robotState: robotControlScreen_robotStateReducer,
  robotControlScreen_realtimeItem: robotControlScreen_realtimeItemReducer,
  robotControlScreen_realtimeVisual: robotControlScree_realtimeVisualReducer,
  robotControlScreen_API_executeRobot:
    robotControlScreen_API_executeRobotReducer,
  robotControlScreen_API_robotSetting:
    robotControlScreen_API_robotSettingReducer,
};

// storage
const robotControlScreen_orderSelectStorage = localStorage.getItem(
  "robotControlScreen_orderSelect"
)
  ? JSON.parse(localStorage.getItem("robotControlScreen_orderSelect"))
  : { data: [], searchData: null };

const robotControlScreen_multipleOrderSelectStorage = localStorage.getItem(
  "robotControlScreen_multipleOrderSelect"
)
  ? JSON.parse(localStorage.getItem("robotControlScreen_multipleOrderSelect"))
  : { data: [], searchData: null };

const robotControlScreen_informationAreaStorage = localStorage.getItem(
  "robotControlScreen_informationArea"
)
  ? JSON.parse(localStorage.getItem("robotControlScreen_informationArea"))
  : { mode: "initial", multipleOrderSelectId: null };

const robotControlScreen_robotExecutionListStorage = localStorage.getItem(
  "robotControlScreen_robotExecutionList"
)
  ? JSON.parse(localStorage.getItem("robotControlScreen_robotExecutionList"))
  : robotExecutionListState;

const robotControlScreen_robotStateStorage = localStorage.getItem(
  "robotControlScreen_robotState"
)
  ? JSON.parse(localStorage.getItem("robotControlScreen_robotState"))
  : robotStateState;

// preloadedState
const preloadedState = {
  robotControlScreen_orderSelect: robotControlScreen_orderSelectStorage,
  robotControlScreen_multipleOrderSelect:
    robotControlScreen_multipleOrderSelectStorage,
  robotControlScreen_informationArea: robotControlScreen_informationAreaStorage,
  robotControlScreen_robotExecutionList:
    robotControlScreen_robotExecutionListStorage,
  robotControlScreen_robotState: robotControlScreen_robotStateStorage,
};
console.log("redux");
export const store = configureStore({
  reducer: reducer,
  preloadedState: preloadedState,
});
