import React, { useState } from "react";
import { Box, Button, Stack, styled } from "@mui/material";
import { brown, red } from "@mui/material/colors";
import WorkListDropdownMenu from "./part/createOrderList/WorkListDropdownMenu";
import UploadFileDialog from "./part/createOrderList/UploadFileDialog";

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
    justifyContent: "space-between",
    justifyContent: "center",
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
  const WorkListBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "45%",
    height: "100%",
    padding: "0px 20px 20px",
    boxSizing: "border-box",
    backgroundColor: red[300],
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
  const FunctionBox = styled(Box)(({ theme }) => ({
    display: "none",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    height: "100%",
    padding: "20px",
    boxSizing: "border-box",
    backgroundColor: red[400],
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
  const WorkListTopUploadFileButton = styled(Button)(({ theme }) => ({
    width: "80%",
    height: "80%",
    color: "#fff",
    backgroundColor: brown[500],
    "&:hover": {
      transform: "scale(1.05)",
      transition: "all 0.2s ease-in-out",
      backgroundColor: brown[700],
      cursor: "pointer",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
  }));
  const WorkListBottonBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "90%",
    backgroundColor: red[200],
  }));

  const [functionBoxOpen, setFunctionBoxOpen] = useState(false);
  const [uploadFileDialogOpen, setUploadFileDialogOpen] = useState(false);

  const onFunctionMenuValueHandler = (mode) => {
    console.log(mode);
    setFunctionBoxOpen(true);
  };

  const onUploadFileOpenHAndler = () => {};
  return (
    <StyleStack>
      <StyleBox>
        <WorkListBox>
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
          <WorkListBottonBox>123</WorkListBottonBox>
        </WorkListBox>

        <FunctionBox>123</FunctionBox>
      </StyleBox>
    </StyleStack>
  );
}

export default CreateOrderListScreen;
