import axios from "axios";
import { ORDER_LIST, ORDER_SCREEN_orderList } from "../constants";

export const aiTrainingAction =
  (orderId, aiTrainingState) => async (dispatch) => {
    try {
      dispatch({
        type: ORDER_SCREEN_orderList.aiTrainingState,
        payload: aiTrainingState,
      });

      dispatch({
        type: ORDER_LIST.aiTrainingStateChange,
        payload: { orderId, aiTrainingState },
      });

      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/aiTraining/",
        { orderId }
      );
      console.log(data);

      setTimeout(() => {
        dispatch({
          type: ORDER_LIST.aiTrainingOrderAdd,
          payload: { orderId, data },
        });

        dispatch({
          type: ORDER_LIST.aiTrainingStateChange,
          payload: { orderId, aiTrainingState: "finish_training" },
        });

        dispatch({
          type: ORDER_SCREEN_orderList.mode,
          payload: "aiResult",
        });

        dispatch({
          type: ORDER_SCREEN_orderList.aiTrainingState,
          payload: "finish_training",
        });

        dispatch({
          type: ORDER_SCREEN_orderList.aiCurrentData,
          payload: data,
        });
      }, 3000);
    } catch (error) {}
  };
