import axios from "axios";
import { MULTIPLE_ORDER_LIST, ORDER_LIST, ORDER_SCREEN } from "../constants";
import { domain } from "../../env";

export const orderListAction =
  (mode = null) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ORDER_LIST.request,
      });

      const { data } = await axios.get(`${domain}/api/getOrderData/`);

      dispatch({
        type: ORDER_LIST.success,
        payload: data,
      });

      if (mode === "close") {
        var output = { orderId: null };
      } else if (["orderDetail", "aiResult"].includes(mode)) {
        var output = { orderId: data.at(0).id };
      } else if (mode === "edit") {
        var output = { editId: null, editData: null };
      }

      if (mode) {
        dispatch({
          type: ORDER_SCREEN.orderSelect,
          payload: output,
        });
      }
    } catch (error) {
      dispatch({
        type: ORDER_LIST.fail,
        payload: error.response.data.error_msg,
      });
    }
  };

export const multipleOrderListAction = () => async (dispatch) => {
  try {
    dispatch({
      type: MULTIPLE_ORDER_LIST.request,
    });

    const { data } = await axios.get(`${domain}/api/getMultipleOrderData/`);

    dispatch({
      type: MULTIPLE_ORDER_LIST.success,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MULTIPLE_ORDER_LIST.fail,
      payload: error.response.data.error_msg,
    });
  }
};
