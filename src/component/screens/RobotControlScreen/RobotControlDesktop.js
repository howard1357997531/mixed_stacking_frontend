import React from "react";
import {
  RobotControlContainer,
  OperationInterface,
  InformationArea,
  InformationAreaBox,
} from "../../../styles/RobotControlScreen";
import OperationInterfaceBox1 from "./OperationInterfaceBox1";
import OperationInterfaceBox2 from "./OperationInterfaceBox2";
import OperationInterfaceBox3 from "./OperationInterfaceBox3";
import InformationAreaTitle from "./InformationAreaTitle";
import InformationAreaContent from "./InformationAreaContent";
import InformationAreaBottom from "./InformationAreaBottom";
import "./css/OperationInterface.css";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Colors } from "../../../styles/theme";

function RobotControlDesktop(props) {
  const BoardBox = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "100%",
    height: "20%",
  }));

  const VisualBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    // backgroundColor: Colors.red,
  }));

  const Text = styled(Typography)(({ theme }) => ({
    padding: "0px 10px",
  }));
  return (
    <RobotControlContainer>
      <OperationInterface className="operation-interface">
        <OperationInterfaceBox1 {...props} />

        <OperationInterfaceBox2 />

        <OperationInterfaceBox3 {...props} />
      </OperationInterface>

      <InformationArea className="information-area">
        <InformationAreaBox
          mode={!["inactivate", "reset"].includes(props.robotStateMode)}
        >
          <InformationAreaTitle {...props} />

          <InformationAreaContent {...props} />

          <InformationAreaBottom {...props} />
        </InformationAreaBox>

        {/* {!["inactivate", "reset"].includes(props.robotStateMode) ? (
          <BoardBox>
            <img className="board" src="board.png" alt="board.png"></img>
            <VisualBox>
              <Text>123</Text>
              <Text>123</Text>
            </VisualBox>
          </BoardBox>
        ) : null} */}
      </InformationArea>
    </RobotControlContainer>
  );
}

export default RobotControlDesktop;
