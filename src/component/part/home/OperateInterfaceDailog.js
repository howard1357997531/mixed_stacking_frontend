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
import "./style.css";
import Swal from "sweetalert2";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OperateInterfaceDailog({
  operateInterfaceDailogOpen,
  onOperateInterfaceDailogOpen,
  onCurrentState,
  pauseSpeed,
  aiWorkListId,
  onRobotReset,
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
  const StyleSpeedPlusMinusBox = styled(Box)(({ theme }) => ({
    backgroundColor: brown[500],
    marginTop: "30px",
    padding: "15px 15px 10px",
    "&:hover": {
      transition: "all 0.3s ease-in-out",
      transform: "scale(1.1)",
      cursor: "pointer",
    },
    "&:active": {
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
  const StyleButton = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    backgroundColor: "red",
    borderRadius: "5px",
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

  const [currentState, setCurrentState] = React.useState("");
  const [pause, setPause] = React.useState(pauseSpeed.pause);
  const [speed, setSpeed] = React.useState(pauseSpeed.speed);
  const [speedLeftExist, setSpeedLeftExist] = React.useState(true);
  const [speedRightExist, setSpeedRightExist] = React.useState(true);
  const [open, setOpen] = React.useState(operateInterfaceDailogOpen);

  const handleClose = () => {
    onOperateInterfaceDailogOpen(false);
    const data = { currentState, pause, speed };
    onCurrentState(data);
  };

  const buttonHandler = (mode) => {
    const data = {
      id: aiWorkListId,
      mode: mode,
      speed: speed,
    };

    if (mode === "pause") {
      data.mode = pause ? "re-activate" : "pause";
      data.currentState = pause ? "re-activate" : "pause";
      setPause(!pause);
    } else if (mode === "reset") {
      Swal.fire({
        title: "確定要重置?",
        icon: "question",
        background: deepOrange[400],
        showCancelButton: true,
        confirmButtonColor: deepPurple[400],
        cancelButtonColor: "#d33",
        confirmButtonText: "確定",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "警告",
            text: "重置之後會從頭開始來跑這份工單",
            icon: "warning",
            background: red[300],
            showCancelButton: true,
            iconColor: red[800],
            confirmButtonColor: deepPurple[400],
            cancelButtonColor: "#d33",
            confirmButtonText: "重置",
            cancelButtonText: "取消",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "重置成功",
                icon: "success",
                background: blue[400],
              });
              axios
                .post("http://127.0.0.1:8000/api/control-robot/", {
                  ...data,
                  id: aiWorkListId,
                })
                .then((res) => {
                  setPause(false);
                  setSpeed(50);
                  setSpeedLeftExist(true);
                  setSpeedRightExist(true);
                  setCurrentState(data.mode);
                  onOperateInterfaceDailogOpen(false);
                  onRobotReset();
                });
            }
          });
        }
      });
    } else if (mode === "speed+") {
      if (speed === 90) {
        setSpeedRightExist(false);
      } else {
        setSpeedRightExist(true);
        setSpeedLeftExist(true);
      }
      data.mode = "speed";
      data.speed = speed + 10;
      data.currentState = "speed";
      setSpeed(speed + 10);
    } else if (mode === "speed-") {
      if (speed === 10) {
        setSpeedLeftExist(false);
      } else {
        setSpeedRightExist(true);
        setSpeedLeftExist(true);
      }
      data.mode = "speed";
      data.speed = speed - 10;
      data.currentState = "speed";
      setSpeed(speed - 10);
    }

    if (mode !== "reset") {
      axios
        .post("http://127.0.0.1:8000/api/control-robot/", data)
        .then((res) => {
          setCurrentState(data.mode);
          // onCurrentState({ ...data, pause: !pause });
        });
    }
  };

  return (
    <div>
      <Dialog
        maxWidth={"md"}
        open={open}
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
              <StyleButton
                sx={{
                  backgroundColor: pause ? lightGreen[300] : red[500],
                  borderRadius: pause ? "50%" : "5px",
                  "&:hover": {
                    backgroundColor: pause ? lightGreen[400] : red[600],
                  },
                }}
                onClick={() => buttonHandler("pause")}
              >
                <StyleButtonLogo>
                  {pause ? (
                    <img src="re-activate.png" alt="re-activate.png"></img>
                  ) : (
                    <img src="pause.png" alt="pause.png"></img>
                  )}
                </StyleButtonLogo>

                <StyleButtonText>
                  {pause ? "Continue" : "Pause"}
                </StyleButtonText>
              </StyleButton>
            </StyleSmallBox>

            {/* reset */}
            <StyleSmallBox>
              <StyleButton
                sx={{
                  backgroundColor: deepOrange[400],
                  "&:hover": {
                    backgroundColor: deepOrange[500],
                  },
                }}
                onClick={() => buttonHandler("reset")}
              >
                <StyleButtonLogo>
                  <img src="restart.png" alt="restart.png"></img>
                </StyleButtonLogo>

                <StyleButtonText>Reset</StyleButtonText>
              </StyleButton>
            </StyleSmallBox>
          </StyleBox>

          {/* speed */}
          <StyleSpeedBox>
            <StyleSpeedSmallLeftBox>
              {speedLeftExist && (
                <StyleSpeedPlusMinusBox
                  onClick={() => buttonHandler("speed-")}
                  sx={{
                    "&:hover": {
                      backgroundColor: pink[200],
                    },
                    "&:active": {
                      backgroundColor: pink[200],
                    },
                  }}
                  className="speed-box"
                >
                  <img src="speed_minus.png" alt="speed_minus.png"></img>
                </StyleSpeedPlusMinusBox>
              )}
            </StyleSpeedSmallLeftBox>

            <StyleSpeedSmallMiddleBox>
              <StyleSpeedSmallMiddleBoxText variant="h4">
                Speed
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
              {speedRightExist && (
                <StyleSpeedPlusMinusBox
                  onClick={() => buttonHandler("speed+")}
                  sx={{
                    "&:hover": {
                      backgroundColor: green[500],
                    },
                    "&:active": {
                      backgroundColor: green[500],
                    },
                  }}
                  className="speed-box"
                >
                  <img src="speed_plus.png" alt="speed_plus.png"></img>
                </StyleSpeedPlusMinusBox>
              )}
            </StyleSpeedSmallRightBox>
          </StyleSpeedBox>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OperateInterfaceDailog;
