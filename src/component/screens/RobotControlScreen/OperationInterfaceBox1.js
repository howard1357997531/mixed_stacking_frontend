import React, { useEffect, useRef, useState } from "react";
import {
  FortyRadioHeightBox,
  FortyRadioWidthButton,
  OperationInterfaceButtonLogo,
  OperationInterfaceButtonText,
  SixtyRadioWidthButton,
  VisualIdentityBox,
  VisualIdentityNextObject,
  VisualIdentityNextObjectBox,
  VisualIdentityNextObjectTitle,
  VisualIdentityObject,
  VisualIdentityState,
  VisualIdentityStateText,
  VisualIdentityTitle,
} from "../../../styles/RobotControlScreen";
import { orange, red } from "@mui/material/colors";
import { Colors } from "../../../styles/theme";
import OrderListDialog from "./dialog/OrderListDialog";
import TextEffect2 from "../../../tool/TextEffect2";
import { Box, Slide } from "@mui/material";
import { domain } from "../../../env";
import { useDispatch, useSelector } from "react-redux";
import StackAndBufferDialog from "./dialog/StackAndBufferDialog";
import { basicSwal, timerToast } from "../../../swal";
import { ROBOT_CONTROL_SCREEN } from "../../../redux/constants";

// demo1 可能要把 realtime-Visual-Count 改成 realtimeItemCount
// 視覺辨識區要改 30% 70% fontSize: 26
// App.js box1 slider useEffect 也要修改
function OperationInterfaceBox1({
  orderSelectData,
  informationAreaMode,
  robotStateMode,
  realtimeItemMode,
  realtimeItemCount,
  realtimeVisualMode,
  realtimeVisualResult,
  realtimeVisualCount,
  objectName,
  objectNextName,
  robotExecutionData,
}) {
  const dispatch = useDispatch();
  // orderListDialog
  const [orderListDialogOpen, setOrderListDialogOpen] = useState(false);
  const onOrderListDialogOpen = (state) => {
    setOrderListDialogOpen(state);
  };

  // stackAndBufferDialog
  const [stackAndBufferOpen, setStackAndBufferOpen] = useState(false);
  const onStackAndBufferOpen = () => {
    setStackAndBufferOpen(false);
  };
  const stackAndBufferDialogOpenHandler = () => {
    if (
      [
        "inactivate",
        "success",
        "reset",
        "autoSuccess",
        "autoRetrieveSuccess",
      ].includes(robotStateMode)
    ) {
      basicSwal("warning", "手臂尚未啟動");
      return;
    } else if (informationAreaMode === "autoRetrieve") {
      basicSwal("warning", "收回物件中");
      return;
    }
    setStackAndBufferOpen(true);
  };

  const {
    isOpenBool,
    executeOrderId: executeOrderIdArray,
    queue,
  } = useSelector((state) => state.robotControlScreen_robotExecutionList);

  const itemCount = realtimeItemCount ? realtimeItemCount : 1;

  // if (orderSelectData.length !== 0) {
  //   console.log(orderSelectData.aiTraining_order.split(","));
  //   console.log("inner:", realtimeVisualResult);
  //   console.log("inner count", realtimeVisualCount);
  // }
  var compare = [];
  if (orderSelectData.length !== 0) {
    const detectState = orderSelectData.aiTraining_order.split(",");
    const detectArea = detectState.slice(
      realtimeVisualCount - 1,
      realtimeVisualResult.length + realtimeVisualCount - 1
    );
    var compare = detectArea.map((detect, index) => {
      if (
        detect.replace("A", "") === realtimeVisualResult[index].replace("#", "")
      ) {
        return detect;
      } else {
        return "err";
      }
    });
  }

  if (compare.at(0) === "err") {
    var VisualIdentityBoxColor = Colors.lightred;
    var VisualIdentityBoxHoverColor = Colors.lightredHover;
  } else {
    var VisualIdentityBoxColor = Colors.darkPink;
    var VisualIdentityBoxHoverColor = Colors.darkPinkHover;
  }
  // console.log("asd", compare);
  const realtimeAllText = () => {
    if (realtimeVisualMode === "detect") {
      return { text: "物件偵測中", color: Colors.greyTextBlood };
    } else {
      if (compare.at(0) === "err") {
        return { text: "偵測錯誤", color: red[100] };
      } else {
        return { text: "偵測正確", color: Colors.darkGreenHover };
      }
    }
  };

  if (orderSelectData.length !== 0) {
    if (["order", "picture"].includes(informationAreaMode)) {
      const orderTotal = orderSelectData.aiTraining_order.split(",").length;

      if (!realtimeItemMode && robotStateMode === "activate") {
        var visualTitle = "請放料";
        var objectNextTitle = "下一個";
      } else {
        // realtimeItemCount realtimeVisualCount
        var visualTitle =
          realtimeVisualCount < orderTotal ? "請放料" : "最後料";
        var objectNextTitle =
          realtimeVisualCount + 1 < orderTotal
            ? "下一個"
            : realtimeVisualCount !== orderTotal
            ? "最後一個"
            : "";
      }
    }
  }

  // slide
  const objectNameRef = useRef();
  const [slideShow, setSlideShow] = useState(true);

  // 當 realtime-Visual-Count 改變時 slider 的特效
  useEffect(() => {
    if (realtimeVisualCount !== 1) {
      setSlideShow(false);
    }

    setTimeout(() => {
      setSlideShow(true);
    }, 600);
  }, [realtimeVisualCount]);

  const dialogOpenHandler = () => {
    setOrderListDialogOpen(true);
    dispatch({
      type: ROBOT_CONTROL_SCREEN.robotExecutionList,
      payload: { isOpenBool: !isOpenBool },
    });
  };
  return (
    <FortyRadioHeightBox>
      <FortyRadioWidthButton
        customColor={[Colors.lightOrange, orange[200]]}
        onClick={dialogOpenHandler}
      >
        <OperationInterfaceButtonLogo>
          <img src="list.png" alt="list.png"></img>
        </OperationInterfaceButtonLogo>

        <OperationInterfaceButtonText>
          {["inactivate", "success", "reset"].includes(robotStateMode) &&
          !robotExecutionData.isDoing
            ? "工單"
            : "刪 / 插單"}
        </OperationInterfaceButtonText>
      </FortyRadioWidthButton>

      <SixtyRadioWidthButton
        customColor={[Colors.darkPink, Colors.darkPinkHover]}
        onClick={stackAndBufferDialogOpenHandler}
      >
        {[
          "inactivate",
          "success",
          "reset",
          "autoSuccess",
          "autoRetrieve",
          "autoRetrieveSuccess",
        ].includes(robotStateMode) ? (
          <>
            <OperationInterfaceButtonLogo>
              <img src="visual.png" alt="visual.png"></img>
            </OperationInterfaceButtonLogo>

            <OperationInterfaceButtonText>
              堆疊圖示
            </OperationInterfaceButtonText>
          </>
        ) : null}

        {["activate"].includes(robotStateMode) &&
        ["autoRetrieve"].includes(informationAreaMode) ? (
          <>
            <OperationInterfaceButtonLogo>
              <img src="visual.png" alt="visual.png"></img>
            </OperationInterfaceButtonLogo>

            <OperationInterfaceButtonText>
              堆疊圖示
            </OperationInterfaceButtonText>
          </>
        ) : null}

        {/* !["autoRetrieve"].includes(informationAreaMode) 在 activate 情形下不顯示 */}
        {![
          "inactivate",
          "success",
          "reset",
          "autoSuccess",
          "autoRetrieve",
          "autoRetrieveSuccess",
        ].includes(robotStateMode) &&
        !["autoRetrieve"].includes(informationAreaMode) ? (
          <img
            src={`${domain}/static/media/ai_figure/Figures_${
              executeOrderIdArray[queue - 1]
            }/box_${itemCount}_bin_1.png`}
            alt={`${domain}/static/media/ai_figure/Figures_${
              executeOrderIdArray[queue - 1]
            }/box_${itemCount}_bin_1.png`}
            className="box-photo"
          ></img>
        ) : null}

        <VisualIdentityBox>
          {/* {!["inactivate", "reset"].includes(robotStateMode) ? (
            // 20% 50% fontSize: 20
            // 30% 50% fontSize: 26
            <>
              <VisualIdentityTitle>{visualTitle}</VisualIdentityTitle>

              <VisualIdentityObject ref={objectNameRef}>
                <Slide
                  direction={slideShow ? "left" : "right"} //從哪邊來或是哪邊離開
                  in={slideShow}
                  container={objectNameRef.current}
                  timeout={{
                    enter: 500,
                    exit: 300,
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {objectName}
                  </Box>
                </Slide>

                <VisualIdentityNextObjectBox>
                  <VisualIdentityNextObjectTitle>
                    {objectNextTitle}
                  </VisualIdentityNextObjectTitle>
                  <VisualIdentityNextObject ref={objectNameRef}>
                    <Slide
                      direction={slideShow ? "down" : "up"} //從哪邊來或是哪邊離開
                      in={slideShow}
                      container={objectNameRef.current}
                      timeout={{
                        enter: 1500,
                        exit: 300,
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {objectNextName}
                      </Box>
                    </Slide>
                  </VisualIdentityNextObject>
                </VisualIdentityNextObjectBox>
              </VisualIdentityObject>
            </>
          ) : null} */}

          {/* demo1 註解 */}
          {/* <VisualIdentityState>
            {!realtimeVisualMode && robotStateMode === "activate" ? (
              <VisualIdentityStateText sx={{ color: "#999999" }}>
                <TextEffect2 texts={"準備偵測"} mode={"no effect"} />
              </VisualIdentityStateText>
            ) : null}

            {realtimeVisualMode ? (
              <VisualIdentityStateText
                sx={{ color: realtimeAllText()["color"] }}
              >
                {realtimeVisualMode === "detect" ? (
                  <TextEffect2 texts={"物件偵測中"} mode={"effect"} />
                ) : (
                  realtimeAllText()["text"]
                )}
              </VisualIdentityStateText>
            ) : null}
          </VisualIdentityState> */}
        </VisualIdentityBox>
      </SixtyRadioWidthButton>

      <OrderListDialog
        orderListDialogOpen={orderListDialogOpen}
        onOrderListDialogOpen={onOrderListDialogOpen}
        robotStateMode={robotStateMode}
        robotExecutionData={robotExecutionData}
      />

      <StackAndBufferDialog
        stackAndBufferOpen={stackAndBufferOpen}
        onStackAndBufferOpen={onStackAndBufferOpen}
        robotStateMode={robotStateMode}
        robotExecutionData={robotExecutionData}
        itemCount={itemCount}
      />
    </FortyRadioHeightBox>
  );
}

export default OperationInterfaceBox1;
