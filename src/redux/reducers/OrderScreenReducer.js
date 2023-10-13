import { ORDER_SCREEN_orderList } from "../constants";

export const orderScreen_OrderSelectReducer = (
  state = { item: [], edit: [], delete: [] },
  action
) => {
  switch (action.type) {
    case ORDER_SCREEN_orderList.item.select:
      return {
        ...state,
        item: [...state.item, action.payload],
      };

    case ORDER_SCREEN_orderList.item.unselect:
      const temp = state.item.filter((id) => id !== action.payload);
      return {
        ...state,
        item: temp,
      };

    default:
      return state;
  }
};
