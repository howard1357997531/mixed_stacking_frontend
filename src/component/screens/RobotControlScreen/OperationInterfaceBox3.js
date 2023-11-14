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
    inactivate: { text: "已選擇工單", color: Colors.greyTextBlood },
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
    finish: { text: "已結束", color: Colors.greyTextBlood },
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
          ["inactivate", "reset"].includes(robotStateMode) && (
            <>
              <TextShowBoardText
                sx={{ color: boxText[robotStateMode]["color"] }}
              >
                {robotStateText}
              </TextShowBoardText>
            </>
          )}

        {!realtimeItemMode && ["activate"].includes(robotStateMode) ? (
          <>
            <TextShowBoardText
              sx={{
                color: Colors.blue,
              }}
            >
              {"啟動手臂中"}
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
            {robotStateMode === "prepare" && !robotStatePause ? (
              <Dot dotColor={boxText[robotStateMode]["color"]} />
            ) : null}
          </>
        )}
      </TextShowBoardTextBox>
    </TextShowBoard>
  );
}

export default OperationInterfaceBox3;
