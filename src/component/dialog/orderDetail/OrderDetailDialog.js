import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { brown } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { DIALOG } from "../../../redux/constants";
import OrderDetailDialogTabs from "./OrderDetailDialogTabs";
import "./css/OrderDetailDialog.css";
import { Colors } from "../../../styles/theme";
import { useTheme } from "@mui/material";

function OrderDetailDialog(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const handleClose = () => {
    dispatch({ type: DIALOG.order, payload: { orderId: null } });
    props.onCloseDialog();
  };

  const page = window.location.pathname === "/order";

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
            backgroundColor: page ? Colors.greenDialog : Colors.orangeDialog,
            padding: 0,
            width: "600px",
            [theme.breakpoints.down("md")]: {
              width: "80vw",
            },
          }}
        >
          <OrderDetailDialogTabs {...props} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OrderDetailDialog;
