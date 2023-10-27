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
import OrderListDialog from "./OrderListDialog";
import { operateShowBoardTextAnimation } from "../../../animation";
import TextEffect2 from "../../../tool/TextEffect2";
import { Box, Slide } from "@mui/material";

function OperationInterfaceBox1({
  orderSelectDetail,
  robotStateMode,
  realtimeRobotMode,
  realtimeRobotCount,
  realtimeVisualMode,
  objectName,
  objectNextName,
}) {
  const [orderListDialogOpen, setOrderListDialogOpen] = useState(false);
  const onOrderListDialoggOpen = (state) => {
    setOrderListDialogOpen(state);
  };

  const realtimeAllText = {
    detect: { text: "物件偵測中", color: Colors.greyTextBlood },
    correct: { text: "偵測正確", color: Colors.darkGreenHover },
    error: { text: "偵測錯誤", color: red[100] },
    reset: { text: "重置", color: Colors.orange },
    prepare: {
      text: `準備操作第${realtimeRobotCount}個物件`,
      color: Colors.purple,
    },
    operate: {
      text: `正在操作第${realtimeRobotCount}個物件`,
      color: Colors.yellow,
      animation: `${operateShowBoardTextAnimation} 1s ease infinite`,
    },
  };

  if (realtimeVisualMode === "error") {
    var VisualIdentityBoxColor = Colors.lightred;
    var VisualIdentityBoxHoverColor = Colors.lightredHover;
  } else {
    var VisualIdentityBoxColor = Colors.darkPink;
    var VisualIdentityBoxHoverColor = Colors.darkPinkHover;
  }

  var visualTitle = "";
  var objectNextTitle = "";

  if (orderSelectDetail.length !== 0) {
    const orderTotal = orderSelectDetail.aiTraining_order.split(",").length;

    if (!realtimeRobotMode && robotStateMode === "activate") {
      visualTitle = "請放料";
      objectNextTitle = "下一個";
    } else {
      visualTitle = realtimeRobotCount < orderTotal ? "請放料" : "最後料";

      objectNextTitle =
        realtimeRobotCount + 1 < orderTotal
          ? "下一個"
          : realtimeRobotCount !== orderTotal
          ? "最後一個"
          : "";
    }
  }

  // slide
  const objectNameRef = useRef();
  const [slideShow, setSlideShow] = useState(true);

  useEffect(() => {
    if (realtimeRobotCount !== 1) {
      setSlideShow(false);
    }

    setTimeout(() => {
      setSlideShow(true);
    }, 600);
  }, [realtimeRobotCount]);

  return (
    <FortyRadioHeightBox>
      <FortyRadioWidthButton
        customColor={[Colors.lightOrange, orange[200]]}
        onClick={() => setOrderListDialogOpen(true)}
      >
        <OperationInterfaceButtonLogo>
          <img src="list.png" alt="list.png"></img>
        </OperationInterfaceButtonLogo>

        <OperationInterfaceButtonText>工單</OperationInterfaceButtonText>
      </FortyRadioWidthButton>

      <SixtyRadioWidthButton
        customColor={[VisualIdentityBoxColor, VisualIdentityBoxHoverColor]}
      >
        {robotStateMode === "inactivate" && (
          <>
            <OperationInterfaceButtonLogo>
              <img src="visual.png" alt="visual.png"></img>
            </OperationInterfaceButtonLogo>

            <OperationInterfaceButtonText>
              視覺辨識
            </OperationInterfaceButtonText>
          </>
        )}

        <VisualIdentityBox>
          {robotStateMode !== "inactivate" && (
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
                        exit: 400,
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
          )}

          <VisualIdentityState>
            {!realtimeVisualMode && robotStateMode === "activate" && (
              <VisualIdentityStateText sx={{ color: "#999999" }}>
                <TextEffect2 texts={"準備偵測"} mode={"no effect"} />
              </VisualIdentityStateText>
            )}

            {realtimeVisualMode && (
              <VisualIdentityStateText
                sx={{ color: realtimeAllText[realtimeVisualMode]["color"] }}
              >
                {realtimeVisualMode === "detect" ? (
                  <TextEffect2 texts={"物件偵測中"} mode={"effect"} />
                ) : (
                  realtimeAllText[realtimeVisualMode]["text"]
                )}
              </VisualIdentityStateText>
            )}
          </VisualIdentityState>
        </VisualIdentityBox>
      </SixtyRadioWidthButton>

      <OrderListDialog
        orderListDialogOpen={orderListDialogOpen}
        onOrderListDialoggOpen={onOrderListDialoggOpen}
      />
    </FortyRadioHeightBox>
  );
}

export default OperationInterfaceBox1;
