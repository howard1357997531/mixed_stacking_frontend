import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import OrderListDialogTabs from "./OrderListDialogTabs";
import OrderListDialogExecutionList from "./OrderListDialogExecutionList";
import { useSelector } from "react-redux";
import { brown } from "@mui/material/colors";
import "./css/OrderListDialog.css";
import { Colors } from "../../../../styles/theme";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OrderListDialog(props) {
  const { isDoing, executeOrderId, queue } = props.robotExecutionData;

  const handleClose = () => {
    props.onOrderListDialoggOpen(false);
  };

  React.useEffect(() => {
    if (props.orderListDialogOpen) {
      if (executeOrderId.length == 0 && !isDoing) {
        props.onOrderListDialoggOpen(false);
      }
    }
  }, [executeOrderId, isDoing]);

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
          sx={{ backgroundColor: Colors.brown, padding: 0, width: "400px" }}
        >
          {["inactivate", "reset"].includes(props.robotStateMode) &&
          !isDoing ? (
            <OrderListDialogTabs {...props} />
          ) : (
            <OrderListDialogExecutionList {...props} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OrderListDialog;
