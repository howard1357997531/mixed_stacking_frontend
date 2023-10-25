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

function OperationInterfaceBox3() {
  const { detail: orderSelectDetail } = useSelector(
    (state) => state.robotControlScreen_orderSelect
  );

  const { mode: robotStateMode, text: robotStateText } = useSelector(
    (state) => state.robotControlScreen_robotState
  );

  const { mode: realtimeDataMode, count } = useSelector(
    (state) => state.robotControlScreen_realtimeData
  );

  const boxText = {
    detect: { text: "物件偵測中", color: Colors.darkGreenHover },
    correct: { text: "偵測正確", color: Colors.darkGreen },
    error: { text: "偵測錯誤", color: Colors.red },
    reset: { text: "重置", color: Colors.orange },
    prepare: { text: `準備操作第${count}個物件`, color: Colors.purple },
    operate: {
      text: `正在操作第${count}個物件`,
      color: Colors.yellow,
      animation: `${operateShowBoardTextAnimation} 1s ease infinite`,
    },
  };

  return (
    <TextShowBoard className="board">
      <img src="board.png" alt="board.png"></img>
      <TextShowBoardTextBox>
        {orderSelectDetail.length === 0 && (
          <TextShowBoardText sx={{ color: Colors.greyTextBlood }}>
            尚未選擇工單
          </TextShowBoardText>
        )}

        {orderSelectDetail.length !== 0 && robotStateMode === "inactivate" && (
          <>
            <TextShowBoardText sx={{ color: Colors.greyTextBlood }}>
              {robotStateText}
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

        {realtimeDataMode &&
          realtimeDataMode !== "prepare" &&
          realtimeDataMode !== "operate" && (
            <>
              <TextShowBoardText
                sx={{ color: boxText[realtimeDataMode]["color"] }}
              >
                {boxText[realtimeDataMode]["text"]}
              </TextShowBoardText>
              {realtimeDataMode === "detect" && (
                <Dot dotColor={boxText[realtimeDataMode]["color"]} />
              )}
            </>
          )}

        {realtimeDataMode &&
          (realtimeDataMode === "prepare" ||
            realtimeDataMode === "operate") && (
            <>
              <TextShowBoardText
                sx={{
                  color: boxText[realtimeDataMode]["color"],
                  animation: boxText[realtimeDataMode]["animation"]
                    ? boxText[realtimeDataMode]["animation"]
                    : "none",
                }}
              >
                {boxText[realtimeDataMode]["text"]}
              </TextShowBoardText>
              {realtimeDataMode === "prepare" && (
                <Dot dotColor={boxText[realtimeDataMode]["color"]} />
              )}
            </>
          )}
      </TextShowBoardTextBox>
    </TextShowBoard>
  );
}

export default OperationInterfaceBox3;
