import React from "react";
import {
  InformationAreaTitleBox,
  OrderListTitleButton,
} from "../../../styles/RobotControlScreen";
import { Box, Typography, styled } from "@mui/material";
import { Colors } from "../../../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { ROBOT_CONTROL_SCREEN_informationArea } from "../../../redux/constants";

function InformationAreaTitle() {
  const Title = styled(Box)(({ theme }) => ({
    fontWeight: 600,
    fontSize: "24px",
    color: Colors.geryText,
  }));

  const dispatch = useDispatch();
  const { detail: orderList } = useSelector(
    (state) => state.robotControlScreen_orderSelect
  );
  const { mode } = useSelector(
    (state) => state.robotControlScreen_informationArea
  );

  const changeModeHandler = (mode) => {
    dispatch({
      type: ROBOT_CONTROL_SCREEN_informationArea.mode,
      payload: mode,
    });
  };
  return (
    <InformationAreaTitleBox>
      {mode === "order" && (
        <>
          <OrderListTitleButton onClick={() => changeModeHandler("picture")}>
            圖片
          </OrderListTitleButton>
          <Title>{orderList.name}</Title>
        </>
      )}

      {mode === "picture" && (
        <OrderListTitleButton onClick={() => changeModeHandler("order")}>
          清單
        </OrderListTitleButton>
      )}
    </InformationAreaTitleBox>
  );
}

export default InformationAreaTitle;
