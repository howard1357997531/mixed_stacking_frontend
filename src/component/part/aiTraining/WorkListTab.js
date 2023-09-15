import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, ThemeProvider, createTheme, styled } from "@mui/material";
import {
  blue,
  brown,
  deepPurple,
  grey,
  indigo,
  teal,
  yellow,
} from "@mui/material/colors";
import axios from "axios";
import "./css/workList.css";
import Swal from "sweetalert2";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function WorkListTab({
  allWorkList,
  currentWorkListId,
  workList,
  workListArray,
  hasAiTrain,
  onHasAiTrain,
  onCurrentWorkListState,
  onAiWorkListChange,
  onLoading,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: `${yellow[500]}`,
      },
    },
  });
  const StyleTab = styled(Tab)({
    color: grey[800],
    fontSize: "18px",
    fontWeight: "600",
  });
  const StyleBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "calc(70vh  - 49px)",
  });
  const StyleTitleBox = styled(Box)({
    position: "relative",
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    width: "100%",
    height: "10%",
  });
  const StyleTitle = styled(Typography)({
    color: grey[800],
    fontWeight: 600,
    marginLeft: "5%",
  });
  const StyleListBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "75%",
  });
  const StyleScrollBox = styled(Box)({
    border: `2px solid ${grey[700]}`,
    width: "90%",
    height: "100%",
    overflowY: "auto",
  });
  const StyleScrollSmallBox = styled(Box)({
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    width: "100%",
    height: "60px",
  });
  const StyleScrollHistoryTitleBox = styled(Box)({
    display: "flex",
    width: "90%",
    height: "100%",
    color: grey[800],
    fontWeight: 600,
  });
  const StyleScrollHistoryTitleSmallBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    height: "100%",
  });
  const StyleScrollHistorySmallBox = styled(Box)({
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    width: "100%",
    height: "60px",
    color: grey[900],
    fontWeight: 600,
    "&:hover": {
      backgroundColor: grey[400],
      cursor: "pointer",
    },
  });
  const StyleButtonBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "15%",
  });
  const StyleButton = styled(Button)({
    width: "30%",
    fontSize: "16px",
    fontWeight: 600,
    // backgroundColor: brown[300],
    color: brown[300],
    border: `2px solid ${brown[300]}`,
    marginRight: "5%",
    "&:hover": {
      transform: "scale(1.05)",
      transition: "all 0.2s ease-in-out",
      color: "#fff",
      backgroundColor: brown[300],
      borderColor: brown[300],
    },
    "&:active": {
      transform: "scale(.95)",
    },
  });

  const [isTraining, setIsTraining] = React.useState(false);

  const workListButtonHandler = (id) => {
    const data = {
      id: id,
    };

    Swal.fire({
      title: "確定執行演算?",
      icon: "question",
      background: brown[300],
      showCancelButton: true,
      confirmButtonColor: deepPurple[300],
      cancelButtonColor: "#d33",
      confirmButtonText: "確定",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        onLoading(true);
        setIsTraining(true);
        axios
          .post("http://127.0.0.1:8000/api/aiCalculate/", data)
          .then((res) => {
            onLoading(false);
            setIsTraining(false);
            onHasAiTrain(true);
            onAiWorkListChange(res.data);
          });
      }
    });
  };

  const selectWorkListHandler = (id) => {
    Swal.fire({
      position: "center",
      width: "16em",
      icon: "success",
      title: "已選擇",
      background: brown[400],
      showConfirmButton: false,
      timer: 1000,
    }).then((res) => {
      onCurrentWorkListState(id);
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <StyleTab label="工單" {...a11yProps(0)} />
          <StyleTab label="歷史紀錄" {...a11yProps(1)} />
        </Tabs>
      </Box>

      {/* 工單 */}
      <CustomTabPanel value={value} index={0}>
        <StyleBox>
          <StyleTitleBox>
            <StyleTitle variant="h6">
              名稱 : <span style={{ color: blue[700] }}>{workList.name}</span>
            </StyleTitle>
            <StyleTitle
              variant="body1"
              sx={{
                position: "absolute",
                bottom: "5%",
                right: "5%",
                color: grey[600],
              }}
            >
              總數 : {workList.total_count}
            </StyleTitle>
          </StyleTitleBox>

          <StyleListBox>
            <StyleScrollBox className="work-list">
              {workListArray.map((list) => (
                <StyleScrollSmallBox key={list.id}>
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={`${list.name}.png`}
                      alt={`${list.name}.png`}
                    ></img>
                  </Box>

                  <Typography sx={{ flex: 1, textAlign: "center" }}>
                    {list.name}
                  </Typography>
                  <Typography sx={{ flex: 1, textAlign: "center" }}>
                    {list.qty} 個
                  </Typography>
                </StyleScrollSmallBox>
              ))}
            </StyleScrollBox>
          </StyleListBox>

          <StyleButtonBox>
            <Typography
              variant="body1"
              sx={{
                marginLeft: "5%",
                marginTop: "15px",
                color: grey[600],
                fontWeight: 600,
              }}
            >
              創建時間 : {workList.createdAt}
            </Typography>
            {hasAiTrain ? (
              <Box
                sx={{
                  width: "30%",
                  fontSize: "16px",
                  color: "#fff",
                  backgroundColor: indigo[500],
                  marginRight: "5%",
                  padding: "8px 12px",
                  textAlign: "center",
                }}
              >
                已訓練
              </Box>
            ) : (
              <StyleButton
                variant="outlined"
                className="start-aiTraining-box"
                sx={{ display: isTraining ? "none" : "block" }}
                onClick={() => workListButtonHandler(workList.id)}
              >
                執行AI演算
              </StyleButton>
            )}
          </StyleButtonBox>
        </StyleBox>
      </CustomTabPanel>

      {/* 歷史紀錄 */}
      <CustomTabPanel value={value} index={1}>
        <StyleBox>
          <StyleTitleBox sx={{ justifyContent: "center" }}>
            <StyleScrollHistoryTitleBox>
              <StyleScrollHistoryTitleSmallBox>
                名稱
              </StyleScrollHistoryTitleSmallBox>
              <StyleScrollHistoryTitleSmallBox>
                數量
              </StyleScrollHistoryTitleSmallBox>
              <StyleScrollHistoryTitleSmallBox>
                AI演算
              </StyleScrollHistoryTitleSmallBox>
              <StyleScrollHistoryTitleSmallBox>
                創建時間
              </StyleScrollHistoryTitleSmallBox>
            </StyleScrollHistoryTitleBox>
          </StyleTitleBox>

          <StyleListBox>
            <StyleScrollBox className="work-list">
              {allWorkList.map((list) => (
                <StyleScrollHistorySmallBox
                  key={list.id}
                  sx={{
                    backgroundColor:
                      currentWorkListId === list.id
                        ? brown[300]
                        : "transparent",
                  }}
                  onClick={() => selectWorkListHandler(list.id)}
                >
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {list.name}
                  </Box>
                  <Typography sx={{ flex: 1, textAlign: "center" }}>
                    {list.total_count} 個
                  </Typography>
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "60%",
                        padding: "5px",
                        textAlign: "center",
                        borderRadius: "20px",
                        color: "#fff",
                        backgroundColor: list.hasAiTrained
                          ? indigo[500]
                          : teal[400],
                      }}
                    >
                      {list.hasAiTrained ? "已演算" : "尚未演算"}
                    </Typography>
                  </Box>

                  <Typography sx={{ flex: 1, textAlign: "center" }}>
                    {list.createdAt}
                  </Typography>
                </StyleScrollHistorySmallBox>
              ))}
            </StyleScrollBox>
          </StyleListBox>

          <StyleButtonBox></StyleButtonBox>
        </StyleBox>
      </CustomTabPanel>
    </Box>
  );
}

export default WorkListTab;
