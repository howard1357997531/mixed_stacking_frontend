import React from "react";
import {
  TextShowBoard,
  TextShowBoardText,
  TextShowBoardTextBox,
} from "../../../styles/RobotControlScreen";
import "./css/OperationInterface.css";
import { useSelector } from "react-redux";
import { Colors } from "../../../styles/theme";
import Dot from "../../../tool/Dot";

function OperationInterfaceBox3() {
  const { detail } = useSelector(
    (state) => state.robotControlScreen_orderSelect
  );

  const { mode: robotStateMode } = useSelector(
    (state) => state.robotControlScreen_robotState
  );

  const { mode: realtimeDataMode, count } = useSelector(
    (state) => state.robotControlScreen_realtimeData
  );

  return (
    <TextShowBoard className="board">
      <img src="board.png" alt="board.png"></img>
      <TextShowBoardTextBox>
        {detail.length === 0 && (
          <TextShowBoardText sx={{ color: Colors.geryText }}>
            尚未選擇工單
          </TextShowBoardText>
        )}

        {detail.length !== 0 && robotStateMode === "inactivate" && (
          <>
            <TextShowBoardText sx={{ color: Colors.geryText }}>
              已選擇工單
            </TextShowBoardText>
          </>
        )}

        {!realtimeDataMode && robotStateMode === "activate" && (
          <>
            <TextShowBoardText sx={{ color: Colors.blue }}>
              啟動手臂中
            </TextShowBoardText>
            <Dot dotColor={Colors.blue} />
          </>
        )}

        {realtimeDataMode && realtimeDataMode === "prepare" && (
          <>
            <TextShowBoardText
              sx={{ color: Colors.purple }}
            >{`準備操作第${count}個物件`}</TextShowBoardText>
            <Dot dotColor={Colors.purple} />
          </>
        )}

        {realtimeDataMode && realtimeDataMode === "operate" && (
          <TextShowBoardText
            sx={{ color: Colors.yellow }}
          >{`正在操作第${count}個物件`}</TextShowBoardText>
        )}
      </TextShowBoardTextBox>
    </TextShowBoard>
  );
}

export default OperationInterfaceBox3;
