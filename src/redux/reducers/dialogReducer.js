import { DIALOG } from "../constants";

export const dialogReducer = (
  state = { orderId: null, multiOrderId: null, executeOrderId: null },
  action
) => {
  switch (action.type) {
    case DIALOG.order:
      return { ...state, ...action.payload };

    case DIALOG.reset:
      return { orderId: null, multiOrderId: null };

    default:
      return state;
  }
};
