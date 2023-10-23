import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { Box, Typography, styled } from "@mui/material";
import { brown, grey, orange, teal, yellow } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import LoadingCircle from "../../../tool/LoadingCircle";
import ErrorMsgBox from "../../../tool/ErrorMsgBox";
import { OrderListContentMsg } from "../../../styles/OrderScreen";
import { orderlistSelectAction } from "../../../redux/actions/RobotControlScreenAction";
import "./css/OrderListDialog.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OrderListDialog({ orderListDialogOpen, onOrderListDialoggOpen }) {
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
    height: "500px",
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

  const dispatch = useDispatch();
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const handleClose = () => {
    onOrderListDialoggOpen(false);
  };
  const orderListHandler = (orderId) => {
    const [selectOrderList] = orderListData.filter(
      (order) => order.id === orderId
    );
    dispatch(orderlistSelectAction(selectOrderList));
    onOrderListDialoggOpen(false);
  };

  return (
    <div>
      <Dialog
        maxWidth={"md"}
        open={orderListDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent sx={{ backgroundColor: brown[300] }}>
          <StyleTitleBox>
            <StyleTypography>名稱</StyleTypography>
            <StyleTypography>上傳時間</StyleTypography>
          </StyleTitleBox>
          <StyleBox className="dialog-box">
            {orderListLoading ? (
              <LoadingCircle />
            ) : orderListError ? (
              <ErrorMsgBox />
            ) : orderListData.length === 0 ? (
              <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
            ) : (
              orderListData.map((order) => (
                <StyleInnerBox
                  key={order.id}
                  onClick={() => orderListHandler(order.id)}
                >
                  <StyleInnerSmallBox>{order.name}</StyleInnerSmallBox>
                  <StyleInnerSmallBox>{order.createdAt}</StyleInnerSmallBox>
                </StyleInnerBox>
              ))
            )}
          </StyleBox>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OrderListDialog;
