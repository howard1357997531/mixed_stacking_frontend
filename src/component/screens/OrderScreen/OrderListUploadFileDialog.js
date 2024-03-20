import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Swal from "sweetalert2";
import { Colors } from "../../../styles/theme";
import { domain } from "../../../env";
import { timerToast } from "../../../swal";
import { ORDER_LIST } from "../../../redux/constants";
import { useDispatch, useSelector } from "react-redux";
import "./css/OrderListUploadFileDialog.css";
import {
  BottonBox,
  DashBox,
  DragNameBox,
  StyleCloudUploadIcon,
  StyleDialogContent,
  StyleDocumentScannerIcon,
  UploadBtn,
  UploadText,
  UploadTextBox,
} from "../../../styles/OrderScreen/OrderListUploadFileDialog";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function OrderListUploadFileDialog({ open, onCloseDialog }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.orderScreen_orderSelect);
  const modeCheck = mode === "multipleOrderCreate" ? true : false;
  const handleClose = () => {
    onCloseDialog();
    setDrag(false);
    setDragList(null);
  };

  const [drag, setDrag] = React.useState(false);
  const [dragList, setDragList] = React.useState(null);
  const [dragFiles, setDragFiles] = React.useState(null);

  // 進入目標物觸發(會一直觸發)
  const onDragOverHandler = (e) => {
    e.preventDefault();
    setDrag(true);
    console.log("over");
  };

  // 進入目標物觸發(只會一次)
  const onDragEnterHandler = (e) => {
    e.preventDefault();
    setDrag(true);
    console.log("enter");
  };

  // 離開目標物觸發(只會一次)
  const onDragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
    setDragList(null);
    console.log("leave");
  };

  // 在指定區域放下目標物觸發
  const onDropHandler = (e) => {
    e.preventDefault();
    const temp = [];
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      temp.push(e.dataTransfer.files[i].name);
    }
    setDragList(temp);
    setDragFiles(e.dataTransfer.files);
  };

  // 在 DashBox 和 UploadTextBox 上添加事件处理程序，阻止事件冒泡
  const stopPropagationHandler = (e) => {
    e.stopPropagation();
  };

  const sendDragFileHandler = () => {
    onCloseDialog();
    setDrag(false);
    setDragList(null);
    setDragFiles(null);

    const formData = new FormData();
    formData.append("csv_file_length", dragFiles.length);

    for (let i = 0; i < dragFiles.length; i++) {
      formData.append(`csv_file${i + 1}`, dragFiles[i]);
      formData.append(`csv_file_name${i + 1}`, dragFiles[i].name);
    }

    Swal.fire({
      position: "center",
      width: "16em",
      icon: "warning",
      title: "上傳中",
      background: Colors.orange,
      showConfirmButton: false,
      timer: 10000,
    });
    try {
      axios
        .post(`${domain}/api/uploadCsv/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          Swal.close();
          timerToast("success", "上傳成功");
          console.log(res.data);
          dispatch({
            type: ORDER_LIST.afterUpload,
            payload: res.data,
          });
        });
    } catch (error) {
      Swal.close();
      timerToast("error", "上傳失敗");
    }
  };

  const sendFileHandler = (e) => {
    onCloseDialog();

    const formData = new FormData();
    formData.append(`csv_file_length`, e.target.files.length);
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append(`csv_file${i + 1}`, e.target.files[i]);
      formData.append(`csv_file_name${i + 1}`, e.target.files[i].name);
    }
    Swal.fire({
      position: "center",
      width: "16em",
      icon: "warning",
      title: "上傳中",
      background: Colors.grey600,
      showConfirmButton: false,
      timer: 10000,
    });
    try {
      axios
        .post(`${domain}/api/uploadCsv/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          Swal.close();
          timerToast("success", "上傳成功");
          console.log(res.data);
          dispatch({
            type: ORDER_LIST.afterUpload,
            payload: res.data,
          });
        });
    } catch (error) {
      Swal.close();
      timerToast("error", "上傳失敗");
    }
  };
  return (
    <>
      <BootstrapDialog
        maxWidth={false}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <StyleDialogContent
          // className={modeCheck ? "uploadAfter2" : "uploadAfter"}
          drag={drag}
          onDragOver={onDragOverHandler}
          onDragEnter={onDragEnterHandler}
          onDragLeave={onDragLeaveHandler}
          onDrop={onDropHandler}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              zIndex: 88,
              color: modeCheck ? Colors.greenHover : Colors.lightOrange,
            }}
          >
            <CloseIcon />
          </IconButton>

          <DashBox
            className="upload-dash-box"
            data={[modeCheck, drag, dragList]}
            // onDragOver={stopPropagationHandler}
            // onDragEnter={stopPropagationHandler}
            // onDragLeave={stopPropagationHandler}
          >
            {dragList ? (
              dragList.map((dList, index) => (
                <DragNameBox key={index} data={[modeCheck, drag]}>
                  {dList}
                </DragNameBox>
              ))
            ) : drag ? (
              <StyleDocumentScannerIcon mode={modeCheck} />
            ) : (
              <StyleCloudUploadIcon mode={modeCheck} />
            )}
          </DashBox>

          <UploadTextBox
            data={[modeCheck, drag]}
            // onDragOver={stopPropagationHandler}
            // onDragEnter={stopPropagationHandler}
            // onDragLeave={stopPropagationHandler}
          >
            {!drag && !dragList ? (
              <>
                <input
                  type="file"
                  id="file"
                  onChange={sendFileHandler}
                  style={{ display: "none" }}
                  multiple
                />
                <label
                  htmlFor="file"
                  className="labelStyle"
                  style={{
                    color: Colors.greyText,
                    backgroundColor: modeCheck
                      ? Colors.greenHover
                      : Colors.lightOrange,
                  }}
                >
                  瀏覽
                </label>
              </>
            ) : null}

            <UploadText variant="body1" mode={modeCheck}>
              {dragList
                ? `共 ${dragList.length} 個檔案`
                : drag
                ? "已偵測到有拖曳檔案"
                : "或拖曳檔案至此"}
            </UploadText>

            {dragList ? (
              <UploadBtn onClick={sendDragFileHandler}>上傳</UploadBtn>
            ) : null}
          </UploadTextBox>

          <BottonBox
            mode={modeCheck}
            // onDragOver={stopPropagationHandler}
            // onDragEnter={stopPropagationHandler}
            // onDragLeave={stopPropagationHandler}
          >
            允許格式 : .csv
          </BottonBox>
        </StyleDialogContent>
      </BootstrapDialog>
    </>
  );
}

export default OrderListUploadFileDialog;
