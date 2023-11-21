import axios from "axios";
import {
  MULTIPLE_ORDER_LIST,
  ORDER_LIST,
  ORDER_SCREEN_orderList,
} from "../constants";
import Swal from "sweetalert2";
import { brown } from "@mui/material/colors";
import { domain } from "../../env";
import { Colors } from "../../styles/theme";
import { confirmSwal } from "./swal/RobotControlScreenActionSwal";

export const orderlistSelectAction =
  (mode, orderId, aiTrainingState, orderListData) => (dispatch) => {
    if (
      mode === "multipleOrderCreate" &&
      aiTrainingState !== "finish_training"
    ) {
      Swal.fire({
        position: "center",
        width: "16em",
        icon: "warning",
        title: "只能選擇已訓練工單",
        background: brown[400],
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (["close", "orderDetail", "aiResult"].includes(mode)) {
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
    } else if (mode === "multipleOrderCreate") {
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

export const multipleOrderListSelectAction = (orderId) => (dispatch) => {
  dispatch({
    type: MULTIPLE_ORDER_LIST.orderId,
    payload: orderId,
  });
};

// 寫如果不是在orderDetail 不會強制顯示ai結算畫面
export const aiTrainingAction =
  (mode, orderId, aiTrainingState) => async (dispatch) => {
    dispatch({
      type: ORDER_SCREEN_orderList.aiTrainingState,
      payload: aiTrainingState,
    });

    dispatch({
      type: ORDER_LIST.aiTrainingStateChange,
      payload: { orderId, aiTrainingState },
    });

    try {
      var { data } = await axios.post(`${domain}/api/aiTraining/`, {
        orderId,
      });
    } catch (error) {
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

    dispatch({
      type: ORDER_LIST.aiTrainingOrderAdd,
      payload: { orderId, data: data.aiResult_str },
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
      type: ORDER_SCREEN_orderList.aiCurrentData,
      payload: data.aiResult_str,
    });

    dispatch({
      type: ORDER_SCREEN_orderList.currentPageCheck,
    });
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
  (changeMode, orderSelectIdArray, aiTrainingState) => (dispatch) => {
    if (changeMode !== "multipleOrder") {
      dispatch({
        type: ORDER_SCREEN_orderList.mode,
        payload: changeMode,
      });
    } else {
      // 組合單建立
      if (orderSelectIdArray.length === 0) {
        Swal.fire({
          position: "center",
          width: "16em",
          icon: "warning",
          title: "尚未選擇供單",
          background: Colors.brown,
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
    }

    if (aiTrainingState === "no_training") {
      confirmSwal("執行 AI 演算?").then((result) => {
        if (result.isConfirmed) {
          dispatch(
            aiTrainingAction(changeMode, orderSelectIdArray[0], "is_training")
          );
        }
      });
    }

    if (changeMode === "multipleOrder") {
      Swal.fire({
        title: "請輸入組合單名稱",
        input: "text",
        background: Colors.darkGreen,
        // color: "#fff",
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
              { orderSelectIdArray, inputText }
            );

            dispatch({
              type: MULTIPLE_ORDER_LIST.addData,
              payload: data,
            });
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
            background: Colors.darkGreen,
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            dispatch({
              type: ORDER_SCREEN_orderList.orderId,
              payload: [],
            });

            dispatch({
              type: ORDER_SCREEN_orderList.mode,
              payload: changeMode,
            });
          });
        }
      });
    }
  };
