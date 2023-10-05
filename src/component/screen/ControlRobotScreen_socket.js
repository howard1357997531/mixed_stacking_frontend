import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Stack, Typography, styled } from "@mui/material";
import {
  blueGrey,
  brown,
  grey,
  orange,
  pink,
  teal,
  yellow,
} from "@mui/material/colors";
import ListDailog2 from "../part/home/ListDialog2";
import Swal from "sweetalert2";
import axios from "axios";
import Dot from "../tool/Dot";
import OperateInterfaceDailog from "../part/home/OperateInterfaceDailog";
import "./css/controlRobotScreen.css";
import { customColor } from "../customColor/customColor";

function ControlRobotScreen_socket({ qrCodeId, onExecuteOtherQRcode }) {
  const StyleStack = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    alignItems: "center",
    height: "calc(100vh - 100px)",
    padding: "0px 100px",
    // backgroundColor: "#888",
    [theme.breakpoints.down("lg")]: {
      padding: "0px 20px",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      height: "initial",
      padding: "30px 20px",
    },
  }));
  const StyleBox = styled(Box)(({ theme }) => ({
    height: "70vh",
    width: "50%",
    padding: "30px 50px",
    // backgroundColor: red[50],
    [theme.breakpoints.down("md")]: {
      height: "80vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "60vh",
    },
  }));
  const StyleInterfaceStack = styled(Stack)(({ theme }) => ({
    flexDirection: "column",
    height: "inherit",
    [theme.breakpoints.down("lg")]: {},
  }));
  const StyleInterfaceBox1 = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    height: "40%",
    [theme.breakpoints.down("md")]: {},
  }));
  const StyleInterfaceButton_40 = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "40%",
    borderRadius: "20px",
    "&:hover": {
      transition: "all 0.3s ease-in-out",
      transform: "scale(1.1)",
      cursor: "pointer",
      zIndex: 2,
    },
    "&:active": {
      transform: "scale(0.9)",
    },
  }));
  const StyleInterfaceButton_60 = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "60%",
    borderRadius: "20px",
    "&:hover": {
      transition: "all 0.3s ease-in-out",
      transform: "scale(1.1)",
      cursor: "pointer",
      zIndex: 2,
    },
    "&:active": {
      transform: "scale(0.9)",
    },
  }));
  const StyleInterfaceLogo = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }));
  const StyleInterfaceText = styled(Typography)(({ theme }) => ({
    position: "absolute",
    top: "75%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "24px",
    fontWeight: 600,
    color: grey[800],
  }));
  const StyleInterfaceBox2 = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "100%",
    height: "20%",
    zIndex: "1",
  }));
  const StyleInterfaceBox2TextBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    gap: "5px",
    zIndex: "3",
  }));
  const StyleInterfaceBox2Text = styled(Typography)(({ theme }) => ({
    textAlign: "center",
    fontSize: "45px",
    fontWeight: 600,
    width: "100%",
    color: grey[800],
  }));
  const StyleDotBox = styled(Box)(({ theme }) => ({
    display: robotState === "prepare" ? "flex" : "none",
    justifyContent: "center",
    alignItems: "flex-end",
    height: "45%",
  }));

  //right box
  const StyleShowScreenBox = styled(Box)(({ theme }) => ({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "inherit",
    backgroundColor: customColor.lightOrange,
    borderRadius: "20px",
  }));
  const StyleShowScreenContentBox = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "80%",
    height: "80%",
    border: `1px ${
      currentState === "No order selected yet" ? "dashed" : "solid"
    } ${brown[500]}`,
  }));
  const StyleShowScreenContentText = styled(Typography)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: brown[500],
    fontWeight: 600,
    fontSize: "26px",
  }));
  const StyleShowScreenContentListBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    overflowY: "hidden",
  }));
  const StyleShowScreenContentListTitle = styled(Typography)(({ theme }) => ({
    position: "absolute",
    top: "30px",
    left: "50%",
    width: "100%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    fontWeight: 600,
    fontSize: "24px",
    color: blueGrey[600],
  }));
  const StyleShowScreenContentChangeButton = styled(Button)(({ theme }) => ({
    position: "absolute",
    top: "-38px",
    left: "0",
    minWidth: "40px",
    fontWeight: 600,
    color: "#fff",
    backgroundColor: brown[300],
    "&:hover": {
      transition: "all 0.3s ease-in-out",
      transform: "scale(1.05)",
      cursor: "pointer",
      backgroundColor: brown[400],
    },
    "&:active": {
      transform: "scale(0.95)",
    },
  }));
  const StyleShowScreenContentListTopBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "8%",
    backgroundColor: blueGrey[500],
  }));
  const StyleShowScreenContentListBottomBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "92%",
    overflowY: "auto",
  }));
  const StyleShowScreenContentListSmallBox = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    height: "60px",
  }));
  const StyleShowScreenContentListSmallerBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  }));

  const [robotOpen, setRobotOpen] = useState(false);
  const [robotState, setRobotState] = useState("");
  const [realtimeItem, setRealtimeItem] = useState("視覺辨識結果");
  const [listDailogOpen, setListDailogOpen] = useState(false);
  const [operateInterfaceDailogOpen, setOperateInterfaceDailogOpen] =
    useState(false);
  const [currentState, setCurrentState] = useState("No order selected yet");
  const [pauseSpeed, setPauseSpeed] = useState({
    pause: false,
    speed: 50,
  });

  const [aiWorkListArray, setAiWorkListArray] = useState([]);
  const [aiWorkListCurrentId, setAiWorkListCurrentId] = useState(null);
  const [robotRealtimeOrderListId, setRobotRealtimeOrderListId] =
    useState(null);
  const [imageOpen, setImageOpen] = useState(false);
  const [readTxt, setReadTxt] = useState(false);
  const [bin, setBin] = useState(1);

  // console.log(aiWorkListArray);

  const onListDailogOpen = (mode) => {
    setListDailogOpen(mode);
  };

  const onOperateInterfaceDailogOpen = (mode) => {
    setOperateInterfaceDailogOpen(mode);
  };

  const onCurrentState = (data) => {
    console.log(data);
    if (data.currentState) {
      if (data.currentState !== "speed") {
        setCurrentState(data.currentState);
        setRobotState("");
      }
    }
    // if (data.currentState) {
    //   if (data.currentState === "pause") {
    //     setCurrentState(data.currentState);
    //     setRobotState("");
    //   } else if (data.currentState === "re-activate") {
    //     setCurrentState("繼續");
    //   }
    // }
    setPauseSpeed({
      pause: data.pause,
      speed: data.speed,
    });
  };

  const onAiWorkListId = (id) => {
    setAiWorkListCurrentId(id);
    setCurrentState("Order selected");
  };

  const onRobotResetHandler = () => {
    setReadTxt(false);
    setRealtimeItem("視覺辨識結果");
    setRobotOpen(false);
    setRobotState("");
    setCurrentState("reset");
    setRobotRealtimeOrderListId(null);
    setImageOpen(false);
    console.log("asdasdasd");
  };

  const selectWorkListHandler = () => {
    setListDailogOpen(!listDailogOpen);
  };

  const controlRobotHandler = () => {
    if (currentState === "No order selected yet") {
      Swal.fire({
        icon: "warning",
        title: "請選擇工單",
        background: "#a1887f",
      });
    } else {
      if (!robotOpen || currentState === "reset") {
        setCurrentState("Start robot");

        const data = {
          id: aiWorkListCurrentId,
          mode: "activate",
          speed: 50,
          qrcode: false,
        };

        axios
          .post("http://127.0.0.1:8000/api/control-robot/", data)
          .then((res) => {
            setReadTxt(false);
            setRobotOpen(false);
            setRobotState("");
            setRobotRealtimeOrderListId(null);
            setImageOpen(false);
            setCurrentState("Finish");
            setRealtimeItem("視覺辨識結果");
            setOperateInterfaceDailogOpen(false);
          });
        setImageOpen(true);
        setReadTxt(true);
        // setAiWorkListCurrentId(1)
      } else {
        Swal.fire({
          icon: "info",
          title: "手臂操作中",
          background: "#a1887f",
        });
      }
    }
  };

  const imageOpenHandler = () => {
    setImageOpen(!imageOpen);
  };

  const operateInterfaceHandler = () => {
    // if (!robotOpen) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "尚未啟動手臂",
    //     background: "#a1887f",
    //   });
    // } else {
    //   setOperateInterfaceDailogOpen(!operateInterfaceDailogOpen);
    // }
    setOperateInterfaceDailogOpen(!operateInterfaceDailogOpen);
  };

  useEffect(() => {
    const FetchText = () => {
      try {
        if (readTxt && currentState !== "pause") {
          axios.get("http://127.0.0.1:8000/api/read-txt/").then((res) => {
            if (res.data !== "") {
              setRobotRealtimeOrderListId(res.data.split(",")[0]);
              setCurrentState(res.data.split(",")[1]);
              setRealtimeItem(res.data.split(",")[2]);
              setRobotState(res.data.split(",")[3]);
              setBin(res.data.split(",")[4]);
              if (!robotOpen) {
                setRobotOpen(true);
              }
              // if (!imageOpen) {
              //   setImageOpen(true);
              // }
            }
          });
        } else {
          clearInterval(interval);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const interval = setInterval(FetchText, 1000);

    return () => clearInterval(interval);
  }, [readTxt, currentState, robotOpen, imageOpen]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/getOrderData/").then((res) => {
      setAiWorkListArray(res.data);
    });
  }, []);

  // console.log(qrCodeId);
  /* qrcode run robot */
  useEffect(() => {
    if (qrCodeId !== null) {
      console.log("run python", qrCodeId);
      setAiWorkListCurrentId(qrCodeId[0].id);
      setCurrentState("Start robot");
      axios
        .post("http://127.0.0.1:8000/api/control-robot/", qrCodeId)
        .then((res) => {
          setReadTxt(false);
          setRobotOpen(false);
          setRobotState("");
          setRobotRealtimeOrderListId(null);
          setImageOpen(false);
          setCurrentState("Finish");
          setRealtimeItem("視覺辨識結果");
          setOperateInterfaceDailogOpen(false);

          if (qrCodeId.length === 2) {
            setTimeout(() => {
              Swal.fire({
                icon: "question",
                title: "Execute second order?",
                background: "#a1887f",
              }).then(() => {
                console.log("activate qrcode");
                onExecuteOtherQRcode([qrCodeId[1]]);
              });
            }, 1000);
          }
        });
      setImageOpen(true);
      setReadTxt(true);
    } else {
      console.log("python null");
    }
  }, [qrCodeId]);

  // web_socket
  const [count, setCount] = useState(1);

  useEffect(() => {
    const socket = new WebSocket(
      "ws://127.0.0.1:8000/ws/RobotControlConsumers/"
    );

    socket.onopen = () => {
      console.log("webSocket connect");
    };

    socket.onmessage = (event) => {
      const realtimeData = JSON.parse(event.data);
      console.log(realtimeData);
    };

    socket.onclose = (event) => {
      console.log("webSocket close: ", event);
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const interfaceBox2TextClassName = `robot-state 
  ${currentState === "Start robot" ? "activate-robot" : ""} 
  ${currentState === "pause" ? "pause" : ""} 
  ${currentState === "re-activate" ? "pause" : ""} 
  ${currentState === "reset" ? "reset" : ""} 
  ${robotState === "prepare" ? "prepare" : ""} 
  ${robotState === "operate" ? "operate" : ""} `;

  const itemSize = {
    "16A": "70 * 52 * 32 (mm)",
    "18A": "70 * 52 * 36 (mm)",
    33: "88 * 42 * 36 (mm)",
    "7A": "70 * 52 * 40 (mm)",
    13: "112 * 50 * 28 (mm)",
    22: "90 * 52 * 36 (mm)",
    20: "106 * 68 * 26 (mm)",
    29: "130 * 50 * 36 (mm)",
    9: "86 * 64 * 46 (mm)",
    26: "144 * 50 * 40 (mm)",
    35: "204 * 92 * 36 (mm)",
  };
  // 選取工單 視覺辨識結果 執行
  return (
    <StyleStack>
      {/* left box */}
      <StyleBox>
        <StyleInterfaceStack className="interface-img">
          <StyleInterfaceBox1>
            {/* 選取工單 */}
            <StyleInterfaceButton_40
              sx={{
                backgroundColor: customColor.lightOrange,
                "&:hover": {
                  backgroundColor: orange[200],
                },
              }}
              onClick={selectWorkListHandler}
            >
              <StyleInterfaceLogo>
                <img src="list.png" alt="list.png"></img>
              </StyleInterfaceLogo>
              <StyleInterfaceText>Order</StyleInterfaceText>
            </StyleInterfaceButton_40>

            {/* 視覺辨識結果 */}
            <StyleInterfaceButton_60
              sx={{
                backgroundColor: customColor.darkPink,
                "&:hover": {
                  backgroundColor: pink[200],
                },
              }}
            >
              <StyleInterfaceLogo className="realtime-img">
                {realtimeItem === "視覺辨識結果" ? (
                  <img src="visual.png" alt="visual.png"></img>
                ) : (
                  <img
                    src={`${realtimeItem}.png`}
                    alt={`${realtimeItem}.png`}
                    className="inner"
                  ></img>
                )}
              </StyleInterfaceLogo>
              <StyleInterfaceText>Visual results</StyleInterfaceText>
            </StyleInterfaceButton_60>
          </StyleInterfaceBox1>

          <StyleInterfaceBox1>
            {/* 執行 */}
            <StyleInterfaceButton_60
              sx={{
                backgroundColor: customColor.grey,
                "&:hover": {
                  backgroundColor: grey[400],
                },
              }}
              onClick={controlRobotHandler}
            >
              <StyleInterfaceLogo>
                <img src="start.png" alt="start.png"></img>
              </StyleInterfaceLogo>
              <StyleInterfaceText>Execute</StyleInterfaceText>
            </StyleInterfaceButton_60>

            {/* 操作面板 */}
            <StyleInterfaceButton_40
              sx={{
                backgroundColor: customColor.darkGreen,
                "&:hover": {
                  backgroundColor: teal[500],
                },
              }}
              onClick={operateInterfaceHandler}
            >
              <StyleInterfaceLogo>
                <img src="control.png" alt="control.png"></img>
              </StyleInterfaceLogo>
              <StyleInterfaceText>Panel</StyleInterfaceText>
            </StyleInterfaceButton_40>
          </StyleInterfaceBox1>

          {/* 及時面板  暫停  已重置*/}
          <StyleInterfaceBox2 className="board">
            <img src="board.png" alt="board.png"></img>
            <StyleInterfaceBox2TextBox>
              <StyleInterfaceBox2Text className={interfaceBox2TextClassName}>
                {currentState === "pause" || currentState === "re-activate"
                  ? "pause"
                  : currentState === "reset"
                  ? "reset"
                  : currentState}
              </StyleInterfaceBox2Text>
              <StyleDotBox>
                <Dot currentState={currentState} robotState={robotState} />
              </StyleDotBox>
            </StyleInterfaceBox2TextBox>
          </StyleInterfaceBox2>
        </StyleInterfaceStack>
      </StyleBox>

      {/* right box  工單名稱*/}
      <StyleBox>
        <StyleShowScreenBox>
          {imageOpen || currentState === "No order selected yet" ? null : (
            <StyleShowScreenContentListTitle>
              Name :{" "}
              {aiWorkListArray.map((ai) => {
                if (ai.id === aiWorkListCurrentId) {
                  return ai.name;
                } else {
                  return null;
                }
              })}
            </StyleShowScreenContentListTitle>
          )}

          <StyleShowScreenContentBox>
            {robotOpen && (
              <StyleShowScreenContentChangeButton
                variant="contained"
                size="small"
                onClick={imageOpenHandler}
              >
                {imageOpen ? "Order" : "Image"}
              </StyleShowScreenContentChangeButton>
            )}

            {currentState === "No order selected yet" ? (
              <StyleShowScreenContentText>
                {/* 請選擇工單 */}Please select order
              </StyleShowScreenContentText>
            ) : robotOpen ? (
              <>
                <StyleShowScreenContentListBox
                  sx={{
                    display: imageOpen ? "none" : "block",
                  }}
                >
                  <StyleShowScreenContentListTopBox>
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: "#fff",
                        width: "25%",
                      }}
                    >
                      {/* 次序 */}Order
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: "#fff",
                        width: "35%",
                        marginLeft: "15px",
                        // 10px
                      }}
                    >
                      {/* 名稱 */}Name
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: "#fff",
                        width: "40%",
                        marginRight: "10px",
                      }}
                    >
                      {/* 尺寸 */}Size
                    </Typography>
                  </StyleShowScreenContentListTopBox>

                  <StyleShowScreenContentListBottomBox className="ai-orderlist">
                    {aiWorkListArray.map((ai) => {
                      if (ai.id === aiWorkListCurrentId) {
                        return ai.aiTraining_order
                          .split(",")
                          .map((order, index) => (
                            <StyleShowScreenContentListSmallBox
                              key={index}
                              sx={{
                                backgroundColor:
                                  index + 1 ===
                                  parseInt(robotRealtimeOrderListId)
                                    ? brown[300]
                                    : "transparent",
                              }}
                              className={
                                index + 1 === parseInt(robotRealtimeOrderListId)
                                  ? "target-element"
                                  : ""
                              }
                            >
                              <StyleShowScreenContentListSmallerBox
                                sx={{ width: "25%" }}
                              >
                                <Avatar
                                  sx={{
                                    backgroundColor:
                                      index + 1 ===
                                      parseInt(robotRealtimeOrderListId)
                                        ? yellow[300]
                                        : grey[400],
                                    color:
                                      index + 1 ===
                                      parseInt(robotRealtimeOrderListId)
                                        ? brown[300]
                                        : "#fff",
                                  }}
                                >
                                  {index + 1}
                                </Avatar>
                              </StyleShowScreenContentListSmallerBox>
                              <StyleShowScreenContentListSmallerBox
                                sx={{ width: "35%" }}
                              >
                                <img
                                  src={`${order}.png`}
                                  alt={`${order}.png`}
                                  style={{ marginRight: "10px" }}
                                ></img>
                                {order}
                              </StyleShowScreenContentListSmallerBox>
                              <StyleShowScreenContentListSmallerBox
                                sx={{ width: "40%" }}
                              >
                                {itemSize[order]}
                              </StyleShowScreenContentListSmallerBox>
                            </StyleShowScreenContentListSmallBox>
                          ));
                      } else {
                        return null;
                      }
                    })}
                  </StyleShowScreenContentListBottomBox>
                </StyleShowScreenContentListBox>

                <img
                  src={`http://127.0.0.1:8000/static/media/Figures_step2_${aiWorkListCurrentId}/box_${robotRealtimeOrderListId}_bin_${bin
                    .toLowerCase()
                    .replace(" ", "_")}.png`}
                  alt={`http://127.0.0.1:8000/static/media/Figures_step2_${aiWorkListCurrentId}/box_${robotRealtimeOrderListId}_bin_${bin
                    .toLowerCase()
                    .replace(" ", "_")}.png`}
                  className="item-realtime-photo"
                  style={{
                    display: imageOpen ? "block" : "none",
                  }}
                ></img>
              </>
            ) : (
              <StyleShowScreenContentListBox
                sx={{
                  display: imageOpen ? "none" : "block",
                }}
              >
                <StyleShowScreenContentListTopBox>
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "#fff",
                      width: "25%",
                    }}
                  >
                    {/* 次序 */}Order
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "#fff",
                      width: "35%",
                      marginLeft: "15px",
                    }}
                  >
                    {/* 名稱 */}Name
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "#fff",
                      width: "40%",
                      marginRight: "10px",
                    }}
                  >
                    {/* 尺寸 */}Size
                  </Typography>
                </StyleShowScreenContentListTopBox>

                <StyleShowScreenContentListBottomBox className="ai-orderlist">
                  {aiWorkListArray.map((ai) => {
                    if (ai.id === aiWorkListCurrentId) {
                      return ai.aiTraining_order
                        .split(",")
                        .map((order, index) => (
                          <StyleShowScreenContentListSmallBox
                            key={index}
                            sx={{
                              backgroundColor:
                                index + 1 === parseInt(robotRealtimeOrderListId)
                                  ? brown[300]
                                  : "transparent",
                            }}
                            className={
                              index + 1 === parseInt(robotRealtimeOrderListId)
                                ? "target-element"
                                : ""
                            }
                          >
                            <StyleShowScreenContentListSmallerBox
                              sx={{ width: "25%" }}
                            >
                              <Avatar>{index + 1}</Avatar>
                            </StyleShowScreenContentListSmallerBox>
                            <StyleShowScreenContentListSmallerBox
                              sx={{ width: "35%" }}
                            >
                              <img
                                src={`${order}.png`}
                                alt={`${order}.png`}
                                style={{ marginRight: "10px" }}
                              ></img>
                              {order}
                            </StyleShowScreenContentListSmallerBox>
                            <StyleShowScreenContentListSmallerBox
                              sx={{ width: "40%" }}
                            >
                              {itemSize[order]}
                            </StyleShowScreenContentListSmallerBox>
                          </StyleShowScreenContentListSmallBox>
                        ));
                    } else {
                      return null;
                    }
                  })}
                </StyleShowScreenContentListBottomBox>
              </StyleShowScreenContentListBox>
            )}
          </StyleShowScreenContentBox>
        </StyleShowScreenBox>
      </StyleBox>

      <ListDailog2
        listDailogOpen={listDailogOpen}
        onListDailogOpen={onListDailogOpen}
        onAiWorkListId={onAiWorkListId}
        aiWorkListArray={aiWorkListArray}
      />

      <OperateInterfaceDailog
        operateInterfaceDailogOpen={operateInterfaceDailogOpen}
        onOperateInterfaceDailogOpen={onOperateInterfaceDailogOpen}
        onCurrentState={onCurrentState}
        pauseSpeed={pauseSpeed}
        aiWorkListId={aiWorkListCurrentId}
        onRobotReset={onRobotResetHandler}
      />
    </StyleStack>
  );
}

export default ControlRobotScreen_socket;
