import React from "react";
import {
  InformationAreaTitleBox,
  OrderListTitleButton,
} from "../../../styles/RobotControlScreen";
import { Box, styled } from "@mui/material";
import { Colors } from "../../../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { ROBOT_CONTROL_SCREEN } from "../../../redux/constants";

function InformationAreaBottom({ informationAreaMode, robotExecutionData }) {
  const Title = styled(Box)(({ theme }) => ({
    fontWeight: 600,
    fontSize: "24px",
    color: Colors.geryText,
  }));

  const { name, queue } = robotExecutionData;

  return (
    <InformationAreaTitleBox>
      {informationAreaMode === "order" && (
        <Title>{`執行進度 (${queue} / ${name.length})`}</Title>
      )}
    </InformationAreaTitleBox>
  );
}

export default InformationAreaBottom;
