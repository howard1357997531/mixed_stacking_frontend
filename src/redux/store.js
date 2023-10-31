import { configureStore } from "@reduxjs/toolkit";
import {
  multipleOrderListReducer,
  orderListReducer,
} from "./reducers/orderReducers";
import { HomeButtonHoverReducer } from "./reducers/homeScreenReducer";
import { orderScreen_orderSelectReducer } from "./reducers/OrderScreenReducer";
import {
  robotControlScreen_robotStateReducer,
  robotControlScreen_executeRobotReducer,
  robotControlScreen_orderSelectReducer,
  robotControlScreen_informationAreaReducer,
  robotControlScreen_realtimeRobotReducer,
  robotControlScreen_realtimeVisualReducer,
} from "./reducers/RobotControlScreenReducer";

const reducer = {
  HomeButtonHover: HomeButtonHoverReducer,
  orderList: orderListReducer,
  multipleOrderList: multipleOrderListReducer,
  orderScreen_orderSelect: orderScreen_orderSelectReducer,
  robotControlScreen_orderSelect: robotControlScreen_orderSelectReducer,
  robotControlScreen_informationArea: robotControlScreen_informationAreaReducer,
  robotControlScreen_executeRobot: robotControlScreen_executeRobotReducer,
  robotControlScreen_robotState: robotControlScreen_robotStateReducer,
  robotControlScreen_realtimeRobot: robotControlScreen_realtimeRobotReducer,
  robotControlScreen_realtimeVisual: robotControlScreen_realtimeVisualReducer,
};

const preloadedState = {};

export const store = configureStore({
  reducer: reducer,
  preloadedState: preloadedState,
});
