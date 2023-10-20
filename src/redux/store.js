import { configureStore } from "@reduxjs/toolkit";
import { OrderListReducer } from "./reducers/orderReducers";
import { HomeButtonHoverReducer } from "./reducers/homeScreenReducer";
import { orderScreen_orderSelectReducer } from "./reducers/OrderScreenReducer";
import { robotControlScreen_orderSelectReducer } from "./reducers/RobotControlScreenReducer";

const reducer = {
  HomeButtonHover: HomeButtonHoverReducer,
  orderList: OrderListReducer,
  orderScreen_orderSelect: orderScreen_orderSelectReducer,
  robotControlScreen_orderSelect: robotControlScreen_orderSelectReducer,
};

const preloadedState = {};

export const store = configureStore({
  reducer: reducer,
  preloadedState: preloadedState,
});
