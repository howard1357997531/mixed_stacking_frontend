import React from "react";
import { InformationAreaTitleBox } from "../../../styles/RobotControlScreen";
import { Box, Typography, styled } from "@mui/material";
import { Colors } from "../../../styles/theme";

function InformationAreaTitle() {
  const Title = styled(Box)(({ theme }) => ({
    fontWeight: 600,
    fontSize: "24px",
    color: Colors.geryText,
  }));
  return (
    <InformationAreaTitleBox>
      <Title>123</Title>
    </InformationAreaTitleBox>
  );
}

export default InformationAreaTitle;
