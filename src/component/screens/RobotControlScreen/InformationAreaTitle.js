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
    fontSize: "18px",
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

  if (["inactivate", "success", "reset"].includes(robotStateMode)) {
    var executeText = `即將執行第`;
    var executeQueue = queue + 1;
  } else {
    var executeText = `正在執行第`;
    var executeQueue = queue;
  }
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
          <span>{executeText}</span>
          <StyleAvatar>{executeQueue}</StyleAvatar>
          <span>{`份工單`}</span>
        </Title>
      ) : null}

      {/* 手臂停機中階段 */}
      {["success", "reset"].includes(robotStateMode) &&
      informationAreaMode === "success" &&
      executeOrderId.length !== 0 &&
      isDoing ? (
        <OrderListTitleButton onClick={() => changeModeHandler("executeOrder")}>
          執行清單
        </OrderListTitleButton>
      ) : null}

      {/* 手臂執行中階段 */}
      {!["activate", "success", "reset"].includes(robotStateMode) &&
      executeOrderId.length !== 0 &&
      isDoing ? (
        <OrderListTitleButton
          onClick={() =>
            changeModeHandler(
              informationAreaMode === "order" ? "executeOrder" : "order"
            )
          }
        >
          {informationAreaMode === "order" ? "執行清單" : "返回"}
        </OrderListTitleButton>
      ) : null}
    </InformationAreaTitleBox>
  );
}

export default InformationAreaTitle;
