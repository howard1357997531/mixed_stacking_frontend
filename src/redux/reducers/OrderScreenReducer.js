import { InfoBtnToast, timerToast } from "../../swal";
import { ORDER_SCREEN } from "../constants";

export const orderScreen_orderSelectReducer = (
  state = {
    mode: "close",
    orderId: null,
    aiTrainingState: null,
    combineOrder: [],
    combineOrderSelectBool: false,
    combineOrderFocusBool: false,
    combineOrderFocusIndex: 0,
    combineOrderFocusValue: null,
    editId: null,
    editData: null,
    deleteIdArray: [],
  },
  action
) => {
  switch (action.type) {
    // case ORDER_SCREEN_orderList.mode:
    //   return { ...state, mode: action.payload };

    // case ORDER_SCREEN_orderList.orderId:
    //   return { ...state, orderId: action.payload };

    // case ORDER_SCREEN_orderList.aiTrainingState:
    //   return { ...state, aiTrainingState: action.payload };

    // case ORDER_SCREEN_orderList.orderCurrentData:
    //   return { ...state, orderCurrentData: action.payload };

    // case ORDER_SCREEN_orderList.aiCurrentData:
    //   return { ...state, aiCurrentData: action.payload };

    // case ORDER_SCREEN_orderList.delete:
    //   const deleteExist = state.item.includes(action.payload);

    //   if (deleteExist) {
    //     var temp = state.item.filter((itemId) => itemId !== action.payload);
    //   } else {
    //     var temp = [...state.item, action.payload];
    //   }
    //   return { ...state, item: temp };

    // case ORDER_SCREEN.orderSelectData:
    //   return { ...state, ...action.payload };

    //
    case ORDER_SCREEN.orderSelect:
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

      return {
        ...state,
        combineOrder,
        // ---------------
        combineOrderFocusIndex: combineOrder.length - 1,
      };

    case ORDER_SCREEN.afterTrainingCheck:
      let id = action.payload.orderId;
      if (state.mode === "orderDetail" && state.orderId === id) {
        timerToast("success", "工單演算完成");
        return {
          ...state,
          mode: "aiResult",
          aiTrainingState: "finish_training",
        };
      } else {
        InfoBtnToast("success", "工單演算完成");

        return state;
      }

    case ORDER_SCREEN.finishTrainingEdit:
      return { ...state, name: action.payload };

    case ORDER_SCREEN.orderSelect_reset:
      return {
        mode: "close",
        orderId: null,
        aiTrainingState: null,
        combineOrder: [],
        combineOrderFocusBool: false,
        combineOrderFocusIndex: 0,
        combineOrderFocusValue: null,
        edit: [],
        delete: [],
      };

    default:
      return state;
  }
};
