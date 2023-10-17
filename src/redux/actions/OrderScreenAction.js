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

      //   const {data} = await axios.post("http://127.0.0.1:8000/api/aiTraining/", {})
      const data = "12,3,5,7,8,6";
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
          type: ORDER_SCREEN_orderList.aiTrainingState,
          payload: "finish_training",
        });

        dispatch({
          type: ORDER_SCREEN_orderList.mode,
          payload: "aiResult",
        });
      }, 3000);
    } catch (error) {}
  };
