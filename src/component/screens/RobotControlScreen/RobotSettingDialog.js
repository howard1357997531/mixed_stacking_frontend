import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { Box, Typography, styled, useTheme } from "@mui/material";
import { brown, grey, lightGreen, pink } from "@mui/material/colors";
import "./css/RobotSettingDialog.css";
import { useDispatch, useSelector } from "react-redux";
import { robotSettingAction } from "../../../redux/actions/RobotControlScreenAction";
import { Colors } from "../../../styles/theme";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RobotSettingDialog({
  robotSettingDialogOpen,
  onRobotSettingDialogOpen,
}) {
  const StyleBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  }));
  const StyleSpeedBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    width: "100%",
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
    top: "-20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    fontSize: 28,
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      top: "-15px",
      fontSize: 24,
    },
  }));
  const StyleSpeedPlusMinusBox = styled(Box)(({ theme }) => ({
    backgroundColor: Colors.lightOrange,
    marginTop: "30px",
    padding: "15px 15px 10px",
    "&:hover": {
      backgroundColor: Colors.lightOrangeHover,
      cursor: "pointer",
    },
  }));
  const StyleSmallBox = styled(Box)(({ theme }) => ({
    position: "relative",
    display: "flex",
    width: "45%",
    height: "90%",
    "&:hover": {
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      width: "48%",
      height: "100%",
    },
  }));
  const StylePauseButton = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    backgroundColor: "red",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      height: "65%",
    },
  }));
  const StyleButton = styled(Box, {
    shouldForwardProp: (prop) => prop !== "customColor",
  })(({ theme, customColor }) => ({
    position: "absolute",
    top: "55%",
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
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      height: "65%",
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
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },
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

  const theme = useTheme();
  return (
    <div>
      <Dialog
        maxWidth={"md"}
        open={robotSettingDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent
          sx={{
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "Column",
            width: "400px",
            height: "400px",
            backgroundColor: Colors.darkGreenHover,
            padding: "10px",
            "@media screen and (orientation: portrait)": {
              flexDirection: "column",
              width: "500px",
              height: "500px",
            },
            [theme.breakpoints.down("sm")]: {
              width: "80vw",
              height: "60vh",
            },
          }}
        >
          <StyleBox>
            {/* pause */}
            <StyleSmallBox>
              <StylePauseButton
                sx={{
                  backgroundColor: pause ? lightGreen[300] : Colors.darkred,
                  borderRadius: pause ? "50%" : "5px",
                  "&:hover": {
                    backgroundColor: pause
                      ? lightGreen[400]
                      : Colors.darkredHover,
                  },
                }}
                onClick={() =>
                  robotSettingHandler(!pause ? "pause" : "unPause")
                }
              >
                <StyleButtonLogo className="robot-setting-img">
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
                customColor={[Colors.softOrange, Colors.softOrangeHover]}
                onClick={() => robotSettingHandler("reset")}
              >
                <StyleButtonLogo className="robot-setting-img">
                  <img src="restart.png" alt="restart.png"></img>
                </StyleButtonLogo>

                <StyleButtonText>中斷</StyleButtonText>
              </StyleButton>
            </StyleSmallBox>
          </StyleBox>

          {/* speed */}
          <StyleSpeedBox>
            <StyleSpeedSmallLeftBox>
              <StyleSpeedPlusMinusBox
                className="speed-box"
                display={speed <= 10 ? "none" : "block"}
                onClick={() => robotSettingHandler("speedDown")}
              >
                <img src="speed_minus.png" alt="speed_minus.png"></img>
              </StyleSpeedPlusMinusBox>
            </StyleSpeedSmallLeftBox>

            <StyleSpeedSmallMiddleBox>
              <StyleSpeedSmallMiddleBoxText>速度</StyleSpeedSmallMiddleBoxText>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  width: "100%",
                  marginTop: "30px",
                  padding: "14px 0px",
                  textAlign: "center",
                  [theme.breakpoints.down("sm")]: {
                    padding: "12.5px 0px",
                  },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    [theme.breakpoints.down("sm")]: {
                      fontSize: 26,
                    },
                  }}
                >
                  {speed}
                </Typography>
              </Box>
            </StyleSpeedSmallMiddleBox>

            <StyleSpeedSmallRightBox>
              <StyleSpeedPlusMinusBox
                className="speed-box"
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
