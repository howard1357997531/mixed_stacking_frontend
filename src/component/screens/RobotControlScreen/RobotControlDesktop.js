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

  const ImageBox = styled(Box)(({ theme }) => ({
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
    backgroundColor: "#fff",
    borderRadius: "8px",
    zIndex: 3,
    // animation: `${boxMove} 5s`,
  }));

  const ImageBox2 = styled(Box)(({ theme }) => ({
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
    backgroundColor: "#fff",
    borderRadius: "8px",
    zIndex: 3,
    // animation: `${boxMove2} 5s`,
    // animationDelay: "1s",
  }));

  const ImageBox3 = styled(Box)(({ theme }) => ({
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
    backgroundColor: "#fff",
    borderRadius: "8px",
    zIndex: 3,
    // animation: `${boxMove2} 5s`,
    // animationDelay: "1s",
  }));

  const ImageBox4 = styled(Box)(({ theme }) => ({
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
    backgroundColor: "#fff",
    borderRadius: "8px",
    zIndex: 3,
    // animation: `${boxMove2} 5s`,
    // animationDelay: "1s",
  }));

  const { checkNumberlist } = useSelector(
    (state) => state.robotControlScreen_realtimeVisual
  );

  console.log(checkNumberlist);
  const realtimeVisualResult = [null, "#0"].includes(props.realtimeVisualResult)
    ? null
    : props.realtimeVisualResult;
  // const realtimeVisualResult = ["16", "18", "16", "18"];

  if (checkNumberlist) {
    const temp = checkNumberlist.filter((num) => num !== 3);
    if (temp) {
      var boxBorder = temp.map((order) => {
        if (order === 1) {
          return Colors.swalGreen;
        } else {
          return Colors.red800;
        }
      });
    }
  }
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
                <ImageBox sx={{ border: `7px solid ${boxBorder[0]}` }}>
                  <Typography>{realtimeVisualResult[0]}</Typography>
                </ImageBox>
              ) : null}

              {realtimeVisualResult && realtimeVisualResult[1] ? (
                <ImageBox2 sx={{ border: `7px solid ${boxBorder[1]}` }}>
                  <Typography>{realtimeVisualResult[1]}</Typography>
                </ImageBox2>
              ) : null}

              {realtimeVisualResult && realtimeVisualResult[2] ? (
                <ImageBox3 sx={{ border: `7px solid ${boxBorder[2]}` }}>
                  <Typography>{realtimeVisualResult[2]}</Typography>
                </ImageBox3>
              ) : null}

              {realtimeVisualResult && realtimeVisualResult[3] ? (
                <ImageBox4 sx={{ border: `7px solid ${boxBorder[3]}` }}>
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
