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
  robotControlScreen_realtimeVisualReducer,
  robotControlScreen_multipleOrderSelectReducer,
  robotControlScreen_robotExecutionListReducer,
  robotControlScreen_realtimeItemReducer,
  robotControlScreen_API_robotSettingReducer,
  robotControlScreen_API_executeRobotReducer,
} from "./reducers/RobotControlScreenReducer";

const reducer = {
  HomeButtonHover: HomeButtonHoverReducer,
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
  robotControlScreen_realtimeVisual: robotControlScreen_realtimeVisualReducer,
  robotControlScreen_API_executeRobot:
    robotControlScreen_API_executeRobotReducer,
  robotControlScreen_API_robotSetting:
    robotControlScreen_API_robotSettingReducer,
};

const preloadedState = {};

export const store = configureStore({
  reducer: reducer,
  preloadedState: preloadedState,
});
