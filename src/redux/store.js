import { configureStore } from "@reduxjs/toolkit";
import { OrderListReducer } from "./reducers/orderReducers";
import { HomeButtonHoverReducer } from "./reducers/homeScreenReducer";
import { orderScreen_orderSelectReducer } from "./reducers/OrderScreenReducer";
import {
  robotControlScreen_robotStateReducer,
  robotControlScreen_executeRobotReducer,
  robotControlScreen_orderSelectReducer,
  robotControlScreen_realtimeDataReducer,
  robotControlScreen_informationAreaReducer,
} from "./reducers/RobotControlScreenReducer";

const reducer = {
  HomeButtonHover: HomeButtonHoverReducer,
  orderList: OrderListReducer,
  orderScreen_orderSelect: orderScreen_orderSelectReducer,
  robotControlScreen_orderSelect: robotControlScreen_orderSelectReducer,
  robotControlScreen_executeRobot: robotControlScreen_executeRobotReducer,
  robotControlScreen_robotState: robotControlScreen_robotStateReducer,
  robotControlScreen_realtimeData: robotControlScreen_realtimeDataReducer,
  robotControlScreen_informationArea: robotControlScreen_informationAreaReducer,
};

const preloadedState = {};

export const store = configureStore({
  reducer: reducer,
  preloadedState: preloadedState,
});
