import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import {
  blueGrey,
  brown,
  green,
  grey,
  indigo,
  red,
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
    "&:hover": {
      backgroundColor: grey[300],
      cursor: "pointer",
    },
    "&:active": {
      backgroundColor: brown[300],
    },
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

    alignItems: "center",
    width: "25%",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "10%",
  }));
  const FunctionBottonBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "90%",
    overflowY: "auto",
    border: `1px solid ${grey[800]}`,
  }));

  const [orders, setOrders] = useState([]);
  const [functionBoxOpen, setFunctionBoxOpen] = useState(false);
  const [uploadFileDialogOpen, setUploadFileDialogOpen] = useState(false);

  const onFunctionMenuValueHandler = (mode) => {
    console.log(mode);
    if (mode !== null) {
      setFunctionBoxOpen(true);
    }
  };

  const onUploadFileOpenHAndler = () => {};

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
              <UploadFileDialog onUploadFileOpen={onUploadFileOpenHAndler} />
            </WorkListTopUploadFileBox>
          </WorkListTopBox>

          {/* botton box */}
          <WorkListBottonBox className="worklist-box">
            {orders.map((order) => (
              <WorkListDetialBox key={order.id}>
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
            <Typography>Select 0 orders for creating QRcode</Typography>
          </FunctionTopBox>

          {/* botton box */}
          <FunctionBottonBox></FunctionBottonBox>
        </FunctionBox>
      </StyleBox>
    </StyleStack>
  );
}

export default CreateOrderListScreen;
