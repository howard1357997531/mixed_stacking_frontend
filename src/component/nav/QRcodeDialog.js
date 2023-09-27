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
import { brown, grey, orange } from "@mui/material/colors";
import { Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import Swal from "sweetalert2";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function QRcodeDialog({ qrcodeOpen, onQRcodeOpen, onQRcodeId }) {
  const StyleTitleBox = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "400px",
    height: "40px",
  }));
  const StyleTypography = styled(Typography)(({ theme }) => ({
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: orange[100],
    fontSize: "18px",
  }));
  const StyleBox = styled(Box)(({ theme }) => ({
    width: "400px",
    height: "400px",
    overflowY: "auto",
    border: `2px solid ${brown[500]}`,
  }));
  const StyleInnerBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "60px",
    "&:hover": {
      backgroundColor: brown[500],
      cursor: "pointer",
    },
    "&:active": {
      backgroundColor: brown[700],
    },
  }));
  const StyleInnerSmallBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: "50px",
    color: grey[900],
    fontWeight: 600,
    "&:hover": {
      backgroundColor: brown[500],
    },
    "&:active": {
      backgroundColor: brown[700],
    },
  }));
  const StyleButtonBox = styled(Button)(({ theme }) => ({
    width: "404px",
    height: "50px",
    marginTop: "10px",
    backgroundColor: grey[700],
    "&:hover": {
      backgroundColor: grey[800],
    },
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

  const runQRcodeOrder = (data) => {
    if (window.location.pathname === "/control-robot2") {
      onQRcodeId(data);
      onQRcodeOpen(false);
    } else {
      Swal.fire({
        position: "center",
        width: "16em",
        icon: "warning",
        title: "Upload. . .",
        background: brown[400],
        showConfirmButton: false,
        timer: 1000,
      }).then((res) => {
        window.location.reload();
      });
    }
  };

  const [qrcodeData, setQRcodeData] = React.useState([]);
  console.log(qrcodeData);
  React.useEffect(() => {
    const FetchText = () => {
      try {
        if (qrcodeOpen) {
          axios
            .post("http://127.0.0.1:8000/api/getQRcodeDataFromDatabase/", {
              url: window.location.pathname,
            })
            .then((res) => {
              if (res.data.mode === "has data") {
                const qrCodeData = {
                  id: res.data.id,
                  name: res.data.name,
                  createdAt: res.data.createdAt,
                  mode: "activate",
                  speed: 50,
                  qrcode: true,
                };
                setQRcodeData((prev) => {
                  return [...prev, qrCodeData];
                });
              } else {
                console.log(res.data.mode);
              }
            });
        } else {
          clearInterval(interval);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const interval = setInterval(FetchText, 1000);

    return () => clearInterval(interval);
  }, [qrcodeOpen]);

  return (
    <>
      <BootstrapDialog
        maxWidth={false}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
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
        <DialogContent sx={{ backgroundColor: brown[300] }}>
          <StyleTitleBox>
            <StyleTypography>Order name</StyleTypography>
            <StyleTypography>Create time</StyleTypography>
          </StyleTitleBox>

          <StyleBox className="dialog-box">
            {qrcodeData.map((qrcode) => (
              <StyleInnerBox key={qrcode.id}>
                <StyleInnerSmallBox>{qrcode.name}</StyleInnerSmallBox>
                <StyleInnerSmallBox>{qrcode.createdAt}</StyleInnerSmallBox>
              </StyleInnerBox>
            ))}
          </StyleBox>

          {qrcodeData.length !== 0 && (
            <StyleButtonBox
              variant="contained"
              onClick={() => runQRcodeOrder(qrcodeData)}
            >
              execute
            </StyleButtonBox>
          )}
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}

export default QRcodeDialog;
