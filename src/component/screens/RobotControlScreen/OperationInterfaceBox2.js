import React, { Fragment, useEffect, useState } from "react";
import {
  FortyRadioHeightBox,
  FortyRadioWidthButtonBox2,
  OperationInterfaceButtonLogo,
  OperationInterfaceButtonText,
  PauseBox,
  PauseBoxText,
  PauseImageSize,
  RobotSettingBox,
  RobotSettingPauseBox,
  RobotSettingSpeedBox,
  SixtyRadioWidthButtonBox2,
  SpeedBox,
  SpeedImage,
  SpeedImageBox,
  SpeedImageSize,
  SpeedTextBox,
  SpeedTitle,
} from "../../../styles/RobotControlScreen";
import { Colors } from "../../../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import {
  executeRobotAction,
  robotSettingAction,
} from "../../../redux/actions/RobotControlScreenAction";
import RobotSettingDialog from "./RobotSettingDialog";
import { basicSwal } from "../../../swal";

function OperationInterfaceBox2() {
  const dispatch = useDispatch();
  const { mode: informationAreaMode } = useSelector(
    (state) => state.robotControlScreen_informationArea
  );
  const {
    mode: robotStateMode,
    pause,
    speed,
  } = useSelector((state) => state.robotControlScreen_robotState);

  const robotExecutionData = useSelector(
    (state) => state.robotControlScreen_robotExecutionList
  );

  const modeCheck = [
    "inactivate",
    "success",
    "reset",
    "autoSuccess",
    "autoRetrieveSuccess",
  ].includes(robotStateMode);

  const robotSettingCheck = () => {
    // setRobotSettingDialogOpen(true);
    if (modeCheck) {
      basicSwal("warning", "手臂尚未啟動");
      return;
    }
  };
  const robotSettingHandler = (e, mode) => {
    e.stopPropagation();
    dispatch(robotSettingAction(mode, speed));
  };

  const executeRobotHandler = () => {
    if (modeCheck) {
      dispatch(executeRobotAction(robotStateMode, robotExecutionData));
    } else {
      dispatch(robotSettingAction("reset", 20));
    }
  };

  useEffect(() => {
    if (modeCheck) {
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
      <SixtyRadioWidthButtonBox2 mode={modeCheck} onClick={robotSettingCheck}>
        {modeCheck ? (
          <Fragment>
            <OperationInterfaceButtonLogo>
              <img src="control.png" alt="control.png" />
            </OperationInterfaceButtonLogo>

            <OperationInterfaceButtonText>操控板</OperationInterfaceButtonText>
          </Fragment>
        ) : (
          <RobotSettingBox>
            <RobotSettingPauseBox>
              {/* pause */}
              <PauseBox
                pause={pause}
                onClick={(e) =>
                  robotSettingHandler(e, !pause ? "pause" : "unPause")
                }
              >
                <PauseImageSize className="setting-image-box">
                  {pause ? (
                    <img src="re-activate.png" alt="re-activate.png"></img>
                  ) : (
                    <img src="pause.png" alt="pause.png"></img>
                  )}
                </PauseImageSize>

                <PauseBoxText pause={pause}>
                  {pause ? "繼續" : "暫停"}
                </PauseBoxText>
              </PauseBox>
            </RobotSettingPauseBox>

            {/* speed */}
            <RobotSettingSpeedBox>
              <SpeedTitle>速度</SpeedTitle>
              <SpeedBox>
                <SpeedImageBox>
                  <SpeedImage
                    speedCheck={speed <= 10}
                    onClick={(e) => robotSettingHandler(e, "speedDown")}
                  >
                    <SpeedImageSize className="setting-image-box">
                      <img src="speed_minus.png" alt="speed_minus.png" />
                    </SpeedImageSize>
                  </SpeedImage>
                </SpeedImageBox>

                <SpeedTextBox>{speed}</SpeedTextBox>

                <SpeedImageBox>
                  <SpeedImage
                    speedCheck={speed >= 100}
                    onClick={(e) => robotSettingHandler(e, "speedUp")}
                  >
                    <SpeedImageSize className="setting-image-box">
                      <img src="speed_plus.png" alt="speed_plus.png" />
                    </SpeedImageSize>
                  </SpeedImage>
                </SpeedImageBox>
              </SpeedBox>
            </RobotSettingSpeedBox>
          </RobotSettingBox>
        )}
      </SixtyRadioWidthButtonBox2>

      <FortyRadioWidthButtonBox2 mode={modeCheck} onClick={executeRobotHandler}>
        <OperationInterfaceButtonLogo>
          <img
            src={modeCheck ? "start.png" : "restart.png"}
            alt={modeCheck ? "start.png" : "restart.png"}
          />
        </OperationInterfaceButtonLogo>

        <OperationInterfaceButtonText>
          {modeCheck ? "執行" : "中斷"}
        </OperationInterfaceButtonText>
      </FortyRadioWidthButtonBox2>

      <RobotSettingDialog
        robotSettingDialogOpen={robotSettingDialogOpen}
        onRobotSettingDialogOpen={onRobotSettingDialogOpen}
      />
    </FortyRadioHeightBox>
  );
}

export default OperationInterfaceBox2;
