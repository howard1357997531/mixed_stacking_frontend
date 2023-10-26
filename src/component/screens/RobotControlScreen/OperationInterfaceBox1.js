import React, { useState } from "react";
import {
  FortyRadioHeightBox,
  FortyRadioWidthButton,
  OperationInterfaceButtonLogo,
  OperationInterfaceButtonText,
  SixtyRadioWidthButton,
  TextShowBoardText,
  VisualIdentityBox,
  VisualIdentityNextObject,
  VisualIdentityNextObjectBox,
  VisualIdentityNextObjectTitle,
  VisualIdentityObject,
  VisualIdentityState,
  VisualIdentityStateText,
  VisualIdentityTitle,
} from "../../../styles/RobotControlScreen";
import { orange, pink } from "@mui/material/colors";
import { Colors } from "../../../styles/theme";
import OrderListDialog from "./OrderListDialog";
import { useSelector } from "react-redux";
import Dot from "../../../tool/Dot";
import { operateShowBoardTextAnimation } from "../../../animation";
import TextEffect2 from "../../../tool/TextEffect2";

function OperationInterfaceBox1() {
  const [orderListDialogOpen, setOrderListDialogOpen] = useState(false);
  const onOrderListDialoggOpen = (state) => {
    setOrderListDialogOpen(state);
  };

  const { detail: orderSelectDetail } = useSelector(
    (state) => state.robotControlScreen_orderSelect
  );

  const { mode: robotStateMode } = useSelector(
    (state) => state.robotControlScreen_robotState
  );

  const { mode: realtimeRobotMode, count } = useSelector(
    (state) => state.robotControlScreen_realtimeRobot
  );

  const { mode: realtimeVisualMode } = useSelector(
    (state) => state.robotControlScreen_realtimeVisual
  );

  const realtimeAllText = {
    detect: { text: "物件偵測中", color: Colors.greyTextBlood },
    correct: { text: "偵測正確", color: Colors.darkGreenHover },
    error: { text: "偵測錯誤", color: pink[900] },
    reset: { text: "重置", color: Colors.orange },
    prepare: { text: `準備操作第${count}個物件`, color: Colors.purple },
    operate: {
      text: `正在操作第${count}個物件`,
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

  if (orderSelectDetail.length !== 0) {
    const temp = orderSelectDetail.aiTraining_order.split(",");
    const orderTotal = orderSelectDetail.aiTraining_order.split(",").length;

    var ObjectName = temp[count - 1];
    var ObjectNextTitle =
      count + 1 < orderTotal
        ? "下一個"
        : count !== orderTotal
        ? "最後一個"
        : "";
    var ObjectNextName = temp[count] ? temp[count] : "";
  }

  // console.log(orderTotal);

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
          {!realtimeRobotMode && robotStateMode === "activate" && (
            <>
              <VisualIdentityTitle>請放料</VisualIdentityTitle>
              <VisualIdentityObject>
                {orderSelectDetail.aiTraining_order.split(",")[0]}
                <VisualIdentityNextObjectBox>
                  <VisualIdentityNextObjectTitle>
                    下一個
                  </VisualIdentityNextObjectTitle>
                  <VisualIdentityNextObject>
                    {orderSelectDetail.aiTraining_order.split(",")[1]}
                  </VisualIdentityNextObject>
                </VisualIdentityNextObjectBox>
              </VisualIdentityObject>
            </>
          )}

          {realtimeRobotMode && (
            <>
              <VisualIdentityTitle>請放料</VisualIdentityTitle>
              <VisualIdentityObject>
                {ObjectName}
                <VisualIdentityNextObjectBox>
                  <VisualIdentityNextObjectTitle>
                    {ObjectNextTitle}
                  </VisualIdentityNextObjectTitle>
                  <VisualIdentityNextObject>
                    {ObjectNextName}
                  </VisualIdentityNextObject>
                </VisualIdentityNextObjectBox>
              </VisualIdentityObject>
            </>
          )}

          <VisualIdentityState>
            {!realtimeVisualMode && robotStateMode === "activate" && (
              // <VisualIdentityStateText sx={{ color: Colors.greyTextBlood }}>
              //   物件偵測中
              // </VisualIdentityStateText>
              <TextEffect2 />
            )}

            {realtimeVisualMode && (
              <VisualIdentityStateText
                sx={{ color: realtimeAllText[realtimeVisualMode]["color"] }}
              >
                {realtimeVisualMode === "detect" ? (
                  <TextEffect2 />
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
