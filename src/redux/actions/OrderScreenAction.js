import axios from "axios";
import { ORDER_LIST, ORDER_SCREEN_orderList } from "../constants";
import Swal from "sweetalert2";
import { brown } from "@mui/material/colors";
import { domain } from "../../env";
import { Colors } from "../../styles/theme";

export const orderlistSelectAction =
  (mode, orderId, aiTrainingState, orderListData) => (dispatch) => {
    if (mode === "close" || mode === "orderDetail") {
      const [OrderData] = orderListData.filter((order) => order.id === orderId);

      dispatch({
        type: ORDER_SCREEN_orderList.multipleData,
        mode: "orderDetail",
        payload: {
          mode: "orderDetail",
          orderId: [orderId],
          aiTrainingState,
          aiCurrentData:
            aiTrainingState === "finish_training"
              ? OrderData.aiTraining_order
              : "",
          orderCurrentData: {
            name: OrderData.name,
            createdAt: OrderData.createdAt,
            orderItem: OrderData.orderItem,
          },
        },
      });
    } else if (mode === "multipleOrder") {
      dispatch({
        type: ORDER_SCREEN_orderList.multipleData,
        mode,
        payload: {
          mode,
          orderId,
        },
      });
    }
  };

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

      const { data } = await axios.post(`${domain}/api/aiTraining/`, {
        orderId,
      });

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
        axios
          .post(`${domain}/api/aiTraining/`, {
            orderId,
            mode: "error",
          })
          .then(() => {
            window.location.reload();
          });
      });
    }
  };

export const functionAreaModeAction = (mode) => (dispatch) => {
  dispatch({
    type: ORDER_SCREEN_orderList.mode,
    payload: mode,
  });

  if (mode === "orderDetail" || mode === "multipleOrder") {
    dispatch({
      type: ORDER_SCREEN_orderList.orderId,
      payload: [],
    });
  }
};

export const functionAreaNavButtonAction =
  (mode, orderSelectId, aiTrainingState) => (dispatch) => {
    dispatch({
      type: ORDER_SCREEN_orderList.mode,
      payload: mode,
    });

    if (aiTrainingState === "is_training") {
      dispatch(aiTrainingAction(orderSelectId, aiTrainingState));
    }

    if (mode === "multipleOrder") {
      Swal.fire({
        title: "請輸入多單名稱",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "送出",
        cancelButtonText: "返回",
        showLoaderOnConfirm: true,
        preConfirm: async (inputText) => {
          if (inputText === "") {
            return Swal.showValidationMessage(`請輸入名稱`);
          }
          try {
            const { data } = await axios.post(
              `${domain}/api/createMultipleOrder/`,
              { orderSelectId, inputText }
            );
            return data;
          } catch (error) {
            Swal.showValidationMessage(`${error.response.data.error_msg}`);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: "center",
            width: "16em",
            icon: "success",
            title: "建立成功",
            background: Colors.greyHover,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
    }
  };
