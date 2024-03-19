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
  StyleCloudUploadIcon,
  StyleDialogContent,
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
  };

  const fileChangeHandler = (e) => {
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

  const [drag, setDrag] = React.useState(false);

  // 進入目標物觸發(會一直觸發)
  const onDragOverHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  // 進入目標物觸發(只會一次)
  const onDragEnterHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  // 離開目標物觸發(只會一次)
  const onDragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  // 在指定區域放下目標物觸發
  const onDropHandler = (e) => {
    e.preventDefault();
    console.log("onDropHandler");
    console.log(e.dataTransfer.files);
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

          <DashBox mode={modeCheck}>
            <StyleCloudUploadIcon
              mode={modeCheck}
              className="uploadIconAnimation"
            />
          </DashBox>

          <UploadTextBox>
            {!drag ? (
              <>
                <input
                  type="file"
                  id="file"
                  onChange={fileChangeHandler}
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
              {drag ? "放開即刻上傳檔案" : "或拖曳檔案至此"}
            </UploadText>
          </UploadTextBox>

          <BottonBox mode={modeCheck}>允許格式 : .csv</BottonBox>
        </StyleDialogContent>
      </BootstrapDialog>
    </>
  );
}

export default OrderListUploadFileDialog;
