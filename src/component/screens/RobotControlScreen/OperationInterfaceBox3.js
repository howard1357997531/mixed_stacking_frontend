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
import { operateShowBoardTextAnimation } from "../../../animation";

function OperationInterfaceBox3({
  robotStateMode,
  realtimeItemMode,
  realtimeItemCount,
}) {
  const { text: robotStateText, pause: robotStatePause } = useSelector(
    (state) => state.robotControlScreen_robotState
  );

  const { executeOrderId: executeOrderIdArray } = useSelector(
    (state) => state.robotControlScreen_robotExecutionList
  );

  const boxText = {
    // realtimeVisual
    detect: { text: "物件偵測中", color: Colors.darkGreenHover },
    correct: { text: "偵測正確", color: Colors.darkGreen },
    error: { text: "偵測錯誤", color: Colors.red },
    // robotState
    reset: { text: "已重置", color: Colors.orange },
    prepare: {
      text: `準備操作第${realtimeItemCount}個物件`,
      color: Colors.purple,
    },
    operate: {
      text: `正在操作第${realtimeItemCount}個物件`,
      color: Colors.yellow,
      animation: `${operateShowBoardTextAnimation} 1s ease infinite`,
    },
  };

  return (
    <TextShowBoard className="board">
      <img src="board.png" alt="board.png"></img>
      <TextShowBoardTextBox>
        {executeOrderIdArray.length === 0 && (
          <TextShowBoardText sx={{ color: Colors.greyTextBlood }}>
            尚未選擇工單
          </TextShowBoardText>
        )}

        {executeOrderIdArray.length !== 0 &&
          robotStateMode === "inactivate" && (
            <>
              <TextShowBoardText sx={{ color: Colors.greyTextBlood }}>
                {robotStateText}
              </TextShowBoardText>
            </>
          )}

        {!realtimeItemMode && ["activate", "reset"].includes(robotStateMode) ? (
          <>
            <TextShowBoardText
              sx={{
                color:
                  robotStateMode === "activate" ? Colors.blue : Colors.orange,
              }}
            >
              {robotStateMode === "activate" ? "啟動手臂中" : "已重置"}
            </TextShowBoardText>
            {robotStateMode === "activate" ? (
              <Dot dotColor={Colors.blue} />
            ) : null}
          </>
        ) : null}

        {realtimeItemMode && (
          <>
            <TextShowBoardText
              sx={{
                color: boxText[robotStateMode]["color"],
                animation: boxText[robotStateMode]["animation"]
                  ? boxText[robotStateMode]["animation"]
                  : "none",
              }}
            >
              {robotStatePause ? "暫停" : boxText[robotStateMode]["text"]}
            </TextShowBoardText>
            {robotStateMode === "prepare" && (
              <Dot dotColor={boxText[robotStateMode]["color"]} />
            )}
          </>
        )}
      </TextShowBoardTextBox>
    </TextShowBoard>
  );
}

export default OperationInterfaceBox3;
