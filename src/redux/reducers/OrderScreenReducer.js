import { ORDER_SCREEN, ORDER_SCREEN_orderList } from "../constants";

export const orderScreen_orderSelectReducer = (
  state = {
    mode: "close",
    orderId: [],
    combineOrder: [],
    aiTrainingState: null,
    orderCurrentData: null,
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

    case ORDER_SCREEN.orderSelectData:
      return { ...state, ...action.payload };

    case ORDER_SCREEN.multiOrderCreateSelectData:
      var combineOrder = [...state.combineOrder];
      if (combineOrder.length === 0) {
        return { ...state, combineOrder: [String(action.payload)] };
      } else {
        const lastNum = combineOrder.at(-1).split("*").at(0);
        if (parseInt(lastNum) === action.payload) {
          if (combineOrder.at(-1).includes("*")) {
            const times = parseInt(combineOrder.at(-1).split("*").at(1)) + 1;
            combineOrder.splice(-1, 1, lastNum + "*" + String(times));
          } else {
            combineOrder.splice(-1, 1, lastNum + "*2");
          }
        } else {
          combineOrder.push(String(action.payload));
        }
      }

      return { ...state, combineOrder };

    case ORDER_SCREEN_orderList.currentPageCheck:
      if (state.mode === "orderDetail") {
        return { ...state, mode: "aiResult" };
      }

    case ORDER_SCREEN.orderSelect_reset:
      return {
        ...state,
        orderId: [],
        aiTrainingState: null,
        orderCurrentData: null,
        aiCurrentData: "",
        edit: [],
        delete: [],
      };

    default:
      return state;
  }
};
