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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function QRcodeDialog({ qrcodeOpen, onQRcodeOpen }) {
  const WorkListTopUploadFileButton = styled(Button)(({ theme }) => ({
    width: "80%",
    height: "60%",
    color: "#fff",
    backgroundColor: brown[500],
    textTransform: "capitalize",
    "&:hover": {
      transform: "scale(1.05)",
      transition: "all 0.2s ease-in-out",
      backgroundColor: brown[600],
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
    backgroundColor: brown[300],
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
    border: `1px dashed ${grey[100]}`,
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
    color: grey[100],
  }));

  const [open, setOpen] = React.useState(qrcodeOpen);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onQRcodeOpen(false);
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
      .then((res) => {
        window.location.reload();
      });
  };

  return (
    <>
      {/* <WorkListTopUploadFileButton variant="outlined" onClick={handleClickOpen}>
        Upload
      </WorkListTopUploadFileButton> */}
      <BootstrapDialog
        maxWidth={false}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: brown[300] }}
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
            color: (theme) => theme.palette.grey[700],
          }}
        >
          <CloseIcon />
        </IconButton>

        <StyleDialogContent className="useAfter">
          <DashBox>
            <CloudUploadIcon
              sx={{ color: grey[100], fontSize: "40px" }}
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
            <label htmlFor="file" className="labelStyle">
              Browse
            </label>
            <UploadText variant="body1">or drag images here</UploadText>
          </UploadTextBox>
        </StyleDialogContent>
      </BootstrapDialog>
    </>
  );
}

export default QRcodeDialog;
