import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { brown, grey } from "@mui/material/colors";
import { Box } from "@mui/material";
import axios from "axios";
import "./css/uploadFileDialog.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function UploadFileDialog() {
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
  const StyleDialogContent = styled(DialogContent)(({ theme }) => ({
    position: "relative",
    width: "680px",
    height: "450px",
  }));
  const DashBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "20%",
    height: "20%",
    border: `1px dashed ${grey[800]}`,
  }));
  const UploadTextBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "red",
  }));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fileChangeHandler = (e) => {
    const formData = new FormData();
    formData.append(`csv_file_length`, e.target.files.length);
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append(`csv_file${i + 1}`, e.target.files[i]);
      formData.append(`csv_file_name${i + 1}`, e.target.files[i].name);
    }
    axios
      .post("http://127.0.0.1:8000/api/uploadCsv/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {});
  };

  return (
    <>
      <WorkListTopUploadFileButton variant="outlined" onClick={handleClickOpen}>
        上傳工單
      </WorkListTopUploadFileButton>
      <BootstrapDialog
        maxWidth={false}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
        ></DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <StyleDialogContent>
          <DashBox></DashBox>
          <UploadTextBox>
            <input
              type="file"
              id="file"
              onChange={fileChangeHandler}
              style={{ display: "none" }}
              multiple
            />
            <label htmlFor="file" className="labelStyle">
              上傳
            </label>
          </UploadTextBox>
        </StyleDialogContent>
      </BootstrapDialog>
    </>
  );
}

export default UploadFileDialog;
