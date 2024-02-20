import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import OrderListDialogTabs from "./OrderListDialogTabs";
import OrderListDialogExecutionList from "./OrderListDialogExecutionList";
import { Colors } from "../../../../styles/theme";
import {
  BufferBox,
  BufferContent,
  BufferInfoBox,
  BufferInfoSmBox,
  BufferInfoText,
  BufferTitle,
  Content,
  ImageBox,
  Title,
} from "../../../../styles/RobotControlScreen/dialog/StackAndBufferDialog";
import { domain } from "../../../../env";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import "./css/StackAndBufferDialog.css";

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
  // const bufferquanlity = [4, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0];
  // console.log("bufferquanlity:", bufferquanlity);
  const theme = useTheme();
  const matches_lg = useMediaQuery(theme.breakpoints.up("lg"));
  const matches_md = useMediaQuery(theme.breakpoints.up("md"));
  const matches_sm = useMediaQuery(theme.breakpoints.up("sm"));
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
            flexDirection: matches_md ? "row" : "column",
            backgroundColor: Colors.darkPink,
            padding: 0,
            width: matches_lg ? "900px" : "75vw",
            height: matches_md ? "60vh" : "75vh",
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
              <BufferBox>
                <BufferTitle>Buffer 1</BufferTitle>
                <BufferContent className="stack-and-buffer">
                  {buffer1.map((data, index) =>
                    data !== 0 ? (
                      <BufferInfoBox key={index}>
                        <BufferInfoSmBox>
                          <BufferInfoText>
                            {data.split("*").at(0)}
                          </BufferInfoText>
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
                <BufferContent className="stack-and-buffer">
                  {buffer2.map((data, index) =>
                    data !== 0 ? (
                      <BufferInfoBox key={index}>
                        <BufferInfoSmBox>
                          <BufferInfoText>
                            {data.split("*").at(0)}
                          </BufferInfoText>
                        </BufferInfoSmBox>
                        <BufferInfoSmBox>
                          {data.split("*").at(1)} 個
                        </BufferInfoSmBox>
                      </BufferInfoBox>
                    ) : null
                  )}
                </BufferContent>
              </BufferBox>
              {/* <img
                src={`${domain}/static/media/step_4.png`}
                alt={`${domain}/static/media/step_4.png`}
              ></img> */}
            </Content>
          </ImageBox>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StackAndBufferDialog;
