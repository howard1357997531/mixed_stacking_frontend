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
  const { mode: informationAreaMode } = useSelector(
    (state) => state.robotControlScreen_informationArea
  );
  const { mode: robotStateMode } = useSelector(
    (state) => state.robotControlScreen_robotState
  );

  const robotExecutionData = useSelector(
    (state) => state.robotControlScreen_robotExecutionList
  );

  const executeRobotHandler = () => {
    dispatch(
      executeRobotAction(
        robotStateMode,
        informationAreaMode,
        robotExecutionData
      )
    );
  };

  const robotSettingHandler = () => {
    if (!["inactivate", "success", "reset"].includes(robotStateMode)) {
      setRobotSettingDialogOpen(true);
    }
  };

  useEffect(() => {
    if (["inactivate", "success", "reset"].includes(robotStateMode)) {
      setRobotSettingDialogOpen(false);
    }
  }, [robotStateMode]);

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
          {["inactivate", "success", "reset"].includes(robotStateMode)
            ? "執行"
            : "執行中"}
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
