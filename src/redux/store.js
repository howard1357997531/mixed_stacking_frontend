import { configureStore } from "@reduxjs/toolkit";
import { OrderListReducer } from "./reducers/orderReducers";
import { HomeButtonHoverReducer } from "./reducers/homeScreenReducer";
import { orderScreen_orderSelectReducer } from "./reducers/OrderScreenReducer";

const reducer = {
  HomeButtonHover: HomeButtonHoverReducer,
  orderList: OrderListReducer,
  orderScreen_orderSelect: orderScreen_orderSelectReducer,
};

const preloadedState = {};

export const store = configureStore({
  reducer: reducer,
  preloadedState: preloadedState,
});
