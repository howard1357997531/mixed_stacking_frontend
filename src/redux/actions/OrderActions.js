import axios from "axios";
import { ORDER_LIST } from "../constants";

export const orderListAction = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_LIST.request,
    });

    const { data } = await axios.get("http://127.0.0.1:8000/api/getOrderData/");

    dispatch({
      type: ORDER_LIST.success,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST.fail,
      payload: error.response.data.error_msg,
    });
  }
};
