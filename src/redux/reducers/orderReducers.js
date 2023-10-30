import { MULTIPLE_ORDER_LIST, ORDER_LIST } from "../constants";

export const orderListReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST.request:
      return {
        loading: true,
        data: [],
      };

    case ORDER_LIST.success:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };

    case ORDER_LIST.fail:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_LIST.aiTrainingStateChange:
      const stateData = state.data.map((data) =>
        data.id === action.payload.orderId
          ? {
              ...data,
              aiTraining_state: action.payload.aiTrainingState,
            }
          : data
      );
      return {
        ...state,
        data: stateData,
      };

    case ORDER_LIST.aiTrainingOrderAdd:
      const orderData = state.data.map((data) =>
        data.id === action.payload.orderId
          ? {
              ...data,
              aiTraining_order: action.payload.data,
            }
          : data
      );
      return {
        ...state,
        data: orderData,
      };

    default:
      return state;
  }
};

export const multipleOrderListReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case MULTIPLE_ORDER_LIST.request:
      return {
        loading: true,
        data: [],
      };

    case MULTIPLE_ORDER_LIST.success:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };

    case MULTIPLE_ORDER_LIST.fail:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
