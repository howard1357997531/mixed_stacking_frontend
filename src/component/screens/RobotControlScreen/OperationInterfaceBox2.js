import React, { useState } from "react";
import {
  FortyRadioHeightBox,
  FortyRadioWidthButton,
  OperationInterfaceButtonLogo,
  OperationInterfaceButtonText,
  SixtyRadioWidthButton,
} from "../../../styles/RobotControlScreen";
import { Colors } from "../../../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { executeRobotAction } from "../../../redux/actions/RobotControlScreenAction";
import RobotSettingDialog from "./RobotSettingDialog";

function OperationInterfaceBox2() {
  const dispatch = useDispatch();
  const { detail } = useSelector(
    (state) => state.robotControlScreen_orderSelect
  );
  const { mode } = useSelector((state) => state.robotControlScreen_robotState);

  const executeRobotHandler = () => {
    dispatch(executeRobotAction(mode, detail));
  };

  // dialog
  const [robotSettingDialogOpen, setRobotSettingDialogOpen] = useState(false);

  const onRobotSettingDialogOpen = (state) => {
    setRobotSettingDialogOpen(state);
  };
  return (
    <FortyRadioHeightBox>
      <SixtyRadioWidthButton
        customColor={[Colors.grey, Colors.greyHover]}
        onClick={executeRobotHandler}
      >
        <OperationInterfaceButtonLogo>
          <img src="start.png" alt="start.png"></img>
        </OperationInterfaceButtonLogo>

        <OperationInterfaceButtonText>執行</OperationInterfaceButtonText>
      </SixtyRadioWidthButton>

      <FortyRadioWidthButton
        customColor={[Colors.darkGreen, Colors.darkGreenHover]}
        onClick={() => setRobotSettingDialogOpen(true)}
      >
        <OperationInterfaceButtonLogo>
          <img src="control.png" alt="control.png"></img>
        </OperationInterfaceButtonLogo>

        <OperationInterfaceButtonText>操作面板</OperationInterfaceButtonText>
      </FortyRadioWidthButton>

      <RobotSettingDialog
        robotSettingDialogOpen={robotSettingDialogOpen}
        onRobotSettingDialogOpen={onRobotSettingDialogOpen}
      />
    </FortyRadioHeightBox>
  );
}

export default OperationInterfaceBox2;
