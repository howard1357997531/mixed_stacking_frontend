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
  BufferInfoImageText,
  BufferInfoSmBox,
  BufferInfoText,
  BufferTitle,
  Content,
  ImageBox,
  Title,
} from "../../../../styles/RobotControlScreen/dialog/StackAndBufferDialog";
import { domain } from "../../../../env";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
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
  // const bufferquanlity = [4, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1];
  // console.log("bufferquanlity:", bufferquanlity);
  const theme = useTheme();

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

  const bufferImageName = {
    "#16A": "16A",
    "#18A": "18A",
    "#33": "33",
    "#7": "7A",
    "#13": "13",
    "#22": "22",
    "#20": "20",
    "#29": "29",
    "#9": "9",
    "#26": "26",
    "#35": "35",
  };
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
            backgroundColor: Colors.darkPink,
            padding: 0,
            width: "900px",
            height: "60vh",
            [theme.breakpoints.down("lg")]: {
              width: "80vw",
            },
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              height: "75vh",
            },
            "@media screen and (orientation: portrait)": {
              flexDirection: "column",
              width: "500px",
              height: "60vh",
            },
            [theme.breakpoints.down("sm")]: {
              width: "80vw",
              height: "75vh",
            },
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
                        <BufferInfoSmBox className="buffer-image">
                          <img
                            src={`${
                              bufferImageName[data.split("*").at(0)]
                            }.png`}
                            alt={`${
                              bufferImageName[data.split("*").at(0)]
                            }.png`}
                          ></img>
                          <BufferInfoImageText>
                            {bufferImageName[data.split("*").at(0)]}
                          </BufferInfoImageText>
                        </BufferInfoSmBox>
                        <BufferInfoSmBox>
                          <BufferInfoText>
                            {data.split("*").at(1)} 個
                          </BufferInfoText>
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
                        <BufferInfoSmBox className="buffer-image">
                          <img
                            src={`${
                              bufferImageName[data.split("*").at(0)]
                            }.png`}
                            alt={`${
                              bufferImageName[data.split("*").at(0)]
                            }.png`}
                          ></img>
                          <BufferInfoImageText>
                            {bufferImageName[data.split("*").at(0)]}
                          </BufferInfoImageText>
                        </BufferInfoSmBox>
                        <BufferInfoSmBox>
                          <BufferInfoText>
                            {data.split("*").at(1)} 個
                          </BufferInfoText>
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
