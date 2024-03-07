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
    "@media screen and (orientation: portrait)": {
      fontSize: 18,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  }));

  const StyleAvatar = styled(Avatar)(({ theme }) => ({
    display: "inline-flex",
    width: "22px",
    height: "22px",
    fontSize: 12,
    margin: "0px 5px",
    color: Colors.lightOrange,
    backgroundColor: Colors.blue500,
    [theme.breakpoints.down("sm")]: {
      width: "18px",
      height: "18px",
      fontSize: 12,
    },
  }));

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

  if (
    ["inactivate", "success", "reset", "autoRetrieveSuccess"].includes(
      robotStateMode
    )
  ) {
    var executeText = `預備執行第`;
    var executeQueue = queue + 1;
  } else if (["autoSuccess"].includes(robotStateMode)) {
    var executeText = `預備取回第`;
    var executeQueue = queue;
  } else if (["autoRetrieve"].includes(robotStateMode)) {
    var executeText = `正在取回第`;
    var executeQueue = queue;
  } else if (robotStateMode !== "activate") {
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

      {informationAreaMode === "executeOrder" &&
      robotStateMode !== "activate" &&
      isDoing ? (
        <Title>
          <span>{executeText}</span>
          <StyleAvatar>{executeQueue}</StyleAvatar>

          <span>
            {["autoSuccess", "autoRetrieve"].includes(robotStateMode)
              ? `份工單物件`
              : `份工單`}
          </span>
        </Title>
      ) : null}

      {/* 手臂停機中階段 */}
      {/* informationAreaMode 的 autoSuccess 會直接用 success */}
      {["success", "reset", "autoSuccess", "autoRetrieveSuccess"].includes(
        robotStateMode
      ) &&
      ["success", "reset", "autoRetrieveSuccess"].includes(
        informationAreaMode
      ) &&
      executeOrderId.length !== 0 &&
      isDoing ? (
        <OrderListTitleButton onClick={() => changeModeHandler("executeOrder")}>
          執行清單
        </OrderListTitleButton>
      ) : null}

      {/* 手臂執行中階段 */}
      {![
        "activate",
        "success",
        "reset",
        "autoSuccess",
        "autoRetrieveSuccess",
      ].includes(robotStateMode) &&
      executeOrderId.length !== 0 &&
      isDoing ? (
        <OrderListTitleButton
          onClick={() =>
            changeModeHandler(
              informationAreaMode === "order" ? "executeOrder" : "order"
            )
          }
        >
          {["order", "autoRetrieve"].includes(informationAreaMode)
            ? "執行清單"
            : "返回"}
        </OrderListTitleButton>
      ) : null}

      {/* 手臂執行中階段 */}
      {["autoRetrieve"].includes(robotStateMode) &&
      executeOrderId.length !== 0 &&
      isDoing ? (
        <OrderListTitleButton
          onClick={() =>
            changeModeHandler(
              informationAreaMode === "autoRetrieve"
                ? "executeOrder"
                : "autoRetrieve"
            )
          }
        >
          {["autoRetrieve"].includes(informationAreaMode) ? "執行清單" : "返回"}
        </OrderListTitleButton>
      ) : null}
    </InformationAreaTitleBox>
  );
}

export default InformationAreaTitle;
