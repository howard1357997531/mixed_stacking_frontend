import { configureStore } from "@reduxjs/toolkit";
import { OrderDetailReducer } from "./reducers/orderReducers";
import { HomeButtonHoverReducer } from "./reducers/homeScreenReducer";

const reducer = {
  HomeButtonHover: HomeButtonHoverReducer,
  OrderDetail: OrderDetailReducer,
};

const preloadedState = {};

export const store = configureStore({
  reducer: reducer,
  preloadedState: preloadedState,
});
