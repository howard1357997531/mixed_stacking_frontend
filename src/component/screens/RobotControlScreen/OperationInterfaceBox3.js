import React from "react";
import {
  TextShowBoard,
  TextShowBoardText,
  TextShowBoardTextBox,
} from "../../../styles/RobotControlScreen";
import "./css/OperationInterface.css";
import { useSelector } from "react-redux";

function OperationInterfaceBox3() {
  const { mode, count } = useSelector(
    (state) => state.robotControlScreen_realtimeData
  );

  return (
    <TextShowBoard className="board">
      <img src="board.png" alt="board.png"></img>
      <TextShowBoardTextBox>
        <TextShowBoardText>
          {mode === null && "stop"}
          {mode === "prepare" && `準備操作第${count}個物件`}
          {mode === "operate" && `正在操作第${count}個物件`}
        </TextShowBoardText>
      </TextShowBoardTextBox>
    </TextShowBoard>
  );
}

export default OperationInterfaceBox3;
