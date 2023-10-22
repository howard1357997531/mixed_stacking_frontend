import React, { useState } from "react";
import {
  FortyRadioHeightBox,
  FortyRadioWidthButton,
  OperationInterButtonLogo,
  OperationInterButtonText,
  SixtyRadioWidthButton,
} from "../../../styles/RobotControlScreen";
import { Colors } from "../../../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { executeRobotAction } from "../../../redux/actions/RobotControlScreenAction";
import RobotSettingDialog from "./RobotSettingDialog";

function OperationInterfaceBox2() {
  const dispatch = useDispatch();
  const { orderListId } = useSelector(
    (state) => state.robotControlScreen_orderSelect
  );
  const executeRobotHandler = () => {
    dispatch(executeRobotAction(orderListId));
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
        <OperationInterButtonLogo>
          <img src="start.png" alt="start.png"></img>
        </OperationInterButtonLogo>

        <OperationInterButtonText>執行</OperationInterButtonText>
      </SixtyRadioWidthButton>

      <FortyRadioWidthButton
        customColor={[Colors.darkGreen, Colors.darkGreenHover]}
        onClick={() => setRobotSettingDialogOpen(true)}
      >
        <OperationInterButtonLogo>
          <img src="control.png" alt="control.png"></img>
        </OperationInterButtonLogo>

        <OperationInterButtonText>操作面板</OperationInterButtonText>
      </FortyRadioWidthButton>

      <RobotSettingDialog
        robotSettingDialogOpen={robotSettingDialogOpen}
        onRobotSettingDialogOpen={onRobotSettingDialogOpen}
      />
    </FortyRadioHeightBox>
  );
}

export default OperationInterfaceBox2;
