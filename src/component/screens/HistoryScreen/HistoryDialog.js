import * as React from "react";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, useMediaQuery } from "@mui/material";
import {
  AvatarBox,
  AvatarDivider,
  DescText,
  HistoryDetailBox,
  HistoryDetailSmBox,
  InsertBox,
  InsertSmBox,
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

export default function HistoryDialog({ open, closeOpen, data }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const handleClose = () => {
    closeOpen();
  };

  const parseIndex = (order_id) => {
    const countArray = order_id.map((order) =>
      order.includes("*") ? parseInt(order.split("*").at(1)) : 1
    );

    var output = [];
    var firstIndex = 1;
    for (let i = 0; i < countArray.length; i++) {
      var temp = [];
      if (countArray[i] !== 1) {
        temp.push(firstIndex);
        temp.push(firstIndex + countArray[i] - 1);
        output.push(temp);
        firstIndex = firstIndex + countArray[i];
      } else {
        temp.push(firstIndex);
        output.push(temp);
        firstIndex = firstIndex + countArray[i];
      }
    }
    return output;
  };

  const parseCount = (orders) => {
    const count = orders
      .split(",")
      .map((order) =>
        order.includes("*") ? parseInt(order.split("*").at(1)) : 1
      );
    return count.reduce((acc, crr) => acc + crr);
  };

  if (data.id) {
    var historyData = [];
    let name = data.name.split(",");
    let order_id = data.order_id.split(",");
    let insert_index = data.insert_index.split(",");
    for (let i = 0; i < name.length; i++) {
      let tempObj = {};
      tempObj["name"] = name.at(i);
      tempObj["index"] = parseIndex(order_id).at(i);
      tempObj["isInsert"] = insert_index.includes(String(i));
      historyData.push(tempObj);
    }
  }

  return data.id ? (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"lg"}
      >
        <StyleDialogTitle id="customized-dialog-title">
          {data.start_time.slice(0, 10)}
        </StyleDialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 3,
            color: (theme) => theme.palette.grey[800],
          }}
        >
          <CloseIcon />
        </IconButton>
        <StyleDialogContent dividers>
          <DescText>
            執行時間 : {data.start_time.slice(11)} ~ {data.end_time.slice(11)}
          </DescText>
          <DescText>執行工單數量 : {parseCount(data.order_id)} 個</DescText>
          <Box>
            <DescText isTitle={true}>詳細資訊</DescText>
          </Box>

          <HistoryDetailBox className="dialog-history-detail">
            {historyData.map((hData, index) => (
              <HistoryDetailSmBox key={index} isFirst={index === 0}>
                {hData.isInsert ? (
                  <InsertBox>
                    <InsertSmBox>插</InsertSmBox>
                    <InsertSmBox>單</InsertSmBox>
                  </InsertBox>
                ) : null}

                <AvatarBox>
                  {hData.index.length > 1 ? (
                    <>
                      <StyleAvatar isInsert={hData.isInsert}>
                        {hData.index.at(0)}
                      </StyleAvatar>
                      <AvatarDivider isInsert={hData.isInsert} />
                      <StyleAvatar isInsert={hData.isInsert}>
                        {hData.index.at(1)}
                      </StyleAvatar>
                    </>
                  ) : (
                    <StyleAvatar isInsert={hData.isInsert}>
                      {hData.index.at(0)}
                    </StyleAvatar>
                  )}
                </AvatarBox>

                <NameBox>{hData.name}</NameBox>
              </HistoryDetailSmBox>
            ))}
          </HistoryDetailBox>
        </StyleDialogContent>
      </BootstrapDialog>
    </React.Fragment>
  ) : null;
}
