import React from "react";
import { InformationAreaTitleBox } from "../../../styles/RobotControlScreen";
import { Box, styled } from "@mui/material";
import { Colors } from "../../../styles/theme";

function InformationAreaBottom({
  robotStateMode,
  informationAreaMode,
  robotExecutionData,
}) {
  const Title = styled(Box)(({ theme }) => ({
    fontWeight: 600,
    fontSize: "20px",
    color: Colors.darkGreenHover,
  }));

  const { isDoing, name, queue } = robotExecutionData;

  return (
    <InformationAreaTitleBox>
      {robotStateMode !== "activate" &&
      !["success"].includes(informationAreaMode) &&
      isDoing ? (
        <Title>{`執行進度 (${queue} / ${name.length})`}</Title>
      ) : null}
    </InformationAreaTitleBox>
  );
}

export default InformationAreaBottom;
