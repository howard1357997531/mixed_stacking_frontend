import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { brown } from "@mui/material/colors";
import OrderListDialogTabs from "./OrderListDialogTabs";
import "./css/OrderListDialog.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OrderListDialog(props) {
  const handleClose = () => {
    props.onOrderListDialoggOpen(false);
  };

  return (
    <div>
      <Dialog
        maxWidth={"md"}
        open={props.orderListDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent
          sx={{ backgroundColor: brown[300], padding: 0, width: "400px" }}
        >
          <OrderListDialogTabs {...props} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OrderListDialog;
