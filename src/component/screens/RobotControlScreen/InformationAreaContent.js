import React, { useEffect, useRef, useState } from "react";
import {
  InformationAreaContentBox,
  MultipleOrderListBox,
  MultipleOrderListDetailBox,
  MultipleOrderListDetailInfo,
  MultipleOrderListDetailName,
  MultipleOrderListDetailOrder,
  MultipleOrderListIconButton,
  NoSelectOrderText,
  OrderListBox,
  OrderListContent,
  OrderListContentBox,
  OrderListContentSmBox,
  OrderListTitle,
  OrderListTitleText,
  RobotSuccessBox,
  RobotSuccessSubTitle,
  RobotSuccessTitle,
  StyleAvatar,
} from "../../../styles/RobotControlScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Colors } from "../../../styles/theme";
import { domain } from "../../../env";
import MultipleOrderInfoDetailDialog from "./dialog/MultipleOrderInfoDetailDialog";
import { ROBOT_CONTROL_SCREEN } from "../../../redux/constants";
import { blueGrey } from "@mui/material/colors";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import CheckIcon from "@mui/icons-material/Check";
import WarningIcon from "@mui/icons-material/Warning";
import "./css/InformationAreaContent.css";

function InformationAreaContent({
  orderSelectData,
  informationAreaMode,
  robotStateMode,
  realtimeItemMode,
  realtimeItemCount,
  realtimeVisualMode,
  realtimeVisualResult,
  realtimeVisualCount,
}) {
  const dispatch = useDispatch();
  const {
    isDoing,
    executeOrderId: executeOrderIdArray,
    queue,
    name: robotExecutionName,
    allData: robotExecutionAllData,
  } = useSelector((state) => state.robotControlScreen_robotExecutionList);
  // console.log("asd:", executeOrderIdArray);
  // console.log("asd:", queue - 1);

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

  var compare = [];
  if (orderSelectData.length !== 0) {
    var detectState = orderSelectData.aiTraining_order.split(",");
    const detectArea = detectState.slice(
      realtimeVisualCount - 1,
      realtimeVisualResult.length + realtimeVisualCount - 1
    );
    // console.log("realtimeVisualCount:", realtimeVisualCount);
    // console.log("result:", realtimeVisualResult);
    // console.log("detectArea:", detectArea);
    var compare = detectArea.map((detect, index) => {
      if (
        detect.replace("A", "") === realtimeVisualResult[index].replace("#", "")
      ) {
        return detect;
      } else if (realtimeVisualResult[0] === "#0") {
        return "#0";
      } else {
        return "err";
      }
    });
    detectState.splice(realtimeVisualCount - 1, compare.length, ...compare);
  }
  // console.log(detectState);

  const compareResult = (index) => {
    if (index + 1 < realtimeVisualCount) {
      return "";
    }
    if (index + 2 > realtimeVisualCount + realtimeVisualResult.length) {
      return "";
    }

    const orderList = orderSelectData.aiTraining_order.split(",");
    if (detectState[index] === orderList[index]) {
      return (
        <CheckIcon sx={{ color: Colors.darkGreenHover, fontSize: "26px" }} />
      );
    } else if (detectState[index] === "#0") {
      return "";
    } else {
      return <WarningIcon sx={{ color: Colors.red800, fontSize: "26px" }} />;
    }
  };

  // 多單細節Dialog
  const [
    multipleOrderInfoDetailDialogOpen,
    setMultipleOrderInfoDetailDialogOpen,
  ] = useState(false);

  const onMultipleOrderInfoDetailDialogOpen = (state) => {
    setMultipleOrderInfoDetailDialogOpen(state);
  };

  const multipleOrderDetailHandler = (multipleOrderSelectId) => {
    dispatch({
      type: ROBOT_CONTROL_SCREEN.informationArea,
      payload: { multipleOrderSelectId },
    });
    setMultipleOrderInfoDetailDialogOpen(true);
  };

  // mode:"order" 自動scroll到指定位置
  const scrollRef = useRef();
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [realtimeItemCount]);

  return (
    <InformationAreaContentBox hasOrderList={executeOrderIdArray.length !== 0}>
      {informationAreaMode === "initial" ? (
        <NoSelectOrderText>尚未選擇工單</NoSelectOrderText>
      ) : null}

      {!realtimeVisualMode && robotStateMode === "activate" ? (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            // border: `1px solid ${Colors.brown}`,
            backgroundColor: Colors.lightOrange,
            zIndex: 2,
          }}
        >
          <NoSelectOrderText>啟動手臂中</NoSelectOrderText>
        </Box>
      ) : null}

      {informationAreaMode === "success" ? (
        <RobotSuccessBox>
          <RobotSuccessTitle>執行成功</RobotSuccessTitle>

          <RobotSuccessSubTitle>
            {executeOrderIdArray.length === 0
              ? "請重新選擇工單"
              : `執行進度 (${queue}/${executeOrderIdArray.length})`}
          </RobotSuccessSubTitle>
        </RobotSuccessBox>
      ) : null}

      {informationAreaMode === "reset" ? (
        <RobotSuccessBox>
          <RobotSuccessTitle sx={{ color: Colors.softOrange }}>
            重置成功
          </RobotSuccessTitle>

          <RobotSuccessSubTitle>請重新選擇工單</RobotSuccessSubTitle>
        </RobotSuccessBox>
      ) : null}

      {informationAreaMode === "order" ? (
        <OrderListBox>
          <OrderListTitle>
            <OrderListTitleText width="20%">次序</OrderListTitleText>
            <OrderListTitleText sx={{ flexGrow: 1 }}>名稱</OrderListTitleText>
            <OrderListTitleText width="25%">辨識</OrderListTitleText>
            {/* <OrderListTitleText width="40%">尺寸</OrderListTitleText> */}
          </OrderListTitle>

          <OrderListContent className="orderlist">
            {orderSelectData.aiTraining_order.split(",").map((order, index) => (
              <OrderListContentBox
                key={index}
                isDoing={realtimeItemCount === index + 1}
                ref={realtimeItemCount === index + 2 ? scrollRef : null}
              >
                <OrderListContentSmBox width="20%">
                  <Avatar
                    sx={{
                      backgroundColor:
                        realtimeItemCount === index + 1 && Colors.lightYellow,
                      color: realtimeItemCount === index + 1 && Colors.brown,
                    }}
                  >
                    {index + 1}
                  </Avatar>
                </OrderListContentSmBox>

                <OrderListContentSmBox
                  sx={{ flexGrow: 1, paddingRight: "20px" }}
                >
                  <img src={`${order}.png`} alt={`${order}.png`}></img>
                  <Typography sx={{ marginLeft: "5px" }}>{order}</Typography>
                </OrderListContentSmBox>

                {/* <OrderListContentSmBox width="40%">
                  {itemSize[order]}
                </OrderListContentSmBox> */}

                <OrderListContentSmBox width="25%">
                  {realtimeVisualResult.length !== 0
                    ? compareResult(index)
                    : null}
                </OrderListContentSmBox>
              </OrderListContentBox>
            ))}
          </OrderListContent>
        </OrderListBox>
      ) : null}

      {informationAreaMode === "multipleOrder" ? (
        <MultipleOrderListBox>
          {robotExecutionAllData.map((order, index) => (
            <MultipleOrderListDetailBox
              key={order.id}
              isDoing={index === queue && isDoing}
            >
              <MultipleOrderListDetailOrder>
                <StyleAvatar isDoing={index === queue && isDoing}>
                  {index + 1}
                </StyleAvatar>
              </MultipleOrderListDetailOrder>

              <MultipleOrderListDetailName isDoing={index === queue && isDoing}>
                {order.name}
              </MultipleOrderListDetailName>

              <MultipleOrderListDetailInfo>
                <Tooltip title="詳細資料" placement="left" arrow>
                  <MultipleOrderListIconButton
                    className="infoAreaMultiIconButton"
                    onClick={() => multipleOrderDetailHandler(order.id)}
                  >
                    <HelpRoundedIcon
                      className="infoAreaMultiIcon"
                      sx={{ fontSize: "20px" }}
                    />
                  </MultipleOrderListIconButton>
                </Tooltip>
              </MultipleOrderListDetailInfo>
            </MultipleOrderListDetailBox>
          ))}
        </MultipleOrderListBox>
      ) : null}

      {realtimeVisualMode && informationAreaMode === "picture" && (
        <img
          src={`${domain}/static/media/ai_figure/Figures_${
            executeOrderIdArray[queue - 1]
          }/box_${realtimeItemCount}_bin_1.png`}
          alt={`${domain}/static/media/ai_figure/Figures_${
            executeOrderIdArray[queue - 1]
          }/box_${realtimeItemCount}_bin_1.png`}
          className="item-realtime-photo"
        ></img>
      )}

      <MultipleOrderInfoDetailDialog
        multipleOrderInfoDetailDialogOpen={multipleOrderInfoDetailDialogOpen}
        onMultipleOrderInfoDetailDialogOpen={
          onMultipleOrderInfoDetailDialogOpen
        }
      />
    </InformationAreaContentBox>
  );
}

export default InformationAreaContent;
