import React, { useEffect, useState } from "react";
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
  const { data: multipleOrderSelectData } = useSelector(
    (state) => state.robotControlScreen_multipleOrderSelect
  );
  const { mode } = useSelector((state) => state.robotControlScreen_robotState);

  const robotExecutionData = useSelector(
    (state) => state.robotControlScreen_robotExecutionList
  );

  const executeRobotHandler = () => {
    dispatch(
      executeRobotAction(mode, multipleOrderSelectData, robotExecutionData)
    );
  };

  const robotSettingHandler = () => {
    if (!["inactivate", "reset"].includes(mode)) {
      setRobotSettingDialogOpen(true);
    }
  };

  useEffect(() => {
    if (mode === "inactivate") {
      setRobotSettingDialogOpen(false);
    }
  }, [mode]);

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

        <OperationInterfaceButtonText>
          {mode === "inactivate" ? "執行" : "手臂執行中"}
        </OperationInterfaceButtonText>
      </SixtyRadioWidthButton>

      <FortyRadioWidthButton
        customColor={[Colors.darkGreen, Colors.darkGreenHover]}
        onClick={robotSettingHandler}
      >
        <OperationInterfaceButtonLogo>
          <img src="control.png" alt="control.png"></img>
        </OperationInterfaceButtonLogo>

        <OperationInterfaceButtonText>操控板</OperationInterfaceButtonText>
      </FortyRadioWidthButton>

      <RobotSettingDialog
        robotSettingDialogOpen={robotSettingDialogOpen}
        onRobotSettingDialogOpen={onRobotSettingDialogOpen}
      />
    </FortyRadioHeightBox>
  );
}

export default OperationInterfaceBox2;
