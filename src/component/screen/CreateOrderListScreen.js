import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Stack, Typography, styled } from "@mui/material";
import {
  blueGrey,
  brown,
  deepPurple,
  grey,
  indigo,
  lightBlue,
  teal,
} from "@mui/material/colors";
import WorkListDropdownMenu from "./part/createOrderList/WorkListDropdownMenu";
import UploadFileDialog from "./part/createOrderList/UploadFileDialog";
import axios from "axios";
import { customColor } from "../customColor/customColor";
import "./css/createOrderList.css";

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
    height: "80%",
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
    justifyContent: "center",
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
    height: "70px",
  }));
  const WorkListDetialNameBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    height: "100%",
  }));
  const WorkListDetialDateBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    width: "40%",
    height: "100%",
  }));
  const WorkListDetialStateBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    height: "100%",
  }));
  const WorkListDetialStateTextBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px 16px",
    borderRadius: "20px",
  }));
  //function box
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
    "&:active": {
      backgroundColor: brown[300],
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
  const RemoveBotton = styled(Button)(({ theme }) => ({
    // backgroundColor: "red",
    padding: "6px 8px",
    textTransform: "lowercase",
    color: customColor.red,
    borderColor: customColor.red,
    "&:hover": {
      color: "#fff",
      backgroundColor: customColor.red,
      borderColor: customColor.red,
      cursor: "pointer",
    },
    "&:active": {
      backgroundColor: brown[300],
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
  const spanStyle = {
    color: currentColor(functionBoxMode),
    fontWeight: 900,
  };
  const checkOrderIdInfunctionBoxData = (id) => {
    const [check] = functionBoxData.filter((data) => data.id === id);
    return check ? true : false;
  };

  const aiTrainingHandler = (id, training_state) => {
    console.log(training_state);
    if (training_state === "no_training") {
      const tempOrder = orders.map((order) =>
        order.id === id ? { ...order, aiTraining_state: "is_training" } : order
      );
      setOrders(tempOrder);
      setFunctionBoxData({
        ...functionBoxData,
        aiTraining_state: "is_training",
      });
    } else if (training_state === "finish_training") {
      setFunctionBoxMode("ai_result");
      console.log("aiaiaiaiai");
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
            <WorkListTopSearchBox>123</WorkListTopSearchBox>

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
            {orders.map((order) => (
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

                <WorkListDetialDateBox>{order.createdAt}</WorkListDetialDateBox>

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
                      sx={{ backgroundColor: grey[600], color: grey[100] }}
                    >
                      training...
                    </WorkListDetialStateTextBox>
                  )}
                  {order.aiTraining_state === "finish_training" && (
                    <WorkListDetialStateTextBox
                      sx={{
                        backgroundColor: indigo[500],
                        color: grey[100],
                        borderRadius: "0px",
                      }}
                    >
                      Finish training
                    </WorkListDetialStateTextBox>
                  )}
                </WorkListDetialStateBox>
              </WorkListDetialBox>
            ))}
          </WorkListBottonBox>
        </WorkListBox>

        {/* function box */}
        <FunctionBox>
          {/* top box */}
          <FunctionTopBox>
            {functionBoxMode === "order" ? (
              <>
                <Typography variant="h6" color={grey[800]}>
                  Order Details
                </Typography>
                <FunctionTopOrderBotton
                  variant="contained"
                  onClick={() =>
                    aiTrainingHandler(
                      functionBoxData.id,
                      functionBoxData.aiTraining_state
                    )
                  }
                >
                  {functionBoxData.aiTraining_state === "no_training"
                    ? "AI training"
                    : "AI result"}
                </FunctionTopOrderBotton>
              </>
            ) : (
              <>
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
                    upload date : {functionBoxData.createdAt}
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

            {functionBoxMode === "ai_result" && "123"}

            {functionBoxMode !== "order" &&
              functionBoxMode !== "ai_result" &&
              functionBoxData.map((data) => (
                <FunctionToolBox key={data.id}>
                  <FunctionToolNameBox>{data.name}</FunctionToolNameBox>

                  <FunctionToolDateBox>{data.createdAt}</FunctionToolDateBox>

                  <FunctionToolRemoveBox>
                    <RemoveBotton
                      variant="outlined"
                      onClick={() => removeFunctionDetail(data.id)}
                    >
                      remove
                    </RemoveBotton>
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
