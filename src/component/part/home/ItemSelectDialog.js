import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Typography, styled } from "@mui/material";
import { brown, grey, indigo, orange } from "@mui/material/colors";
import "./style.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ItemSelectDialog({ listDailogOpen, onListDailogOpen, data, data2 }) {
  const [open, setOpen] = React.useState(listDailogOpen);

  const handleClose = () => {
    onListDailogOpen(false);
  };

  const StyleBox = styled(Box)(({ theme }) => ({
    width: "400px",
    height: "400px",
    overflowY: "auto",
    border: `1px solid ${brown[500]}`,
  }));
  const StyleInnerBox = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    height: "100px",
  }));
  const StyleInnerImageBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "33%",
    height: "100%",
  }));
  const StyleInnerNameBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "33%",
    height: "100%",
  }));
  const StyleInnerCountBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "33%",
    height: "100%",
    // backgroundColor: red[300],
  }));
  const StyleDialogTitle = styled(DialogTitle)(({ theme }) => ({
    textAlign: "center",
    fontSize: "26px",
    fontWeight: 600,
    color: brown[500],
    backgroundColor: brown[300],
  }));
  const StyleDialogActions = styled(DialogActions)(({ theme }) => ({
    color: brown[500],
    backgroundColor: brown[300],
  }));
  const StyleDialogActionsBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 16px",
    paddingBottom: "8px",
    width: "100%",
    height: "100%",
  }));

  const navigate = useNavigate();

  const buttonHandler = () => {
    const listName = document.querySelector(".name");
    if (!listName.value) {
      Swal.fire({
        title: "請輸入工單名稱",
        icon: "warning",
        background: indigo[200],
      });
    } else {
      data.name = listName.value;
      try {
        axios
          .post("http://127.0.0.1:8000/api/createWorkOrder/", data)
          .then((res) => {
            Swal.fire({
              title: "建立成功",
              icon: "success",
              background: indigo[200],
            }).then((res) => {
              navigate("/order");
              window.location.reload();
            });
          });
      } catch (error) {
        Swal.fire({
          title: "Error",
          icon: "error",
          background: indigo[200],
        });
      }
    }
  };
  return (
    <div>
      <Dialog
        maxWidth={"md"}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <StyleDialogTitle>
          <input type="text" placeholder="請輸入工單名稱" className="name" />
        </StyleDialogTitle>

        <DialogContent
          sx={{ backgroundColor: brown[300], paddingBottom: "5px" }}
        >
          <StyleBox className="dialog-box">
            {data2.map((data) =>
              data.count !== 0 ? (
                <StyleInnerBox>
                  <StyleInnerImageBox>
                    <img src={data.image} alt={data.image}></img>
                  </StyleInnerImageBox>

                  <StyleInnerNameBox>
                    <Typography variant="h6" sx={{ color: grey[800] }}>
                      {data.name}
                    </Typography>
                  </StyleInnerNameBox>

                  <StyleInnerCountBox>
                    <Typography sx={{ color: brown[800] }}>
                      數量 :{" "}
                      <span
                        style={{
                          color: orange[200],
                          marginLeft: "5px",
                          fontSize: "20px",
                        }}
                      >
                        {data.count}
                      </span>
                    </Typography>
                  </StyleInnerCountBox>
                </StyleInnerBox>
              ) : null
            )}
          </StyleBox>
        </DialogContent>

        <StyleDialogActions>
          <StyleDialogActionsBox>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              總共 : <span style={{ color: orange[200] }}>{data.count}</span> 個
            </Typography>
            <Button
              variant="contained"
              sx={{
                width: "20%",
                fontWeight: 600,
                color: "#fff",
                backgroundColor: grey[700],
                "&:hover": {
                  backgroundColor: grey[900],
                  transition: "all 0.1s ease-in-out",
                  transform: "scale(1.05)",
                  cursor: "pointer",
                },
                "&:active": {
                  transform: "scale(0.9)",
                },
              }}
              onClick={buttonHandler}
            >
              送出
            </Button>
          </StyleDialogActionsBox>
        </StyleDialogActions>
      </Dialog>
    </div>
  );
}

export default ItemSelectDialog;
