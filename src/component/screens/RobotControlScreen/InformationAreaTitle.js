import React from "react";
import {
  InformationAreaTitleBox,
  OrderListTitleButton,
} from "../../../styles/RobotControlScreen";
import { Avatar, Box, styled } from "@mui/material";
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
    display: "flex",
    alignItems: "center",
    fontWeight: 600,
    fontSize: "20px",
    color: Colors.greyTextBlood,
    [theme.breakpoints.down("sm")]: {
      fontSize: 18,
    },
  }));

  const StyleAvatar = styled(Avatar)({
    display: "inline-flex",
    width: "22px",
    height: "22px",
    fontSize: 13,
    margin: "0px 5px",
    color: Colors.lightOrange,
    backgroundColor: Colors.blue500,
  });

  const dispatch = useDispatch();

  const { data: multipleOrderSelectData } = useSelector(
    (state) => state.robotControlScreen_multipleOrderSelect
  );

  const { isDoing, executeOrderId, queue } = robotExecutionData;

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

      {informationAreaMode === "executeOrder" && isDoing ? (
        <Title>
          <span>{`即將執行第`}</span>
          <StyleAvatar>{`${queue + 1}`}</StyleAvatar>
          <span>{`份工單`}</span>
        </Title>
      ) : null}

      {informationAreaMode === "success" && executeOrderId.length !== 0 ? (
        <OrderListTitleButton onClick={() => changeModeHandler("executeOrder")}>
          待執行工單
        </OrderListTitleButton>
      ) : null}
    </InformationAreaTitleBox>
  );
}

export default InformationAreaTitle;
