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

    case ORDER_LIST.afterUpload:
      return { ...state, data: [...action.payload, ...state.data] };

    case ORDER_LIST.beforeTraining:
      const beforeData = state.data.map((data) =>
        data.id === action.payload.orderId
          ? {
              ...data,
              aiTraining_state: action.payload.aiTrainingState,
            }
          : data
      );
      return { ...state, data: beforeData };

    case ORDER_LIST.afterTraining:
      const afterData = state.data.map((data) =>
        data.id === action.payload.orderId
          ? {
              ...data,
              aiTraining_state: action.payload.aiTrainingState,
              aiTraining_order: action.payload.data,
            }
          : data
      );
      return { ...state, data: afterData };

    case ORDER_LIST.edit:
      if (action.payload.allData.aiTraining_state === "no_training") {
        var editData = state.data.map((order) => {
          if (order.id === action.payload.allData.id) {
            return action.payload.allData;
          } else {
            return order;
          }
        });
      } else {
        var editData = state.data.map((order) => {
          if (order.id === action.payload.allData.id) {
            return { ...order, name: action.payload.allData.name };
          } else {
            return order;
          }
        });
      }

      return { ...state, data: editData };

    case ORDER_LIST.finishTrainingEdit:
      return { ...state, data: [action.payload, ...state.data] };

    case ORDER_LIST.delete:
      const deleteTemp = state.data.filter(
        (order) => !action.payload.includes(order.id)
      );
      return { ...state, data: deleteTemp };

    case ORDER_LIST.filter.request:
      return { ...state, loading: true };

    case ORDER_LIST.filter.success:
      return { ...state, loading: false, data: action.payload };

    case ORDER_LIST.filter.fail:
      return { ...state, loading: false };

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
        var dataTemp = state.data;
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
