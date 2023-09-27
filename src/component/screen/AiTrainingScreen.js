import { Avatar, Box, Button, Stack, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { brown, grey, lightBlue, orange, red } from "@mui/material/colors";
import WorkListTab from "../part/aiTraining/WorkListTab";
import "./css/ai-training.css";
import { useNavigate } from "react-router-dom";
import { customColor } from "../customColor/customColor";

function AiTrainingScreen() {
  const StyleStack = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    alignItems: "center",
    height: "calc(100vh - 100px)",
    padding: "0px 100px",
    // backgroundColor: "#888",
    [theme.breakpoints.down("lg")]: {
      padding: "0px 20px",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      height: "initial",
      padding: "30px 20px",
    },
  }));
  const StyleBox = styled(Box)(({ theme }) => ({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: "70vh",
    padding: "30px 50px",
  }));
  const StyleTitle = styled(Typography)(({ theme }) => ({
    position: "absolute",
    top: "-30px",
    left: "50px",
    fontSize: "40px",
    fontWeight: 600,
  }));
  const StyleSmallBox = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    height: "100%",
    borderRadius: "20px",
    backgroundColor: customColor.lightOrange,
  }));

  //right box
  const StyleRightBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    borderRadius: "20px",
    backgroundColor: customColor.lightOrange,
  }));
  const StyleTitleRightBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "49px",
    borderBottom: `1px solid rgba(0, 0, 0, 0.12)`,
  }));
  const StyleContentRightBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "calc(100% - 49px)",
  }));
  const StyleContentTopRightBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: "10%",
    fontWeight: 600,
    color: brown[600],
  }));
  const StyleContentTopSmallBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "33.3%",
    height: "100%",
  }));
  const StyleContentMiddleRightBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "75%",
  }));
  const StyleScrollBox = styled(Box)({
    border: `2px solid ${brown[400]}`,
    width: "90%",
    height: "100%",
    overflowY: "auto",
  });
  const StyleContentMiddleRightBoxGifText = styled(Typography)({
    position: "absolute",
    top: "58%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: lightBlue[700],
    fontSize: "26px",
    fontWeight: 600,
  });
  const StyleContentMiddleSmallBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "60px",
    color: grey[800],
    fontWeight: 600,
  }));
  const StyleContentMiddleSmallerBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    width: "33.3%",
    height: "100%",
  }));
  const StyleContentBottomRightBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "15%",
  }));
  const StyleContentBottomText = styled(Typography)(({ theme }) => ({
    marginLeft: "5%",
    color: grey[600],
    fontWeight: 600,
  }));
  const StyleContentBottomButton = styled(Button)({
    width: "30%",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: grey[700],
    marginRight: "5%",
    "&:hover": {
      transform: "scale(1.05)",
      transition: "all 0.2s ease-in-out",
      backgroundColor: grey[800],
    },
    "&:active": {
      transform: "scale(.95)",
    },
  });

  const navigate = useNavigate();
  const [currentWorkListId, setCurrentWorkListId] = useState(null);
  const [allWorkList, setAllWorkList] = useState([]);
  const [workList, setWorkList] = useState({});
  const [workListArray, setWorkListArray] = useState([]);
  const [aiWorkListArray, setAiWorkListArray] = useState([]);
  const [hasAiTrain, setHasAiTrain] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const itemSize = {
    "16A": "70 * 52 * 32 (mm)",
    "18A": "70 * 52 * 36 (mm)",
    33: "88 * 42 * 36 (mm)",
    "7A": "70 * 52 * 40 (mm)",
    13: "112 * 50 * 28 (mm)",
    22: "90 * 52 * 36 (mm)",
    20: "106 * 68 * 26 (mm)",
    29: "130 * 50 * 36 (mm)",
    9: "86 * 64 * 46 (mm)",
    26: "144 * 50 * 40 (mm)",
    35: "204 * 92 * 36 (mm)",
  };

  const RobotControlHandler = () => {
    navigate("/control-robot");
  };

  const onHasAiTrainHandler = (mode) => {
    setHasAiTrain(mode);
  };

  const onCurrentWorkListStateHandler = (id) => {
    const data = allWorkList.filter((list) => {
      return list.id === id;
    });
    setCurrentWorkListId(data[0].id);
    setWorkList(data[0]);
    setWorkListArray([
      { name: "16A", qty: data[0]._16A_qty },
      { name: "18A", qty: data[0]._18A_qty },
      { name: "33", qty: data[0]._33_qty },
      { name: "7A", qty: data[0]._7A_qty },
      { name: "13", qty: data[0]._13_qty },
      { name: "22", qty: data[0]._22_qty },
      { name: "20", qty: data[0]._20_qty },
      { name: "29", qty: data[0]._29_qty },
      { name: "9", qty: data[0]._9_qty },
      { name: "26", qty: data[0]._26_qty },
      { name: "35", qty: data[0]._35_qty },
    ]);
    setHasAiTrain(data[0].hasAiTrained);
  };

  const onAiWorkListChangeHandler = (data) => {
    const date = new Date();
    const month =
      date.getMonth() + 1 >= 10
        ? date.getMonth() + 1
        : `0${date.getMonth() + 1}`;
    const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
    const time = `${date.getFullYear()}/${month}/${day} ${date.getHours()}:${date.getMinutes()}`;

    setAiWorkListArray([
      ...aiWorkListArray,
      {
        list_order: data.list_order,
        worklist_id: data.worklist_id,
        createdAt: time,
        training_time: data.training_time,
      },
    ]);

    const newAllWorkList = allWorkList.map((list) => {
      if (list.id === data.worklist_id) {
        return { ...list, hasAiTrained: true };
      } else {
        return list;
      }
    });

    setAllWorkList(newAllWorkList);
    setHasAiTrain(true);
    setLoading(false);
  };

  const onLoading = (mode) => {
    setLoading(mode);
  };

  useEffect(() => {
    try {
      axios.get("http://127.0.0.1:8000/api/getWorkOrderData/").then((res) => {
        setAllWorkList(res.data);
        setCurrentWorkListId(res.data[0].id);
        setWorkList(res.data[0]);
        setWorkListArray([
          { name: "16A", qty: res.data[0]._16A_qty },
          { name: "18A", qty: res.data[0]._18A_qty },
          { name: "33", qty: res.data[0]._33_qty },
          { name: "7A", qty: res.data[0]._7A_qty },
          { name: "13", qty: res.data[0]._13_qty },
          { name: "22", qty: res.data[0]._22_qty },
          { name: "20", qty: res.data[0]._20_qty },
          { name: "29", qty: res.data[0]._29_qty },
          { name: "9", qty: res.data[0]._9_qty },
          { name: "26", qty: res.data[0]._26_qty },
          { name: "35", qty: res.data[0]._35_qty },
        ]);
        setHasAiTrain(res.data[0].hasAiTrained);
      });
    } catch (error) {}
  }, []);

  useEffect(() => {
    try {
      axios.get("http://127.0.0.1:8000/api/getAiWorkOrderData/").then((res) => {
        setAiWorkListArray(res.data);
      });
    } catch (error) {}
  }, []);

  return (
    <StyleStack>
      <StyleBox>
        <StyleTitle>工單查詢</StyleTitle>
        <StyleSmallBox>
          <WorkListTab
            allWorkList={allWorkList}
            currentWorkListId={currentWorkListId}
            workList={workList}
            workListArray={workListArray}
            hasAiTrain={hasAiTrain}
            onHasAiTrain={onHasAiTrainHandler}
            onCurrentWorkListState={onCurrentWorkListStateHandler}
            onAiWorkListChange={onAiWorkListChangeHandler}
            onLoading={onLoading}
          ></WorkListTab>
        </StyleSmallBox>
      </StyleBox>

      {/* Ai演算結果 */}
      <StyleBox>
        <StyleRightBox>
          <StyleTitleRightBox>
            <Typography variant="h5" sx={{ color: grey[800], fontWeight: 600 }}>
              AI演算結果
            </Typography>
          </StyleTitleRightBox>

          <StyleContentRightBox>
            <StyleContentTopRightBox>
              {hasAiTrain ? (
                <>
                  <StyleContentTopSmallBox>次序</StyleContentTopSmallBox>
                  <StyleContentTopSmallBox>
                    <span style={{ marginRight: "20px" }}>物料</span>
                  </StyleContentTopSmallBox>
                  <StyleContentTopSmallBox>
                    <span style={{ marginRight: "20px" }}>尺寸</span>
                  </StyleContentTopSmallBox>
                </>
              ) : null}
            </StyleContentTopRightBox>

            <StyleContentMiddleRightBox>
              {hasAiTrain ? (
                <StyleScrollBox className="ai-worklist">
                  {aiWorkListArray.map((ai) => {
                    if (ai.worklist_id === currentWorkListId) {
                      return ai.list_order.split(",").map((box, index) => (
                        <StyleContentMiddleSmallBox>
                          <StyleContentMiddleSmallerBox
                            sx={{ color: red[900] }}
                          >
                            <Avatar>{index + 1}</Avatar>
                          </StyleContentMiddleSmallerBox>
                          <StyleContentMiddleSmallerBox>
                            {box}
                            <img
                              src={`${box}.png`}
                              alt={`${box}.png`}
                              className="ai-result-img"
                            ></img>
                          </StyleContentMiddleSmallerBox>
                          <StyleContentMiddleSmallerBox>
                            {itemSize[box]}
                          </StyleContentMiddleSmallerBox>
                        </StyleContentMiddleSmallBox>
                      ));
                    } else {
                      return null;
                    }
                  })}
                </StyleScrollBox>
              ) : // "尚未進行AI演算"
              loading ? (
                <Box
                  className="gif"
                  sx={{ position: "relative", width: "100%", height: "100%" }}
                >
                  <img src={"loading.gif"} alt={"loading.gif"}></img>
                  <StyleContentMiddleRightBoxGifText>
                    演算中
                  </StyleContentMiddleRightBoxGifText>
                </Box>
              ) : (
                <Typography
                  variant="h6"
                  sx={{ color: brown[500], fontWeight: 600 }}
                >
                  尚未進行AI演算
                </Typography>
              )}
            </StyleContentMiddleRightBox>

            <StyleContentBottomRightBox>
              {hasAiTrain ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "60%",
                    }}
                  >
                    <StyleContentBottomText variant="body1">
                      演算時間 :{" "}
                      {aiWorkListArray.map((ai) => {
                        if (ai.worklist_id === currentWorkListId) {
                          let minute = Math.trunc(ai.training_time / 60);
                          let second = Math.trunc(
                            ai.training_time - minute * 60
                          );
                          if (minute === 0) {
                            return `${second} 秒`;
                          } else {
                            return `${minute} 分 ${second} 秒`;
                          }
                        } else {
                          return null;
                        }
                      })}
                    </StyleContentBottomText>
                    <StyleContentBottomText variant="body1">
                      創建時間 :{" "}
                      {aiWorkListArray.map((ai) => {
                        if (ai.worklist_id === currentWorkListId) {
                          return ai.createdAt;
                        } else {
                          return null;
                        }
                      })}
                    </StyleContentBottomText>
                  </Box>
                  <StyleContentBottomButton onClick={RobotControlHandler}>
                    手臂控制台
                  </StyleContentBottomButton>
                </>
              ) : null}
            </StyleContentBottomRightBox>
          </StyleContentRightBox>
        </StyleRightBox>
      </StyleBox>
    </StyleStack>
  );
}

export default AiTrainingScreen;
