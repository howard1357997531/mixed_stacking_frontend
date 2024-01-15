import React, { useEffect, useRef, useState } from "react";
import {
  AvatarDivider,
  InformationAreaContentBox,
  MultiOrderAvatar,
  MultiOrderAvatarBox,
  MultiOrderDetailBox,
  MultiOrderDetailSmBox,
  MultiOrderName,
  MultipleOrderInfo,
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
} from "../../../styles/RobotControlScreen";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import { Colors } from "../../../styles/theme";
import { domain } from "../../../env";
import { DIALOG } from "../../../redux/constants";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import CheckIcon from "@mui/icons-material/Check";
import WarningIcon from "@mui/icons-material/Warning";
import "./css/InformationAreaContent.css";
import OrderDetailDialog from "../../dialog/orderDetail/OrderDetailDialog";

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

  const { data: multipleOrderSelectData } = useSelector(
    (state) => state.robotControlScreen_multipleOrderSelect
  );

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
  const [openDialog, setOpenDialog] = useState(false);
  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const multipleOrderDetailHandler = (orderId) => {
    dispatch({ type: DIALOG.order, payload: { orderId } });
    setOpenDialog(true);
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
  const hasOrderList = executeOrderIdArray.length !== 0;
  const mode = !["inactivate", "reset"].includes(robotStateMode);

  // multipleOrder
  if (multipleOrderSelectData.length !== 0) {
    var multipleOrderArray =
      multipleOrderSelectData.orderSelectId_str.split(",");

    const countArray = multipleOrderArray.map((order) =>
      order.includes("*") ? parseInt(order.split("*").at(1)) : 1
    );

    const indexArray = countArray.map((count, index) =>
      countArray.slice(0, index + 1).reduce((acc, cur) => acc + cur)
    );

    var parseIndex = (index) => (index === 0 ? 1 : indexArray[index - 1] + 1);
    var parseIndex2 = (index) => indexArray[index];
  }
  const parseId = (order) => {
    return parseInt(order.split("*").at(0));
  };

  const parseTimes = (times) => {
    return times.includes("*") ? parseInt(times.split("*").at(1)) : 1;
  };

  const parseName = (id) => {
    let [filterData] = multipleOrderSelectData.multipleOrder.filter(
      (order) => order.order.id === id
    );
    return filterData.order;
  };

  return (
    <InformationAreaContentBox data={[hasOrderList, mode]}>
      {informationAreaMode === "initial" ? (
        <NoSelectOrderText>尚未選擇工單</NoSelectOrderText>
      ) : null}

      {!realtimeVisualMode && robotStateMode === "activate" ? (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
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
            {/* <OrderListTitleText width="25%">辨識</OrderListTitleText> */}
            <OrderListTitleText width="40%">尺寸</OrderListTitleText>
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
                      width: "35px",
                      height: "35px",
                      fontSize: "16px",
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

                <OrderListContentSmBox width="40%">
                  {itemSize[order]}
                </OrderListContentSmBox>

                {/* <OrderListContentSmBox width="25%">
                  {realtimeVisualResult.length !== 0
                    ? compareResult(index)
                    : null}
                </OrderListContentSmBox> */}
              </OrderListContentBox>
            ))}
          </OrderListContent>
        </OrderListBox>
      ) : null}

      {informationAreaMode === "multipleOrder" ? (
        <MultiOrderDetailBox className="orderlist">
          {multipleOrderArray.map((order, index) => (
            <MultiOrderDetailSmBox
              key={order.id}
              isDoing={index === queue && isDoing}
            >
              <MultiOrderAvatarBox>
                <MultiOrderAvatar>{parseIndex(index)}</MultiOrderAvatar>
                {order.includes("*") ? (
                  <>
                    <AvatarDivider />
                    <MultiOrderAvatar>{parseIndex2(index)}</MultiOrderAvatar>
                  </>
                ) : null}
              </MultiOrderAvatarBox>

              <MultiOrderName>{parseName(parseId(order)).name}</MultiOrderName>

              <MultipleOrderInfo>
                <Tooltip title="詳細資料" placement="left" arrow>
                  <MultipleOrderListIconButton
                    className="infoAreaMultiIconButton"
                    onClick={() => multipleOrderDetailHandler(parseId(order))}
                  >
                    <HelpRoundedIcon
                      className="infoAreaMultiIcon"
                      sx={{ fontSize: "20px" }}
                    />
                  </MultipleOrderListIconButton>
                </Tooltip>
              </MultipleOrderInfo>
            </MultiOrderDetailSmBox>
          ))}
        </MultiOrderDetailBox>
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

      <OrderDetailDialog
        openDialog={openDialog}
        onCloseDialog={onCloseDialog}
        source={"multiOrder"}
      />
    </InformationAreaContentBox>
  );
}

export default InformationAreaContent;
