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
  robotExecutionData,
}) {
  const Title = styled(Box)(({ theme }) => ({
    fontWeight: 600,
    fontSize: "20px",
    color: Colors.greyText,
  }));

  const dispatch = useDispatch();

  const { data: multipleOrderSelectData } = useSelector(
    (state) => state.robotControlScreen_multipleOrderSelect
  );

  const { isDoing, executeOrderId } = robotExecutionData;

  const changeModeHandler = (mode) => {
    dispatch({
      type: ROBOT_CONTROL_SCREEN.informationArea,
      payload: { mode },
    });
  };
  return (
    <InformationAreaTitleBox>
      {informationAreaMode === "order" && robotStateMode !== "activate" ? (
        <Title>{orderSelectData.name}</Title>
      ) : null}

      {informationAreaMode === "multipleOrder" && !isDoing ? (
        <Title>{multipleOrderSelectData.name}</Title>
      ) : null}

      {informationAreaMode === "multipleOrder" && isDoing ? (
        <Title>待執行工單</Title>
      ) : null}

      {informationAreaMode === "picture" && robotStateMode !== "activate" && (
        <OrderListTitleButton onClick={() => changeModeHandler("order")}>
          清單
        </OrderListTitleButton>
      )}

      {informationAreaMode === "success" && executeOrderId.length !== 0 ? (
        <OrderListTitleButton
          onClick={() => changeModeHandler("multipleOrder")}
        >
          待執行工單
        </OrderListTitleButton>
      ) : null}
    </InformationAreaTitleBox>
  );
}

export default InformationAreaTitle;
