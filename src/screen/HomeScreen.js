import React, { useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import HomeDesktop from "../component/screens/HomeScreen/HomeDesktop";
import HomeMobile from "../component/screens/HomeScreen/HomeMobile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ORDER_SCREEN, TOAST } from "../redux/constants";
import { InfoBtnToast } from "../swal";

function HomeScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { aiTrainingToast, aiTrainingId } = useSelector((state) => state.toast);

  const btnClick = () => {
    return dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: {
        mode: "aiResult",
        orderId: aiTrainingId,
        aiTrainingState: "finish_training",
      },
    });
  };

  const route = () => {
    navigate("/order");
  };

  useEffect(() => {
    if (aiTrainingToast) {
      dispatch({
        type: TOAST.aiTraining,
        payload: { aiTrainingToast: false },
      });

      InfoBtnToast("success", "工單演算完成", btnClick, route);
    }
  }, [aiTrainingToast]);

  return (
    <>
      {matches ? (
        <HomeDesktop matches={matches} />
      ) : (
        <HomeMobile matches={matches} />
      )}
    </>
  );
}

export default HomeScreen;
