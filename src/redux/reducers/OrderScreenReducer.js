import { ORDER_SCREEN_orderList } from "../constants";

export const orderScreen_orderSelectReducer = (
  state = {
    mode: "close",
    orderId: [],
    aiTrainingState: null,
    orderCurrentData: {},
    aiCurrentData: "",
    edit: [],
    delete: [],
  },
  action
) => {
  switch (action.type) {
    case ORDER_SCREEN_orderList.mode:
      return { ...state, mode: action.payload };

    case ORDER_SCREEN_orderList.orderId:
      return { ...state, orderId: action.payload };

    case ORDER_SCREEN_orderList.aiTrainingState:
      return { ...state, aiTrainingState: action.payload };

    case ORDER_SCREEN_orderList.orderCurrentData:
      return { ...state, orderCurrentData: action.payload };

    case ORDER_SCREEN_orderList.aiCurrentData:
      return { ...state, aiCurrentData: action.payload };

    case ORDER_SCREEN_orderList.delete:
      const deleteExist = state.item.includes(action.payload);

      if (deleteExist) {
        var temp = state.item.filter((itemId) => itemId !== action.payload);
      } else {
        var temp = [...state.item, action.payload];
      }
      return { ...state, item: temp };

    case ORDER_SCREEN_orderList.multipleData:
      if (action.mode === "orderDetail") {
        return { ...state, ...action.payload };
      } else if (action.mode === "multipleOrderCreate") {
        if (state.orderId.includes(action.payload.orderId)) {
          var newData = state.orderId.filter(
            (order) => order !== action.payload.orderId
          );
        } else {
          var newData = [...state.orderId, action.payload.orderId];
        }
        return {
          ...state,
          orderId: newData,
        };
      }

    default:
      return state;
  }
};
