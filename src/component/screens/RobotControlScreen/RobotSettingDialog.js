import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { Box, Typography, styled } from "@mui/material";
import {
  blue,
  brown,
  deepOrange,
  deepPurple,
  green,
  grey,
  lightGreen,
  pink,
  red,
} from "@mui/material/colors";
import "./css/RobotSettingDialog.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { robotSettingAction } from "../../../redux/actions/RobotControlScreenAction";
import { ROBOT_CONTROL_SCREEN_robotSetting } from "../../../redux/constants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RobotSettingDialog({
  robotSettingDialogOpen,
  onRobotSettingDialogOpen,
}) {
  const StyleBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "400px",
    height: "200px",
  }));
  const StyleSpeedBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    width: "400px",
    height: "200px",
  }));
  const StyleSpeedSmallLeftBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
    width: "30%",
    height: "inherit",
  }));
  const StyleSpeedSmallRightBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    width: "30%",
    height: "inherit",
  }));
  const StyleSpeedSmallMiddleBox = styled(Box)(({ theme }) => ({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: "inherit",
    // backgroundColor: "red",
  }));
  const StyleSpeedSmallMiddleBoxText = styled(Typography)(({ theme }) => ({
    position: "absolute",
    top: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    color: brown[700],
    fontWeight: 600,
  }));
  const StyleSpeedPlusMinusBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== "customColor",
  })(({ theme, customColor }) => ({
    backgroundColor: brown[500],
    marginTop: "30px",
    padding: "15px 15px 10px",
    "&:hover": {
      backgroundColor: customColor,
      transition: "all 0.3s ease-in-out",
      transform: "scale(1.1)",
      cursor: "pointer",
    },
    "&:active": {
      backgroundColor: customColor,
      transform: "scale(.95)",
    },
  }));
  const StyleSmallBox = styled(Box)(({ theme }) => ({
    position: "relative",
    display: "flex",
    width: "48%",
    height: "100%",
    "&:hover": {
      transition: "all 0.3s ease-in-out",
      transform: "scale(1.1)",
      cursor: "pointer",
    },
    "&:active": {
      transform: "scale(0.9)",
    },
  }));
  const StylePauseButton = styled(Box)(({ theme, pause, customColor }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    backgroundColor: "red",
  }));
  const StyleButton = styled(Box, {
    shouldForwardProp: (prop) => prop !== "customColor",
  })(({ theme, customColor }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    backgroundColor: "red",
    borderRadius: "5px",
    backgroundColor: customColor[0],
    "&:hover": {
      backgroundColor: customColor[1],
    },
  }));
  const StyleButtonLogo = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }));
  const StyleButtonText = styled(Typography)(({ theme }) => ({
    position: "absolute",
    top: "75%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "24px",
    fontWeight: 600,
    color: grey[800],
  }));

  const dispatch = useDispatch();
  const { pause, reset, speed } = useSelector(
    (state) => state.robotControlScreen_robotState
  );

  const handleClose = () => {
    onRobotSettingDialogOpen(false);
  };

  const robotSettingHandler = (mode) => {
    dispatch(robotSettingAction(mode, speed));
  };

  return (
    <div>
      <Dialog
        maxWidth={"md"}
        open={robotSettingDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className="operate-interface"
      >
        <DialogContent sx={{ backgroundColor: brown[300], padding: "10px" }}>
          <StyleBox>
            {/* pause */}
            <StyleSmallBox>
              <StylePauseButton
                sx={{
                  backgroundColor: pause ? lightGreen[300] : red[500],
                  borderRadius: pause ? "50%" : "5px",
                  "&:hover": {
                    backgroundColor: pause ? lightGreen[400] : red[600],
                  },
                }}
                onClick={() =>
                  robotSettingHandler(!pause ? "pause" : "unPause")
                }
              >
                <StyleButtonLogo>
                  {pause ? (
                    <img src="re-activate.png" alt="re-activate.png"></img>
                  ) : (
                    <img src="pause.png" alt="pause.png"></img>
                  )}
                </StyleButtonLogo>

                <StyleButtonText>{pause ? "繼續" : "暫停"}</StyleButtonText>
              </StylePauseButton>
            </StyleSmallBox>

            {/* reset */}
            <StyleSmallBox>
              <StyleButton
                customColor={[deepOrange[400], deepOrange[500]]}
                onClick={() => robotSettingHandler("reset")}
              >
                <StyleButtonLogo>
                  <img src="restart.png" alt="restart.png"></img>
                </StyleButtonLogo>

                <StyleButtonText>重置</StyleButtonText>
              </StyleButton>
            </StyleSmallBox>
          </StyleBox>

          {/* speed */}
          <StyleSpeedBox>
            <StyleSpeedSmallLeftBox>
              <StyleSpeedPlusMinusBox
                className="speed-box"
                customColor={pink[200]}
                display={speed <= 10 ? "none" : "block"}
                onClick={() => robotSettingHandler("speedDown")}
              >
                <img src="speed_minus.png" alt="speed_minus.png"></img>
              </StyleSpeedPlusMinusBox>
            </StyleSpeedSmallLeftBox>

            <StyleSpeedSmallMiddleBox>
              <StyleSpeedSmallMiddleBoxText variant="h4">
                速度
              </StyleSpeedSmallMiddleBoxText>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  width: "100%",
                  marginTop: "30px",
                  padding: "14px 0px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h4">{speed}</Typography>
              </Box>
            </StyleSpeedSmallMiddleBox>

            <StyleSpeedSmallRightBox>
              <StyleSpeedPlusMinusBox
                className="speed-box"
                customColor={pink[200]}
                display={speed >= 100 ? "none" : "block"}
                onClick={() => robotSettingHandler("speedUp")}
              >
                <img src="speed_plus.png" alt="speed_plus.png"></img>
              </StyleSpeedPlusMinusBox>
            </StyleSpeedSmallRightBox>
          </StyleSpeedBox>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RobotSettingDialog;
