import axios from "axios";
import { MULTIPLE_ORDER_LIST, ORDER_LIST } from "../constants";
import { domain } from "../../env";

export const orderListAction = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_LIST.request,
    });

    const { data } = await axios.get(`${domain}/api/getOrderData/`);

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
    console.log(data);
  } catch (error) {
    dispatch({
      type: MULTIPLE_ORDER_LIST.fail,
      payload: error.response.data.error_msg,
    });
  }
};
