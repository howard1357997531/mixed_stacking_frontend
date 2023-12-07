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

export const multipleOrderListReducer = (
  state = { data: [], orderId: "" },
  action
) => {
  switch (action.type) {
    case MULTIPLE_ORDER_LIST.request:
      return {
        ...state,
        loading: true,
        data: [],
      };

    case MULTIPLE_ORDER_LIST.success:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };

    case MULTIPLE_ORDER_LIST.fail:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case MULTIPLE_ORDER_LIST.revise:
      return { ...state, ...action.payload };

    case MULTIPLE_ORDER_LIST.orderId:
      return {
        ...state,
        orderId: action.payload,
      };

    case MULTIPLE_ORDER_LIST.addData:
      if (state.data.length !== 0) {
        var dataTemp = state.data.map((multiOrder, index) => {
          if (index === 0) {
            if (
              multiOrder.createdAt.slice(8, 10) ===
              action.payload.createdAt.slice(8, 10)
            ) {
              return { ...multiOrder, is_today_latest: false };
            } else {
              return multiOrder;
            }
          } else {
            return multiOrder;
          }
        });
      } else {
        var dataTemp = state;
      }

      return {
        ...state,
        data: [action.payload, ...dataTemp],
        orderId: action.payload.id,
      };

    case MULTIPLE_ORDER_LIST.deleteData:
      var deleteData;
      var deleteIndex;
      state.data.forEach((order, index) => {
        if (order.id === action.payload) {
          deleteData = order;
          deleteIndex = index;
        }
      });

      if (deleteData.is_today_latest) {
        const tempData = state.data.map((order, index) => {
          if (
            index === deleteIndex + 1 &&
            order.createdAt.slice(8, 10) === deleteData.createdAt.slice(8, 10)
          ) {
            return { ...order, is_today_latest: true };
          } else {
            return order;
          }
        });

        var data = tempData.filter((order) => order.id !== action.payload);
      } else {
        var data = state.data.filter((order) => order.id !== action.payload);
      }

      return { ...state, data, orderId: null };

    default:
      return state;
  }
};
