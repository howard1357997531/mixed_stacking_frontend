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
  const { pause: robotStatePause } = useSelector(
    (state) => state.robotControlScreen_robotState
  );

  const { executeOrderId: executeOrderIdArray, queue } = useSelector(
    (state) => state.robotControlScreen_robotExecutionList
  );

  const boxText = {
    inactivate: { text: "已選擇工單", color: Colors.greyTextBlood },
    prepare: {
      text: `準備操作第${realtimeItemCount}個物件`,
      color: Colors.purple,
    },
    operate: {
      text: `正在操作第${realtimeItemCount}個物件`,
      color: Colors.darkGreenHover,
      animation: `${operateShowBoardTextAnimation} 1s ease infinite`,
    },
    pause: {
      text: `暫停`,
      color: Colors.red800,
    },
    success: {
      // text: `預備執行第 ${queue + 1} 份工單`,
      text: `待機中`,
      color: Colors.darkGreenHover,
    },
    reset: {
      text: `已中斷，待機中`,
      color: Colors.softOrange,
    },
    autoSuccess: {
      text: `準備自動取回所有物件`,
      color: Colors.blue500,
    },
    autoRetrieve: {
      text: `正在取回所有物件`,
      color: Colors.darkGreenHover,
      animation: `${operateShowBoardTextAnimation} 1s ease infinite`,
    },
    autoRetrieveSuccess: {
      text: `準備自動執行下一單`,
      color: Colors.darkGreenHover,
    },
    buffer: { text: "錯誤!! 夾至 Buffer 區", color: Colors.red800 },
    buffer_to_main: {
      text: `從 Buffer 夾第${realtimeItemCount}個物件至棧板`,
      color: Colors.darkGreenHover,
      animation: `${operateShowBoardTextAnimation} 1s ease infinite`,
    },
  };

  return (
    <TextShowBoard>
      <img className="board" src="board.png" alt="board.png"></img>
      <TextShowBoardTextBox>
        {executeOrderIdArray.length === 0 && (
          <TextShowBoardText sx={{ color: Colors.greyTextBlood }}>
            尚未選擇工單
          </TextShowBoardText>
        )}

        {executeOrderIdArray.length !== 0 &&
          [
            "inactivate",
            "success",
            "reset",
            "autoSuccess",
            "autoRetrieveSuccess",
          ].includes(robotStateMode) && (
            <>
              <TextShowBoardText
                sx={{ color: boxText[robotStateMode]["color"] }}
              >
                {boxText[robotStateMode]["text"]}
              </TextShowBoardText>

              {robotStateMode !== "inactivate" ? (
                <Dot
                  dotColor={
                    ["success", "autoRetrieveSuccess"].includes(robotStateMode)
                      ? Colors.darkGreenHover
                      : robotStateMode === "autoSuccess"
                      ? Colors.blue500
                      : Colors.softOrange
                  }
                />
              ) : null}
            </>
          )}

        {!realtimeItemMode && ["activate"].includes(robotStateMode) ? (
          <>
            <TextShowBoardText
              sx={{
                color: Colors.blue500,
              }}
            >
              {"啟動手臂中"}
            </TextShowBoardText>
            {robotStateMode === "activate" ? (
              <Dot dotColor={Colors.blue500} />
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
              {boxText[robotStateMode]["text"]}
            </TextShowBoardText>

            {["prepare"].includes(robotStateMode) && !robotStatePause ? (
              <Dot dotColor={boxText[robotStateMode]["color"]} />
            ) : null}
          </>
        )}
      </TextShowBoardTextBox>
    </TextShowBoard>
  );
}

export default OperationInterfaceBox3;
