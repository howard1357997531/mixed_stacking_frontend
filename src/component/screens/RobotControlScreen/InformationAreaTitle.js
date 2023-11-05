import React from "react";
import {
  InformationAreaTitleBox,
  OrderListTitleButton,
} from "../../../styles/RobotControlScreen";
import { Box, styled } from "@mui/material";
import { Colors } from "../../../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { ROBOT_CONTROL_SCREEN } from "../../../redux/constants";

function InformationAreaTitle({
  orderSelectData,
  informationAreaMode,
  robotStateMode,
  realtimeItemMode,
}) {
  const Title = styled(Box)(({ theme }) => ({
    fontWeight: 600,
    fontSize: "24px",
    color: Colors.geryText,
  }));

  const dispatch = useDispatch();

  const { data: multipleOrderSelectData } = useSelector(
    (state) => state.robotControlScreen_multipleOrderSelect
  );

  const changeModeHandler = (mode) => {
    dispatch({
      type: ROBOT_CONTROL_SCREEN.informationArea,
      payload: { mode },
    });
  };
  return (
    <InformationAreaTitleBox>
      {informationAreaMode === "order" && (
        <>
          {realtimeItemMode && (
            <OrderListTitleButton onClick={() => changeModeHandler("picture")}>
              圖片
            </OrderListTitleButton>
          )}

          <Title>{orderSelectData.name}</Title>
        </>
      )}

      {informationAreaMode === "multipleOrder" ? (
        <Title>{multipleOrderSelectData.name}</Title>
      ) : null}

      {informationAreaMode === "picture" && robotStateMode !== "activate" && (
        <OrderListTitleButton onClick={() => changeModeHandler("order")}>
          清單
        </OrderListTitleButton>
      )}
    </InformationAreaTitleBox>
  );
}

export default InformationAreaTitle;
