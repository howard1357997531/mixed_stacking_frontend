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
  const [orderListDialogOpen, setOrderListDialogOpen] = useState(false);
  const onOrderListDialoggOpen = (state) => {
    setOrderListDialogOpen(state);
  };

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

  return (
    <FortyRadioHeightBox>
      <FortyRadioWidthButton
        customColor={[Colors.lightOrange, orange[200]]}
        onClick={() => setOrderListDialogOpen(true)}
      >
        <OperationInterfaceButtonLogo>
          <img src="list.png" alt="list.png"></img>
        </OperationInterfaceButtonLogo>

        <OperationInterfaceButtonText>
          {["inactivate", "reset"].includes(robotStateMode) &&
          !robotExecutionData.isDoing
            ? "工單"
            : "刪 / 插單"}
        </OperationInterfaceButtonText>
      </FortyRadioWidthButton>

      <SixtyRadioWidthButton
        customColor={[VisualIdentityBoxColor, VisualIdentityBoxHoverColor]}
      >
        {["inactivate", "reset"].includes(robotStateMode) ? (
          <>
            <OperationInterfaceButtonLogo>
              <img src="visual.png" alt="visual.png"></img>
            </OperationInterfaceButtonLogo>

            <OperationInterfaceButtonText>
              視覺辨識
            </OperationInterfaceButtonText>
          </>
        ) : null}

        <VisualIdentityBox>
          {!["inactivate", "reset"].includes(robotStateMode) ? (
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
          ) : null}

          {/* demo1 註解 */}
          <VisualIdentityState>
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
          </VisualIdentityState>
        </VisualIdentityBox>
      </SixtyRadioWidthButton>

      <OrderListDialog
        orderListDialogOpen={orderListDialogOpen}
        onOrderListDialoggOpen={onOrderListDialoggOpen}
        robotStateMode={robotStateMode}
        robotExecutionData={robotExecutionData}
      />
    </FortyRadioHeightBox>
  );
}

export default OperationInterfaceBox1;
