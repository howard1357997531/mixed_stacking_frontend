import React from "react";
import {
  TextShowBoard,
  TextShowBoardText,
  TextShowBoardTextBox,
} from "../../../styles/RobotControlScreen";
import "./css/OperationInterface.css";

function OperationInterfaceBox3() {
  return (
    <TextShowBoard className="board">
      <img src="board.png" alt="board.png"></img>
      <TextShowBoardTextBox>
        <TextShowBoardText>123456</TextShowBoardText>
      </TextShowBoardTextBox>
    </TextShowBoard>
  );
}

export default OperationInterfaceBox3;
