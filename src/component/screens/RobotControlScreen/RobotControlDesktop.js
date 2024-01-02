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
import { boxMove, boxMove2 } from "../../../animation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

  const ImageBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== "data",
  })(({ theme, data }) => ({
    boxSizing: "border-box",
    position: "absolute",
    top: "50%",
    left: "calc(100% - 100px)",
    transform: "translateY(-50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90px",
    height: "50px",
    borderRadius: "5px",
    zIndex: 3,
    color: data[0] ? "#fff" : Colors.greyTextBlood,
    backgroundColor: data[0] ? data[1] : "#fff",
    boxShadow:
      "0px 0px 8px rgba(0, 0, 0, 0.4) inset, 0px 0px 2px rgba(0, 0, 0, 0.2) inset",
  }));

  const ImageBox2 = styled(Box, {
    shouldForwardProp: (prop) => prop !== "data",
  })(({ theme, data }) => ({
    boxSizing: "border-box",
    position: "absolute",
    top: "50%",
    left: "calc(100% - 200px)",
    transform: "translateY(-50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90px",
    height: "50px",
    borderRadius: "8px",
    zIndex: 3,
    // animation: `${boxMove2} 5s`,
    // animationDelay: "1s",
    color: data[0] ? "#fff" : Colors.greyTextBlood,
    backgroundColor: data[0] ? data[1] : "#fff",
    boxShadow:
      "0px 0px 8px rgba(0, 0, 0, 0.4) inset, 0px 0px 2px rgba(0, 0, 0, 0.2) inset",
  }));

  const ImageBox3 = styled(Box, {
    shouldForwardProp: (prop) => prop !== "data",
  })(({ theme, data }) => ({
    boxSizing: "border-box",
    position: "absolute",
    top: "50%",
    left: "calc(100% - 300px)",
    transform: "translateY(-50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90px",
    height: "50px",
    borderRadius: "8px",
    zIndex: 3,
    // animation: `${boxMove2} 5s`,
    // animationDelay: "1s",
    color: data[0] ? "#fff" : Colors.greyTextBlood,
    backgroundColor: data[0] ? data[1] : "#fff",
    boxShadow:
      "0px 0px 8px rgba(0, 0, 0, 0.4) inset, 0px 0px 2px rgba(0, 0, 0, 0.2) inset",
  }));

  const ImageBox4 = styled(Box, {
    shouldForwardProp: (prop) => prop !== "data",
  })(({ theme, data }) => ({
    boxSizing: "border-box",
    position: "absolute",
    top: "50%",
    left: "calc(100% - 400px)",
    transform: "translateY(-50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90px",
    height: "50px",
    // backgroundColor: "#fff",
    borderRadius: "8px",
    zIndex: 3,
    // animation: `${boxMove2} 5s`,
    // animationDelay: "1s",
    color: data[0] ? "#fff" : Colors.greyTextBlood,
    backgroundColor: data[0] ? data[1] : "#fff",
    boxShadow:
      "0px 0px 8px rgba(0, 0, 0, 0.4) inset, 0px 0px 2px rgba(0, 0, 0, 0.2) inset",
  }));

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
  const is_buffer = ["suc", "err"];
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
          mode={!["inactivate", "reset"].includes(props.robotStateMode)}
        >
          <InformationAreaTitle {...props} />

          <InformationAreaContent {...props} />

          {/* <InformationAreaBottom {...props} /> */}
        </InformationAreaBox>

        {!["inactivate", "reset"].includes(props.robotStateMode) ? (
          <BoardBox>
            <img className="board" src="conveyor.png" alt="conveyor.png"></img>
            <VisualBox>
              {realtimeVisualResult &&
              realtimeVisualResult[0] &&
              realtimeVisualResult[0] !== "#0" ? (
                <ImageBox data={[motionList[0], boxColor[0]]}>
                  <Typography>{realtimeVisualResult[0]}</Typography>
                </ImageBox>
              ) : null}

              {realtimeVisualResult && realtimeVisualResult[1] ? (
                <ImageBox2 data={[motionList[1], boxColor[1]]}>
                  <Typography>{realtimeVisualResult[1]}</Typography>
                </ImageBox2>
              ) : null}

              {realtimeVisualResult && realtimeVisualResult[2] ? (
                <ImageBox3 data={[motionList[2], boxColor[2]]}>
                  <Typography>{realtimeVisualResult[2]}</Typography>
                </ImageBox3>
              ) : null}

              {realtimeVisualResult && realtimeVisualResult[3] ? (
                <ImageBox4 data={[motionList[3], boxColor[3]]}>
                  <Typography>{realtimeVisualResult[3]}</Typography>
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
