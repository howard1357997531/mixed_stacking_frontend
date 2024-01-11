import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { brown } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { DIALOG } from "../../../redux/constants";
import OrderDetailDialogTabs from "./OrderDetailDialogTabs";
import "./css/OrderDetailDialog.css";
import { Colors } from "../../../styles/theme";

function OrderDetailDialog(props) {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({ type: DIALOG.order, payload: { orderId: null } });
    props.onCloseDialog();
  };
  return (
    <div>
      <Dialog
        maxWidth={"md"}
        open={props.openDialog}
        keepMounted
        onClose={handleClose}
      >
        <DialogContent
          sx={{
            backgroundColor: Colors.lightOrange,
            padding: 0,
            width: "600px",
          }}
        >
          <OrderDetailDialogTabs {...props} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OrderDetailDialog;
