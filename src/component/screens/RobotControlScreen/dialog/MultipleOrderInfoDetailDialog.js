import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { brown } from "@mui/material/colors";
import MultipleOrderInfoDetailDialogTabs from "./MultipleOrderInfoDetailDialogTabs";
import "./css/MultipleOrderInfoDetailDialog.css";
import { useDispatch } from "react-redux";
import { ROBOT_CONTROL_SCREEN } from "../../../../redux/constants";

function MultipleOrderInfoDetailDialog(props) {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({
      type: ROBOT_CONTROL_SCREEN.informationArea,
      payload: { multipleOrderSelectId: null },
    });
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
