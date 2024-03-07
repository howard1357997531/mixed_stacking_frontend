import React from "react";
import {
  RobotControlContainer,
  OperationInterface,
  InformationArea,
  InformationAreaBox,
  BoardBox,
  VisualBox,
  ImageBox,
  ImageBox2,
  ImageBox3,
  ImageBox4,
  ImageBoxText,
} from "../../../styles/RobotControlScreen";
import OperationInterfaceBox1 from "./OperationInterfaceBox1";
import OperationInterfaceBox2 from "./OperationInterfaceBox2";
import OperationInterfaceBox3 from "./OperationInterfaceBox3";
import InformationAreaTitle from "./InformationAreaTitle";
import InformationAreaContent from "./InformationAreaContent";
import InformationAreaBottom from "./InformationAreaBottom";
import { Colors } from "../../../styles/theme";
import { useSelector } from "react-redux";
import "./css/OperationInterface.css";

function RobotControlDesktop(props) {
  const { checkNumberlist } = useSelector(
    (state) => state.robotControlScreen_realtimeVisual
  );

  // console.log("checkNumberlist:", checkNumberlist);
  const realtimeVisualResult = [null, "#0"].includes(props.realtimeVisualResult)
    ? null
    : props.realtimeVisualResult;
  // const realtimeVisualResult = ["16", "18", "16", "18"];

  // checkNumberlist [1,1,2,2,3]
  if (checkNumberlist) {
    var motionList = checkNumberlist.filter((num) => num !== 3);
    if (motionList) {
      var boxColor = motionList.map((order) => {
        if (order === 1) {
          return Colors.swalGreen;
        } else {
          return Colors.red800;
        }
      });
    }
  }
  // console.log("motionList:", motionList);
  // console.log("boxColor:", boxColor);
  const orderSelectData = props.orderSelectData;
  const realtimeVisualCount = props.realtimeVisualCount;
  var compare = [];
  if (orderSelectData.length !== 0 && props.realtimeVisualResult) {
    var detectState = orderSelectData.aiTraining_order.split(",");
    const detectArea = detectState.slice(
      realtimeVisualCount - 1,
      realtimeVisualResult.length + realtimeVisualCount - 1
    );

    // console.log("result:", realtimeVisualResult);
    // console.log("detectArea:", detectArea);

    var count = 0;
    var compare = detectArea.map((detect, index) => {
      if (
        detect.replace("A", "") === realtimeVisualResult[count].replace("#", "")
      ) {
        count += 1;
        return detect;
      } else if (realtimeVisualResult[0] === "#0") {
        return "#0";
      } else {
        return "err";
      }
    });
    detectState.splice(realtimeVisualCount - 1, compare.length, ...compare);
  }

  // console.log(compare);

  return (
    <RobotControlContainer>
      <OperationInterface className="operation-interface">
        <OperationInterfaceBox1 {...props} />

        <OperationInterfaceBox2 />

        <OperationInterfaceBox3 {...props} />
      </OperationInterface>

      <InformationArea className="information-area">
        <InformationAreaBox
          mode={
            ![
              "inactivate",
              "success",
              "reset",
              "autoSuccess",
              "autoRetrieveSuccess",
            ].includes(props.robotStateMode)
          }
        >
          <InformationAreaTitle {...props} />

          <InformationAreaContent {...props} />

          {/* <InformationAreaBottom {...props} /> */}
        </InformationAreaBox>

        {![
          "inactivate",
          "success",
          "reset",
          "autoSuccess",
          "autoRetrieveSuccess",
        ].includes(props.robotStateMode) ? (
          <BoardBox>
            <img className="board" src="conveyor.png" alt="conveyor.png"></img>
            <VisualBox>
              {realtimeVisualResult &&
              realtimeVisualResult[0] &&
              realtimeVisualResult[0] !== "#0" ? (
                <ImageBox data={[motionList[0], boxColor[0]]}>
                  <ImageBoxText>{realtimeVisualResult[0]}</ImageBoxText>
                </ImageBox>
              ) : null}

              {realtimeVisualResult && realtimeVisualResult[1] ? (
                <ImageBox2 data={[motionList[1], boxColor[1]]}>
                  <ImageBoxText>{realtimeVisualResult[1]}</ImageBoxText>
                </ImageBox2>
              ) : null}

              {realtimeVisualResult && realtimeVisualResult[2] ? (
                <ImageBox3 data={[motionList[2], boxColor[2]]}>
                  <ImageBoxText>{realtimeVisualResult[2]}</ImageBoxText>
                </ImageBox3>
              ) : null}

              {realtimeVisualResult && realtimeVisualResult[3] ? (
                <ImageBox4 data={[motionList[3], boxColor[3]]}>
                  <ImageBoxText>{realtimeVisualResult[3]}</ImageBoxText>
                </ImageBox4>
              ) : null}
            </VisualBox>
          </BoardBox>
        ) : null}
      </InformationArea>
    </RobotControlContainer>
  );
}

export default RobotControlDesktop;
