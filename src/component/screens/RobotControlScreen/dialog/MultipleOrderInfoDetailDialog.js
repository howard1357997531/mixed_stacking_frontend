import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { brown } from "@mui/material/colors";
import MultipleOrderInfoDetailDialogTabs from "./MultipleOrderInfoDetailDialogTabs";
import "./css/MultipleOrderInfoDetailDialog.css";

function MultipleOrderInfoDetailDialog(props) {
  const handleClose = () => {
    props.onMultipleOrderInfoDetailDialogOpen(false);
  };
  return (
    <div>
      <Dialog
        maxWidth={"md"}
        open={props.multipleOrderInfoDetailDialogOpen}
        keepMounted
        onClose={handleClose}
      >
        <DialogContent
          sx={{ backgroundColor: brown[300], padding: 0, width: "600px" }}
        >
          <MultipleOrderInfoDetailDialogTabs {...props} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MultipleOrderInfoDetailDialog;
