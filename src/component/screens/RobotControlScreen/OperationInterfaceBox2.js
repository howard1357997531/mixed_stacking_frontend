import React from "react";
import {
  FortyRadioHeightBox,
  FortyRadioWidthButton,
  OperationInterButtonLogo,
  OperationInterButtonText,
  SixtyRadioWidthButton,
} from "../../../styles/RobotControlScreen";
import { orange } from "@mui/material/colors";
import { Colors } from "../../../styles/theme";

function OperationInterfaceBox2() {
  return (
    <FortyRadioHeightBox>
      <SixtyRadioWidthButton customColor={[Colors.grey, Colors.greyHover]}>
        <OperationInterButtonLogo>
          <img src="start.png" alt="start.png"></img>
        </OperationInterButtonLogo>

        <OperationInterButtonText>執行</OperationInterButtonText>
      </SixtyRadioWidthButton>

      <FortyRadioWidthButton
        customColor={[Colors.darkGreen, Colors.darkGreenHover]}
      >
        <OperationInterButtonLogo>
          <img src="control.png" alt="control.png"></img>
        </OperationInterButtonLogo>

        <OperationInterButtonText>操作面板</OperationInterButtonText>
      </FortyRadioWidthButton>
    </FortyRadioHeightBox>
  );
}

export default OperationInterfaceBox2;
