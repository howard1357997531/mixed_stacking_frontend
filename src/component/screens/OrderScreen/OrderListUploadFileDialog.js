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
  DragIndex,
  DragIndexBox,
  DragName,
  DragNameBox,
  FileFormat,
  StyleCloudUploadIcon,
  StyleDialogContent,
  StyleDocumentScannerIcon,
  StyleReportIcon,
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

  const [drag, setDrag] = React.useState(false);
  const [hasDragItem, setHasDragItem] = React.useState(false);
  const [dragList, setDragList] = React.useState(null);
  const [dragFiles, setDragFiles] = React.useState(null);
  const [fileFormat, setFileFormat] = React.useState(false);

  const handleClose = () => {
    onCloseDialog();
    setTimeout(() => {
      setDrag(false);
      setHasDragItem(false);
      setDragList(null);
      setFileFormat(false);
    }, 500);
  };

  React.useEffect(() => {
    // 若body裡面有個div，進來body會一直觸發(正常)，
    // 而不管是進去div或離開div都會一直觸發(應該是冒泡事件)
    const handleDragOver = (e) => {
      e.preventDefault();
      // console.log("DragOver body");
    };

    // 若body裡面有個div，進去body會觸發(正常)，
    // 但是進去div裡面也會觸發，裡開div也會在觸發一次(應該是冒泡事件)
    const handleDragEnter = (e) => {
      e.preventDefault();
      setDrag(true);
      setHasDragItem(false);
      setFileFormat(false);
      // console.log("DragEnter body");
      // 不能在 enter 時取得檔案資訊，可能要drop後才可以
      // console.log(e.dataTransfer.files);
    };

    // dragLeave 盡量不要設置東西，若body裡面有個div，離開body會觸發(正常)，
    // 但是進去div裡面也會觸發，裡開div也會在觸發一次(應該是冒泡事件)
    const handleDragLeave = (e) => {
      e.preventDefault();
      // console.log("DragLeave body");
    };

    //若進去div 顯示順序 DragEnter body -> enter -> DragLeave body
    //若離開div 顯示順序 DragEnter body -> DragLeave body -> leave

    const handleDrop = (e) => {
      e.preventDefault();
      setDrag(false);
      console.log("Drop body");
      return false;
    };

    document.body.addEventListener("dragover", handleDragOver);
    document.body.addEventListener("dragenter", handleDragEnter);
    document.body.addEventListener("dragleave", handleDragLeave);
    document.body.addEventListener("drop", handleDrop);

    return () => {
      document.body.removeEventListener("dragover", handleDragOver);
      document.body.removeEventListener("dragenter", handleDragEnter);
      document.body.removeEventListener("dragleave", handleDragLeave);
      document.body.removeEventListener("drop", handleDrop);
    };
  }, []);

  // 進入目標物觸發(會一直觸發)
  // 一定要使用 dragOver 才能使用 drop
  const onDragOverHandler = (e) => {
    e.preventDefault();
    // console.log("over");
  };

  // 進入目標物觸發(只會一次)
  const onDragEnterHandler = (e) => {
    e.preventDefault();
    console.log("enter");
  };

  // 離開目標物觸發(只會一次)
  const onDragLeaveHandler = (e) => {
    e.preventDefault();
    console.log("leave");
  };

  // 在指定區域放下目標物觸發
  const onDropHandler = (e) => {
    e.preventDefault();
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      if (!e.dataTransfer.files[i].name.includes(".csv")) {
        setFileFormat(true);
        return;
      }
    }

    setDrag(true);
    const temp = [];
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      temp.push(e.dataTransfer.files[i].name);
    }
    setHasDragItem(true);
    setDragList(temp);
    setDragFiles(e.dataTransfer.files);
    console.log("drop");
    console.log(e.dataTransfer.files);
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
    for (let i = 0; i < e.target.files.length; i++) {
      if (!e.target.files[i].name.includes(".csv")) {
        setFileFormat(true);
        return;
      }
    }
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
          // onDragEnter={onDragEnterHandler}
          // onDragLeave={onDragLeaveHandler}
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
            data={[modeCheck, drag, hasDragItem]}
          >
            {hasDragItem ? (
              dragList.map((dList, index) => (
                <DragNameBox key={index} data={[modeCheck, drag]}>
                  <DragIndexBox>
                    <DragIndex data={[modeCheck, drag]}>{index + 1}</DragIndex>
                  </DragIndexBox>

                  <DragName data={[modeCheck, drag]}>{dList}</DragName>
                </DragNameBox>
              ))
            ) : drag ? (
              <StyleDocumentScannerIcon mode={modeCheck} />
            ) : (
              <StyleCloudUploadIcon mode={modeCheck} />
            )}
          </DashBox>

          <UploadTextBox data={[modeCheck, drag]}>
            {!drag && !hasDragItem ? (
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
                  onClick={() => setFileFormat(false)}
                >
                  上傳
                </label>
              </>
            ) : null}

            <UploadText variant="body1" mode={modeCheck}>
              {hasDragItem
                ? `共 ${dragList.length} 個檔案`
                : drag
                ? "請將檔案拖曳至此"
                : "或拖曳檔案至此"}
            </UploadText>

            {hasDragItem ? (
              <UploadBtn mode={modeCheck} onClick={sendDragFileHandler}>
                上傳
              </UploadBtn>
            ) : null}
          </UploadTextBox>

          <BottonBox data={[modeCheck, fileFormat]}>
            {fileFormat ? <StyleReportIcon /> : null}

            <FileFormat data={[modeCheck, fileFormat]}>
              {fileFormat ? "格式錯誤，只允許格式 .csv" : "允許格式 .csv"}
            </FileFormat>
          </BottonBox>
        </StyleDialogContent>
      </BootstrapDialog>
    </>
  );
}

export default OrderListUploadFileDialog;
