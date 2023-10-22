import { configureStore } from "@reduxjs/toolkit";
import { OrderListReducer } from "./reducers/orderReducers";
import { HomeButtonHoverReducer } from "./reducers/homeScreenReducer";
import { orderScreen_orderSelectReducer } from "./reducers/OrderScreenReducer";
import {
  robotControlScreen_robotSettingReducer,
  robotControlScreen_executeRobotReducer,
  robotControlScreen_orderSelectReducer,
  robotControlScreen_realtimeDataReducer,
} from "./reducers/RobotControlScreenReducer";

const reducer = {
  HomeButtonHover: HomeButtonHoverReducer,
  orderList: OrderListReducer,
  orderScreen_orderSelect: orderScreen_orderSelectReducer,
  robotControlScreen_orderSelect: robotControlScreen_orderSelectReducer,
  robotControlScreen_executeRobot: robotControlScreen_executeRobotReducer,
  robotControlScreen_robotSetting: robotControlScreen_robotSettingReducer,
  robotControlScreen_realtimeData: robotControlScreen_realtimeDataReducer,
};

const preloadedState = {};

export const store = configureStore({
  reducer: reducer,
  preloadedState: preloadedState,
});
