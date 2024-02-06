import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import OrderListDialogTabs from "./OrderListDialogTabs";
import OrderListDialogExecutionList from "./OrderListDialogExecutionList";
import "./css/OrderListDialog.css";
import { Colors } from "../../../../styles/theme";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OrderListDialog(props) {
  const { isDoing, executeOrderId } = props.robotExecutionData;
  const { orderListDialogOpen, onOrderListDialogOpen } = props;
  const handleClose = () => {
    props.onOrderListDialogOpen(false);
  };

  React.useEffect(() => {
    if (orderListDialogOpen) {
      if (executeOrderId.length === 0 && !isDoing) {
        onOrderListDialogOpen(false);
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
          sx={{
            backgroundColor: Colors.brown,
            padding: 0,
            width: "400px",
            overflow: "hidden",
          }}
        >
          {["inactivate", "success", "reset"].includes(props.robotStateMode) &&
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
