import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import "./css/OrderListUploadFileDialog.css";
import Swal from "sweetalert2";
import { Colors } from "../../../styles/theme";
import { domain } from "../../../env";
import { timerToast } from "../../../swal";
import { ORDER_LIST } from "../../../redux/constants";
import { useDispatch } from "react-redux";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function OrderListUploadFileDialog({ open, onCloseDialog }) {
  const WorkListTopUploadFileButton = styled(Button)(({ theme }) => ({
    height: "60%",
    marginLeft: "10px",
    color: Colors.lightOrange,
    fontSize: "16px",
    fontWeight: 600,
    backgroundColor: Colors.grey600,
    textTransform: "capitalize",
    "&:hover": {
      transform: "scale(1.05)",
      transition: "all 0.2s ease-in-out",
      backgroundColor: Colors.grey600,
      cursor: "pointer",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
  }));
  const StyleDialogContent = styled(DialogContent)(({ theme }) => ({
    position: "relative",
    width: "600px",
    height: "400px",
    padding: "0px !important",
    backgroundColor: Colors.grey600,
  }));
  const DashBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    height: "25%",
    border: `1px dashed ${Colors.lightOrange}`,
  }));
  const UploadTextBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }));

  const UploadText = styled(Typography)(({ theme }) => ({
    color: Colors.lightOrange,
  }));

  const dispatch = useDispatch();
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

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

  return (
    <>
      {/* <WorkListTopUploadFileButton onClick={handleClickOpen}>
        上傳
      </WorkListTopUploadFileButton> */}
      <BootstrapDialog
        maxWidth={false}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: Colors.grey600 }}
          id="customized-dialog-title"
        ></DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            zIndex: 88,
            color: Colors.lightOrange,
          }}
        >
          <CloseIcon />
        </IconButton>

        <StyleDialogContent className="uploadAfter">
          <DashBox>
            <CloudUploadIcon
              sx={{ color: Colors.lightOrange, fontSize: "40px" }}
              className="uploadIconAnimation"
            />
          </DashBox>
          <UploadTextBox>
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
                fontWeight: 600,
                color: Colors.greyText,
                backgroundColor: Colors.lightOrange,
              }}
            >
              瀏覽
            </label>
            {/* Browse */}
            {/* or drag images here */}
            <UploadText variant="body1">或拖曳檔案至此</UploadText>
          </UploadTextBox>
        </StyleDialogContent>
      </BootstrapDialog>
    </>
  );
}

export default OrderListUploadFileDialog;
