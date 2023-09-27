import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Stack, Typography, styled } from "@mui/material";
import {
  blueGrey,
  brown,
  deepPurple,
  grey,
  indigo,
  lightBlue,
  orange,
  purple,
  red,
  teal,
  yellow,
} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import WorkListDropdownMenu from "./part/createOrderList/WorkListDropdownMenu";
import UploadFileDialog from "./part/createOrderList/UploadFileDialog";
import axios from "axios";
import { customColor } from "../customColor/customColor";
import "./css/createOrderList.css";
import Swal from "sweetalert2";

function CreateOrderListScreen() {
  const StyleStack = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 100px)",
    [theme.breakpoints.down("lg")]: {},
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      height: "initial",
    },
  }));
  const StyleBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: functionBoxOpen ? "space-between" : "center",
    alignItems: "center",
    gap: "20px",
    width: "80%",
    height: "90%",
    [theme.breakpoints.down("lg")]: {
      width: "90%",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      height: "initial",
      padding: "30px 0px",
    },
  }));
  // worklist
  const WorkListBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "48%",
    height: "100%",
    padding: "25px",
    paddingTop: "10px",
    boxSizing: "border-box",
    borderRadius: "20px",
    backgroundColor: customColor.lightOrange,
    [theme.breakpoints.down("lg")]: {
      width: "48%",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      width: "70vw",
      height: "60vh",
    },
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
    },
  }));
  const WorkListTopBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "10%",
  }));
  const WorkListTopSearchBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    flexGrow: 1,
    height: "100%",
  }));
  const WorkListTopDropdownBox = styled(Box)(({ theme }) => ({
    width: "30%",
    height: "100%",
  }));
  const WorkListTopUploadFileBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
    width: "30%",
    height: "100%",
  }));
  const WorkListBottonBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "90%",
    overflowY: "auto",
    border: `1px solid ${grey[800]}`,
  }));
  const WorkListDetialBox = styled(Box)(({ theme }) => ({
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "60px",
  }));
  const WorkListDetialNameBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "33%",
    height: "100%",
  }));
  const WorkListDetialDateBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "33%",
    height: "100%",
  }));
  const WorkListDetialStateBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "33%",
    height: "100%",
  }));
  const WorkListDetialStateTextBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    padding: "8px 0px",
    borderRadius: "20px",
    fontSize: "14px",
  }));
  //function box IconButton
  const FunctionBox = styled(Box)(({ theme }) => ({
    display: functionBoxOpen ? "flex" : "none",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    height: "100%",
    padding: "20px",
    boxSizing: "border-box",
    borderRadius: "20px",
    padding: "25px",
    paddingTop: "10px",
    backgroundColor: customColor.lightOrange,
    opacity: functionBoxOpen ? 100 : 0,
    transition: "opacity 0.5s ease-in-out",
    [theme.breakpoints.down("lg")]: {
      width: "48%",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      width: "70vw",
      height: "60vh",
    },
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
    },
  }));
  const FunctionTopBox = styled(Box)(({ theme }) => ({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    width: "100%",
    height: "10%",
  }));
  const FunctionTopIconButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    left: 0,
  }));
  const FunctionTopOrderBotton = styled(Button)(({ theme }) => ({
    position: "absolute",
    right: 0,
    textTransform: "initial",
    display:
      functionBoxData.aiTraining_state === "is_training" ? "none" : "block",
  }));
  const FunctionTopBoxAvatar = styled(Avatar)(({ theme }) => ({
    width: 30,
    height: 30,
    display: "inline-flex",
    margin: "0px 4px",
    backgroundColor: currentColor(functionBoxMode),
  }));
  const FunctionBottonBox = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "100%",
    height: "90%",
    overflowY: "auto",
    border: `1px solid ${grey[800]}`,
    boxSizing: "border-box",
    padding: functionBoxMode === "order" ? 10 : 0,
  }));
  const FunctionOrderBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "50px",
    borderBottom: `1px solid ${blueGrey[100]}`,
    "&:hover": {
      color: deepPurple[500],
      fontSize: "24px",
      fontWeight: 600,
      backgroundColor: grey[300],
      cursor: "pointer",
    },
  }));
  const FunctionOrderSmallBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    height: "100%",
  }));
  const FunctionOrderGifText = styled(Typography)({
    position: "absolute",
    top: "57%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: lightBlue[700],
    fontSize: "24px",
    fontWeight: 600,
  });
  const FunctionAiResultBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  }));
  const FunctionAiResultSmallBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    width: "33.3%",
    height: "70px",
    borderBottom: `1px solid ${blueGrey[100]}`,
    // "&:hover": {
    //   color: deepPurple[500],
    //   backgroundColor: brown[300],
    //   cursor: "pointer",
    // },
  }));
  const FunctionAiResultAvatar = styled(Avatar)(({ theme }) => ({
    marginLeft: "20px",
    // "&:hover": {
    //   color: brown[300],
    //   backgroundColor: yellow[300],
    //   cursor: "pointer",
    // },
  }));
  const FunctionToolTextBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    height: "70px",
  }));
  const FunctionToolButton = styled(Button)(({ theme }) => ({
    position: "absolute",
    right: 0,
    padding: "8px 12px",
    textTransform: "initial",
    color: "#fff",
    "&:hover": {
      transform: "scale(1.1)",
      transition: "all 0.2s ease-in-out",
      cursor: "pointer",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
  }));
  const FunctionToolBox = styled(Box)(({ theme }) => ({
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "70px",
    "&:hover": {
      backgroundColor: grey[300],
      cursor: "pointer",
    },
  }));
  const FunctionToolNameBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    height: "100%",
    // "&:hover": {
    //   backgroundColor: grey[300],
    //   cursor: "pointer",
    // },
    // "&:active": {
    //   backgroundColor: brown[300],
    // },
  }));
  const FunctionToolDateBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    width: "40%",
    height: "100%",
  }));
  const FunctionToolRemoveBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    height: "100%",
  }));
  const StyleRemoveCircleIcon = styled(RemoveCircleIcon)(({ theme }) => ({
    color: customColor.red,
    "&:hover": {
      transform: "scale(1.2)",
      transition: "all 0.2s ease-in-out",
      cursor: "pointer",
    },
    "&:active": {
      transform: "scale(.95)",
    },
  }));

  const [orders, setOrders] = useState([]);
  const [orderSelectId, setOrderSelectId] = useState([]);
  const [functionBoxOpen, setFunctionBoxOpen] = useState(false);
  const [functionBoxMode, setFunctionBoxMode] = useState("");
  const [functionBoxData, setFunctionBoxData] = useState([]);
  const [uploadFileDialogOpen, setUploadFileDialogOpen] = useState(false);
  console.log("functionBoxData: ", functionBoxData);
  // console.log("orderSelectId: ", orderSelectId);

  const currentColor = (mode) => {
    if (mode === "qrcode") {
      return indigo[500];
    } else if (mode === "edit") {
      return customColor.darkGreen;
    } else if (mode === "delete") {
      return customColor.red;
    }
  };
  const currentHoverColor = (mode) => {
    if (mode === "qrcode") {
      return indigo[600];
    } else if (mode === "edit") {
      return customColor.darkGreen;
    } else if (mode === "delete") {
      return customColor.red;
    }
  };
  const spanStyle = {
    color: currentColor(functionBoxMode),
    marginLeft: "5px",
    fontWeight: 900,
  };
  const checkOrderIdInfunctionBoxData = (id) => {
    const [check] = functionBoxData.filter((data) => data.id === id);
    return check ? true : false;
  };
  const AiResultAvatarBgcolor = (number) => {
    if (number > 10 && number < 20) {
      return teal[200];
    } else if (number >= 20 && number < 30) {
      return deepPurple[200];
    } else if (number >= 30 && number < 40) {
      return red[300];
    } else if (number >= 40 && number < 50) {
      return orange[300];
    } else if (number >= 50 && number < 60) {
      return brown[300];
    }
  };

  const closeBoxHandler = () => {
    setFunctionBoxOpen(false);
  };

  const aiTrainingHandler = (id, trainingState, unique_code, functionMode) => {
    if (trainingState === "no_training") {
      Swal.fire({
        title: "Run AI training?",
        icon: "question",
        background: brown[300],
        showCancelButton: true,
        confirmButtonColor: deepPurple[300],
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
        cancelButtonText: "Back",
      }).then((result) => {
        if (result.isConfirmed) {
          const tempOrder = orders.map((order) =>
            order.id === id
              ? { ...order, aiTraining_state: "is_training" }
              : order
          );
          setOrders(tempOrder);
          setFunctionBoxData({
            ...functionBoxData,
            aiTraining_state: "is_training",
          });
          axios
            .post("http://127.0.0.1:8000/api/aiTraining/", { id, unique_code })
            .then((res) => {
              setFunctionBoxData((prev) => {
                return {
                  ...prev,
                  aiTraining_order: res.data.ai_str,
                };
              });
              const tempOrders = orders.map((order) =>
                order.id === id
                  ? {
                      ...order,
                      aiTraining_order: res.data.ai_str,
                      aiTraining_state: "finish_training",
                    }
                  : order
              );
              setOrders(tempOrders);
              setFunctionBoxMode("ai_result");
            });
        }
      });
    } else if (trainingState === "finish_training") {
      if (functionMode === "order") {
        setFunctionBoxMode("ai_result");
      } else {
        setFunctionBoxMode("order");
      }
    }
  };

  const orderDetailHandler = (id) => {
    const [orderData] = orders.filter((order) => order.id === id);

    if (
      functionBoxOpen &&
      functionBoxMode !== "order" &&
      functionBoxMode !== "ai_result"
    ) {
      if (!checkOrderIdInfunctionBoxData(id)) {
        setOrderSelectId([...orderSelectId, id]);
        setFunctionBoxData([...functionBoxData, orderData]);
      } else {
        const tempId = orderSelectId.filter((orderId) => orderId !== id);
        const tempData = functionBoxData.filter((data) => data.id !== id);
        setOrderSelectId(tempId);
        setFunctionBoxData(tempData);
      }
    } else {
      setOrderSelectId([id]);
      setFunctionBoxOpen(true);
      setFunctionBoxMode("order");
      setFunctionBoxData(orderData);
    }
  };

  const removeFunctionDetail = (id) => {
    if (checkOrderIdInfunctionBoxData(id)) {
      const tempId = orderSelectId.filter((orderId) => orderId !== id);
      const tempData = functionBoxData.filter((data) => data.id !== id);
      setOrderSelectId(tempId);
      setFunctionBoxData(tempData);
    }
  };

  const downloadQRcodeHandler = (mode) => {
    if (functionBoxData.length === 0) {
      Swal.fire({
        title: "Please select order",
        icon: "warning",
        background: brown[300],
        confirmButtonColor: deepPurple[300],
        confirmButtonText: "Ok",
      });
      return;
    }
    if (mode === "qrcode") {
      const formData = functionBoxData.map((data) => {
        return {
          id: data.id,
          name: data.name,
          createdAt: data.createdAt,
          unique_code: data.unique_code,
          aiTraining_order: data.aiTraining_order,
        };
      });
      axios
        .post("http://127.0.0.1:8000/api/getOrderXlsxFile/", {
          datas: formData,
        })
        .then((res) => {
          const a = document.createElement("a");
          a.style.display = "none"; // 隐藏链接元素
          a.href = res.data.xlsx_output_path;
          // a.href = `http://127.0.0.1:8000/static/media/xlsx/output_.xlsx`;
          a.setAttribute("download", "output.xlsx");
          document.body.appendChild(a); // 将链接元素添加到 DOM
          a.click();
          document.body.removeChild(a); // 从 DOM 中移除链接元素
        });
    }
  };

  const onFunctionMenuValueHandler = (mode) => {
    if (mode !== null) {
      if (mode !== functionBoxMode) {
        setFunctionBoxData([]);
      }
      setOrderSelectId([]);
      setFunctionBoxOpen(true);
      setFunctionBoxMode(mode);
    }
  };

  const onUploadFileOpenHandler = () => {};

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/getOrderData/").then((res) => {
      console.log(res.data);
      setOrders(res.data);
    });
  }, []);

  return (
    <StyleStack>
      <StyleBox>
        {/* worklist box */}
        <WorkListBox>
          {/* top box */}
          <WorkListTopBox>
            <WorkListTopSearchBox>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </WorkListTopSearchBox>

            <WorkListTopDropdownBox>
              <WorkListDropdownMenu
                onFunctionMenuValue={onFunctionMenuValueHandler}
              />
            </WorkListTopDropdownBox>

            <WorkListTopUploadFileBox>
              <UploadFileDialog onUploadFileOpen={onUploadFileOpenHandler} />
            </WorkListTopUploadFileBox>
          </WorkListTopBox>

          {/* botton box */}
          <WorkListBottonBox className="worklist-box">
            {orders.map(
              (order) =>
                order.display && (
                  <WorkListDetialBox
                    key={order.id}
                    onClick={() => orderDetailHandler(order.id)}
                    sx={{
                      backgroundColor: orderSelectId.includes(order.id)
                        ? brown[300]
                        : null,
                      "&:hover": {
                        backgroundColor: orderSelectId.includes(order.id)
                          ? brown[300]
                          : brown[100],
                        cursor: "pointer",
                      },
                    }}
                  >
                    <WorkListDetialNameBox>{order.name}</WorkListDetialNameBox>

                    <WorkListDetialDateBox>
                      {order.modifiedAt}
                    </WorkListDetialDateBox>

                    <WorkListDetialStateBox>
                      {order.aiTraining_state === "no_training" && (
                        <WorkListDetialStateTextBox
                          sx={{ backgroundColor: teal[300], color: grey[100] }}
                        >
                          No training
                        </WorkListDetialStateTextBox>
                      )}
                      {order.aiTraining_state === "is_training" && (
                        <WorkListDetialStateTextBox
                          className="training"
                          sx={{
                            backgroundColor: purple[600],
                            color: grey[100],
                          }}
                        >
                          training...
                        </WorkListDetialStateTextBox>
                      )}
                      {order.aiTraining_state === "finish_training" && (
                        <WorkListDetialStateTextBox
                          sx={{
                            backgroundColor: indigo[500],
                            color: grey[100],
                          }}
                        >
                          Finish training
                        </WorkListDetialStateTextBox>
                      )}
                    </WorkListDetialStateBox>
                  </WorkListDetialBox>
                )
            )}
          </WorkListBottonBox>
        </WorkListBox>

        {/* function box */}
        <FunctionBox>
          {/* top box */}
          <FunctionTopBox>
            <FunctionTopIconButton onClick={closeBoxHandler}>
              <CloseIcon />
            </FunctionTopIconButton>
            {functionBoxMode === "order" || functionBoxMode === "ai_result" ? (
              <>
                <Typography variant="h6" color={grey[800]}>
                  {functionBoxMode === "order" ? "Order Details" : "AI result"}
                </Typography>
                <FunctionTopOrderBotton
                  variant="contained"
                  onClick={() =>
                    aiTrainingHandler(
                      functionBoxData.id,
                      functionBoxData.aiTraining_state,
                      functionBoxData.unique_code,
                      functionBoxMode
                    )
                  }
                >
                  {functionBoxData.aiTraining_state === "no_training"
                    ? "AI training"
                    : functionBoxData.aiTraining_state === "finish_training" &&
                      functionBoxMode === "order"
                    ? "AI result"
                    : "Order detail"}
                </FunctionTopOrderBotton>
              </>
            ) : (
              <>
                <FunctionToolTextBox>
                  <Typography>Select</Typography>
                  <FunctionTopBoxAvatar>
                    {functionBoxData.length}
                  </FunctionTopBoxAvatar>
                  <Typography>
                    orders for
                    {functionBoxMode === "qrcode" && (
                      <span style={spanStyle}> creating QRcode</span>
                    )}
                    {functionBoxMode === "edit" && (
                      <span style={spanStyle}> editing</span>
                    )}
                    {functionBoxMode === "delete" && (
                      <span style={spanStyle}> deleting</span>
                    )}
                  </Typography>
                </FunctionToolTextBox>
                <FunctionToolButton
                  sx={{
                    backgroundColor: currentColor(functionBoxMode),
                    "&:hover": {
                      backgroundColor: currentHoverColor(functionBoxMode),
                    },
                  }}
                  onClick={() => downloadQRcodeHandler(functionBoxMode)}
                >
                  {functionBoxMode === "qrcode" && "Download"}
                  {functionBoxMode === "edit" && "Edit"}
                  {functionBoxMode === "delete" && "Delete"}
                </FunctionToolButton>
              </>
            )}
          </FunctionTopBox>

          {/* botton box */}
          <FunctionBottonBox className="worklist-box">
            {functionBoxMode === "order" &&
              (functionBoxData.aiTraining_state === "is_training" ? (
                <>
                  <img
                    src={"loading.gif"}
                    alt={"loading.gif"}
                    className="ai-gif"
                  ></img>
                  <FunctionOrderGifText>training</FunctionOrderGifText>
                </>
              ) : (
                <>
                  <Typography>file name : {functionBoxData.name}</Typography>
                  <Typography>
                    AI training state : {functionBoxData.aiTraining_state}
                  </Typography>
                  <Typography>
                    upload date : {functionBoxData.modifiedAt}
                  </Typography>
                  {/* <Typography>modify date : {functionBoxData.name}</Typography> */}
                  <Typography
                    variant="body1"
                    align="center"
                    sx={{
                      backgroundColor: blueGrey[500],
                      color: "#fff",
                      marginTop: "10px",
                      padding: "5px 0px",
                    }}
                  >
                    Order list
                  </Typography>
                  <FunctionOrderBox>
                    <FunctionOrderSmallBox>name</FunctionOrderSmallBox>
                    <FunctionOrderSmallBox>width</FunctionOrderSmallBox>
                    <FunctionOrderSmallBox>height</FunctionOrderSmallBox>
                    <FunctionOrderSmallBox>depth</FunctionOrderSmallBox>
                    <FunctionOrderSmallBox>quantity</FunctionOrderSmallBox>
                  </FunctionOrderBox>
                  {functionBoxData.orderItem.map((order, index) => (
                    <FunctionOrderBox key={index}>
                      <FunctionOrderSmallBox>
                        {order.name}
                      </FunctionOrderSmallBox>
                      <FunctionOrderSmallBox>
                        {order.width}
                      </FunctionOrderSmallBox>
                      <FunctionOrderSmallBox>
                        {order.height}
                      </FunctionOrderSmallBox>
                      <FunctionOrderSmallBox>
                        {order.depth}
                      </FunctionOrderSmallBox>
                      <FunctionOrderSmallBox>
                        {order.quantity}
                      </FunctionOrderSmallBox>
                    </FunctionOrderBox>
                  ))}
                </>
              ))}

            {functionBoxMode === "ai_result" && (
              <FunctionAiResultBox>
                {functionBoxData.aiTraining_order
                  .split(",")
                  .map((order, index) => (
                    <FunctionAiResultSmallBox key={index}>
                      <FunctionAiResultAvatar
                        sx={{ backgroundColor: AiResultAvatarBgcolor(index) }}
                      >
                        {index + 1}
                      </FunctionAiResultAvatar>
                      <Typography sx={{ flexGrow: 1, textAlign: "center" }}>
                        {order}
                      </Typography>
                    </FunctionAiResultSmallBox>
                  ))}
              </FunctionAiResultBox>
            )}

            {functionBoxMode !== "order" &&
              functionBoxMode !== "ai_result" &&
              functionBoxData.map((data) => (
                <FunctionToolBox key={data.id}>
                  <FunctionToolNameBox>{data.name}</FunctionToolNameBox>

                  <FunctionToolDateBox>{data.createdAt}</FunctionToolDateBox>

                  <FunctionToolRemoveBox>
                    <IconButton onClick={() => removeFunctionDetail(data.id)}>
                      <StyleRemoveCircleIcon />
                    </IconButton>
                  </FunctionToolRemoveBox>
                </FunctionToolBox>
              ))}
          </FunctionBottonBox>
        </FunctionBox>
      </StyleBox>
    </StyleStack>
  );
}

export default CreateOrderListScreen;
