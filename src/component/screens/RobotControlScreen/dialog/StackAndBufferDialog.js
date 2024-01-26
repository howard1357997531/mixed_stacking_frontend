import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import OrderListDialogTabs from "./OrderListDialogTabs";
import OrderListDialogExecutionList from "./OrderListDialogExecutionList";
import "./css/OrderListDialog.css";
import { Colors } from "../../../../styles/theme";
import {
  BufferBox,
  BufferContent,
  BufferInfoBox,
  BufferInfoSmBox,
  BufferTitle,
  Content,
  ImageBox,
  Title,
} from "../../../../styles/RobotControlScreen/dialog/StackAndBufferDialog";
import { domain } from "../../../../env";
import { useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function StackAndBufferDialog(props) {
  const {
    isDoing,
    executeOrderId: executeOrderIdArray,
    queue,
  } = props.robotExecutionData;
  const {
    robotStateMode,
    stackAndBufferOpen,
    onStackAndBufferOpen,
    itemCount,
  } = props;

  const { bufferquanlity } = useSelector(
    (state) => state.robotControlScreen_realtimeVisual
  );
  console.log("bufferquanlity:", bufferquanlity);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const handleClose = () => {
    props.onStackAndBufferOpen();
  };

  React.useEffect(() => {
    if (stackAndBufferOpen) {
      if (executeOrderIdArray.length === 0 && !isDoing) {
        onStackAndBufferOpen();
      }
    }
  }, [executeOrderIdArray, isDoing]);

  const qwe = [1, 2, 0, 0, 0, 0, 1, 3, 0, 0, 0];
  const buffer = [
    "#7",
    "#29",
    "#22",
    "#13",
    "#35",
    "#9",
    "#20",
    "#18A",
    "#16A",
    "#26",
    "#33",
  ];
  const buffer1 = bufferquanlity
    .slice(0, 5)
    .map((qty, index) => (qty !== 0 ? buffer[index] + `*${qty}` : qty));
  const buffer2 = bufferquanlity
    .slice(5)
    .map((qty, index) => (qty !== 0 ? buffer[index + 5] + `*${qty}` : qty));

  return (
    <div>
      <Dialog
        maxWidth={"md"}
        open={stackAndBufferOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent
          className="stack-and-buffer"
          sx={{
            display: "flex",
            flexDirection: matches ? "row" : "column",
            backgroundColor: Colors.brown,
            padding: 0,
            maxWidth: "900px",
            height: "60vh",
          }}
        >
          <ImageBox className="dialog-stack-image">
            <Title>主棧板</Title>
            <Content>
              {!["inactivate", "reset"].includes(robotStateMode) ? (
                <img
                  src={`${domain}/static/media/ai_figure/Figures_${
                    executeOrderIdArray[queue - 1]
                  }/box_${itemCount}_bin_1.png`}
                  alt={`${domain}/static/media/ai_figure/Figures_${
                    executeOrderIdArray[queue - 1]
                  }/box_${itemCount}_bin_1.png`}
                  className="box-photo"
                ></img>
              ) : null}
              {/* <img
                src={`${domain}/static/media/ai_figure/Figures_${139}/box_${33}_bin_1.png`}
                alt={`${domain}/static/media/ai_figure/Figures_${139}/box_${33}_bin_1.png`}
              ></img> */}
            </Content>
          </ImageBox>

          {/* <ImageBox
            className="buffer-box"
            sx={{ borderLeft: `1px solid ${Colors.greyTextBlood}` }}
          > */}
          <ImageBox
            className="dialog-stack-image"
            sx={{ borderLeft: `1px solid ${Colors.greyTextBlood}` }}
          >
            <Title>Buffer 區</Title>
            <Content sx={{ gap: "8px" }}>
              {/* <BufferBox>
                <BufferTitle>Buffer 1</BufferTitle>
                <BufferContent className="buffer-content">
                  {buffer1.map((data, index) =>
                    data !== 0 ? (
                      <BufferInfoBox key={index}>
                        <BufferInfoSmBox>
                          {data.split("*").at(0)}
                        </BufferInfoSmBox>
                        <BufferInfoSmBox>
                          {data.split("*").at(1)} 個
                        </BufferInfoSmBox>
                      </BufferInfoBox>
                    ) : null
                  )}
                </BufferContent>
              </BufferBox>

              <BufferBox>
                <BufferTitle>Buffer 2</BufferTitle>
                <BufferContent className="buffer-content">
                  {buffer2.map((data, index) =>
                    data !== 0 ? (
                      <BufferInfoBox key={index}>
                        <BufferInfoSmBox>
                          {data.split("*").at(0)}
                        </BufferInfoSmBox>
                        <BufferInfoSmBox>
                          {data.split("*").at(1)} 個
                        </BufferInfoSmBox>
                      </BufferInfoBox>
                    ) : null
                  )}
                </BufferContent>
              </BufferBox> */}
              <img
                src={`${domain}/static/media/step_4.png`}
                alt={`${domain}/static/media/step_4.png`}
              ></img>
            </Content>
          </ImageBox>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StackAndBufferDialog;
