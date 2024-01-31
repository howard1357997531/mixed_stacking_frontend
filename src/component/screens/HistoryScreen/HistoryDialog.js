import * as React from "react";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Colors } from "../../../styles/theme";
import { useMediaQuery } from "@mui/material";
import {
  AvatarBox,
  AvatarDivider,
  DescText,
  HistoryDetailBox,
  HistoryDetailSmBox,
  NameBox,
  StyleAvatar,
  StyleDialogContent,
  StyleDialogTitle,
} from "../../../styles/HistoryScreen/HistoryDesktop";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function HistoryDialog({ open, closeOpen }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const handleClose = () => {
    closeOpen();
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"lg"}
      >
        <StyleDialogTitle id="customized-dialog-title">
          2024/01/25
        </StyleDialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 3,
            color: (theme) => theme.palette.grey[700],
          }}
        >
          <CloseIcon />
        </IconButton>
        <StyleDialogContent dividers>
          <DescText>執行時間 : 12:15 ~ 13:45</DescText>
          <DescText>執行工單數量 : 20個</DescText>
          <DescText isTitle={true}>詳細資訊</DescText>
          <HistoryDetailBox className="dialog-history-detail">
            {Array(10)
              .fill(0)
              .map((order, index) => (
                <HistoryDetailSmBox isFirst={index === 0}>
                  <AvatarBox>
                    <StyleAvatar>1</StyleAvatar>
                    <AvatarDivider />
                    <StyleAvatar>4</StyleAvatar>
                  </AvatarBox>

                  <NameBox>123</NameBox>
                </HistoryDetailSmBox>
              ))}
          </HistoryDetailBox>
        </StyleDialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
