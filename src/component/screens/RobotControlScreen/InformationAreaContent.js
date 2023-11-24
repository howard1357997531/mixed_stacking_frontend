import React, { useEffect, useRef, useState } from "react";
import {
  InformationAreaContentBox,
  MultipleOrderListBox,
  MultipleOrderListDetailBox,
  MultipleOrderListDetailInfo,
  MultipleOrderListDetailName,
  MultipleOrderListDetailOrder,
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

  const { data: multipleOrderSelectData } = useSelector(
    (state) => state.robotControlScreen_multipleOrderSelect
  );

  const { executeOrderId: executeOrderIdArray, queue } = useSelector(
    (state) => state.robotControlScreen_robotExecutionList
  );
  console.log("asd:", executeOrderIdArray);
  console.log("asd:", queue - 1);

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
      } else {
        return "err";
      }
    });
    detectState.splice(realtimeVisualCount - 1, compare.length, ...compare);
  }

  // 因相機必須再過sensor時才會照相，所以detect_count + 1時不一定會有物體剛好在sensor感應區
  // 所以需要在每次detect_count+1時把 compare 第一個移除，這樣比對時才不會比對到舊的值
  // useEffect(() => {
  //   console.log("qweqwe");
  //   if (realtimeVisualCount > 1) {
  //     console.log("useEffect");
  //     console.log("inner compare:", compare);
  //     compare.splice(0, 1);
  //     detectState.splice(realtimeVisualCount - 1, compare.length, ...compare);
  //   }
  // }, [realtimeVisualCount]);
  // console.log("compare:", compare);
  // console.log("detectState:", detectState);

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
    } else {
      return <WarningIcon sx={{ color: Colors.red800, fontSize: "26px" }} />;
    }
  };

  // const pictureIndex =
  //   informationAreaMode === "multipleOrder"
  //     ? queue
  //     : executeOrderIdArray.length === 1
  //     ? queue
  //     : queue + 1;

  const [
    multipleOrderInfoDetailDialogOpen,
    setMultipleOrderInfoDetailDialogOpen,
  ] = useState(false);

  const onMultipleOrderInfoDetailDialogOpen = (state) => {
    setMultipleOrderInfoDetailDialogOpen(state);
  };

  const multipleOrderDetailHandler = (multipleOrderId) => {
    dispatch({
      type: ROBOT_CONTROL_SCREEN.informationArea,
      payload: { multipleOrderId },
    });
    setMultipleOrderInfoDetailDialogOpen(true);
  };

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
          {multipleOrderSelectData.multipleOrder.map((order, index) => (
            <MultipleOrderListDetailBox key={order.order.id}>
              <MultipleOrderListDetailOrder>
                <Avatar
                  sx={{
                    backgroundColor: blueGrey[300],
                    width: "33px",
                    height: "33px",
                    // backgroundColor: Colors.greyTextBlood,
                  }}
                >
                  {index + 1}
                </Avatar>
              </MultipleOrderListDetailOrder>

              <MultipleOrderListDetailName>
                {order.order.name}
              </MultipleOrderListDetailName>

              <MultipleOrderListDetailInfo>
                <Tooltip title="詳細資料" placement="left" arrow>
                  <IconButton
                    onClick={() => multipleOrderDetailHandler(order.order.id)}
                  >
                    <HelpRoundedIcon />
                  </IconButton>
                </Tooltip>
              </MultipleOrderListDetailInfo>
            </MultipleOrderListDetailBox>
          ))}
        </MultipleOrderListBox>
      ) : null}

      <MultipleOrderInfoDetailDialog
        multipleOrderInfoDetailDialogOpen={multipleOrderInfoDetailDialogOpen}
        onMultipleOrderInfoDetailDialogOpen={
          onMultipleOrderInfoDetailDialogOpen
        }
      />

      {realtimeVisualMode && informationAreaMode === "picture" && (
        <img
          src={`${domain}/static/media/Figures_step2_${
            executeOrderIdArray[queue - 1]
          }/box_${realtimeItemCount}_bin_1.png`}
          alt={`${domain}/static/media/Figures_step2_${
            executeOrderIdArray[queue - 1]
          }/box_${realtimeItemCount}_bin_1.png`}
          className="item-realtime-photo"
        ></img>
      )}
    </InformationAreaContentBox>
  );
}

export default InformationAreaContent;
