import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { Box, Typography, styled } from "@mui/material";
import { brown, grey, orange, teal, yellow } from "@mui/material/colors";
import "./style.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ListDailog({
  listDailogOpen,
  onListDailogOpen,
  aiWorkListArray,
  onAiWorkListId,
}) {
  const [open, setOpen] = React.useState(listDailogOpen);

  const handleClose = () => {
    onListDailogOpen(false);
  };

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

  const aiWorkListHandler = (id) => {
    onAiWorkListId(id);
    onListDailogOpen(false);
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
        <DialogContent sx={{ backgroundColor: brown[300] }}>
          <StyleTitleBox>
            <StyleTypography>Name</StyleTypography>
            <StyleTypography>Create time</StyleTypography>
          </StyleTitleBox>
          <StyleBox className="dialog-box">
            {aiWorkListArray.map((ai) =>
              ai.display ? (
                <StyleInnerBox
                  key={ai.id}
                  onClick={() => aiWorkListHandler(ai.id)}
                >
                  <StyleInnerSmallBox>{ai.name}</StyleInnerSmallBox>
                  <StyleInnerSmallBox>{ai.createdAt}</StyleInnerSmallBox>
                </StyleInnerBox>
              ) : null
            )}
          </StyleBox>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ListDailog;
