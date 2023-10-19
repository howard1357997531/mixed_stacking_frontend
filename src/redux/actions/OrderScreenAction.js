import axios from "axios";
import { ORDER_LIST, ORDER_SCREEN_orderList } from "../constants";
import Swal from "sweetalert2";
import { brown } from "@mui/material/colors";

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

      dispatch({
        type: ORDER_LIST.aiTrainingOrderAdd,
        payload: { orderId, data: data.aiResult_str },
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
        payload: data.aiResult_str,
      });
    } catch (error) {
      // console.log(error.response.data); // request fail
      Swal.fire({
        position: "center",
        width: "16em",
        icon: "warning",
        title: "AI 演算失敗",
        background: brown[400],
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        window.location.reload();
      });
    }
  };
