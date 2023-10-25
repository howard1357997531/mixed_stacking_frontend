import React, { useState } from "react";
import {
  FortyRadioHeightBox,
  FortyRadioWidthButton,
  OperationInterfaceButtonLogo,
  OperationInterfaceButtonText,
  SixtyRadioWidthButton,
  TextShowBoardText,
  VisualIdentityBox,
  VisualIdentityObject,
  VisualIdentityState,
} from "../../../styles/RobotControlScreen";
import { orange } from "@mui/material/colors";
import { Colors } from "../../../styles/theme";
import OrderListDialog from "./OrderListDialog";
import { useSelector } from "react-redux";
import Dot from "../../../tool/Dot";
import { operateShowBoardTextAnimation } from "../../../animation";

function OperationInterfaceBox1() {
  const [orderListDialogOpen, setOrderListDialogOpen] = useState(false);
  const onOrderListDialoggOpen = (state) => {
    setOrderListDialogOpen(state);
  };

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
        customColor={[Colors.darkPink, Colors.darkPinkHover]}
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

        {!realtimeDataMode && robotStateMode === "activate" && "啟動手臂中"}

        {realtimeDataMode &&
          realtimeDataMode !== "prepare" &&
          realtimeDataMode !== "operate" && (
            <VisualIdentityBox>
              <VisualIdentityState>
                <TextShowBoardText
                  sx={{ color: boxText[realtimeDataMode]["color"] }}
                >
                  {boxText[realtimeDataMode]["text"]}
                </TextShowBoardText>
                {realtimeDataMode === "detect" && (
                  <Dot dotColor={boxText[realtimeDataMode]["color"]} />
                )}
              </VisualIdentityState>
              <VisualIdentityObject>123</VisualIdentityObject>
            </VisualIdentityBox>
          )}
      </SixtyRadioWidthButton>

      <OrderListDialog
        orderListDialogOpen={orderListDialogOpen}
        onOrderListDialoggOpen={onOrderListDialoggOpen}
      />
    </FortyRadioHeightBox>
  );
}

export default OperationInterfaceBox1;
