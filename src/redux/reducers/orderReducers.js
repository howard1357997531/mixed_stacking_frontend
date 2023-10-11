import { ORDER_DETAIL } from "../constants";

export const OrderDetailReducer = (state = ["asd"], action) => {
  switch (action.type) {
    case ORDER_DETAIL.request:
      return {
        loading: true,
        data: [],
      };

    case ORDER_DETAIL.success:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };

    case ORDER_DETAIL.fail:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
