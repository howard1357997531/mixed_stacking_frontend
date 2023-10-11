import { configureStore } from "@reduxjs/toolkit";
import { OrderDetailReducer } from "./reducers/orderReducers";

const reducer = {
  OrderDetail: OrderDetailReducer,
};

const preloadedState = {};

export const store = configureStore({
  reducer: reducer,
  preloadedState: preloadedState,
});
