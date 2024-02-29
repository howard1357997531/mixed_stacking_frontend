import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  AvatarDivider,
  InformationAreaContentBox,
  MultiOrderAvatar,
  MultiOrderAvatarBox,
  MultiOrderDetailBox,
  MultiOrderDetailSmBox,
  MultiOrderInsertBox,
  MultiOrderName,
  MultipleOrderInfo,
  NoSelectOrderText,
  OrderListBox,
  OrderListContent,
  OrderListContentAvatar,
  OrderListContentBox,
  OrderListContentName,
  OrderListContentSmBox,
  OrderListTitle,
  OrderListTitleSmText,
  OrderListTitleText,
  RobotSuccessBox,
  RobotSuccessSubTitle,
  RobotSuccessTitle,
} from "../../../styles/RobotControlScreen";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton } from "@mui/material";
import { Colors } from "../../../styles/theme";
import { domain } from "../../../env";
import { DIALOG } from "../../../redux/constants";
import CheckIcon from "@mui/icons-material/Check";
import WarningIcon from "@mui/icons-material/Warning";
import "./css/InformationAreaContent.css";
import OrderDetailDialog from "../../dialog/orderDetail/OrderDetailDialog";
import InfoIcon from "@mui/icons-material/Info";
import {
  parseExecuteIndex,
  parseExecuteName,
  parseExecutionData,
} from "../../../tool/func";

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
    executeOrderStr,
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
    "16A": "70 * 52 * 32",
    "18A": "70 * 52 * 36",
    33: "88 * 42 * 36",
    "7A": "70 * 52 * 40",
    13: "112 * 50 * 28",
    22: "90 * 52 * 36",
    20: "106 * 68 * 26",
    29: "130 * 50 * 36",
    9: "86 * 64 * 46",
    26: "144 * 50 * 40",
    35: "204 * 92 * 36",
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
  const [stateDialog, setStateDialog] = useState(null);
  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const multipleOrderDetailHandler = (orderId, state) => {
    dispatch({ type: DIALOG.order, payload: { orderId } });
    setStateDialog(state);
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
  const mode = !["inactivate", "success", "reset"].includes(robotStateMode);

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

    var parseDoingQueue = (qu) => {
      var output = null;
      for (let i = 0; i < indexArray.length; i++) {
        if (indexArray[i] >= qu) {
          output = i;
          break;
        }
      }
      return output;
    };

    var parseIndex = (index) => (index === 0 ? 1 : indexArray[index - 1] + 1);
    var parseIndex2 = (index) => indexArray[index];
  }
  const parseId = (order) => {
    return parseInt(order.split("*").at(0));
  };

  const parseName = (id) => {
    let [filterData] = multipleOrderSelectData.multipleOrder.filter(
      (order) => order.order.id === id
    );
    return filterData.order;
  };

  // executeList
  if (isDoing) {
    var [executeId, insertIndex] = parseExecutionData(executeOrderStr);
    var executeData = [];
    let name = parseExecuteName(executeId, robotExecutionAllData);
    for (let i = 0; i < name.length; i++) {
      let tempObj = {};
      tempObj["id"] = parseInt(executeId.at(i).split("*").at(0));
      tempObj["name"] = name.at(i);
      tempObj["index"] = parseExecuteIndex(executeId).at(i);
      tempObj["isInsert"] = insertIndex.includes(i);
      executeData.push(tempObj);
    }
    var executeQueue = ["success", "reset"].includes(robotStateMode)
      ? queue + 1
      : queue;
  }

  return (
    <InformationAreaContentBox data={[hasOrderList, mode]}>
      {informationAreaMode === "initial" ? (
        <NoSelectOrderText></NoSelectOrderText>
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

      {["success", "reset"].includes(informationAreaMode) ? (
        <RobotSuccessBox>
          <RobotSuccessTitle
            sx={{ color: informationAreaMode === "reset" && Colors.softOrange }}
          >
            {informationAreaMode === "success" ? "執行成功" : "中斷成功"}
          </RobotSuccessTitle>

          <RobotSuccessSubTitle>
            {executeOrderIdArray.length === 0
              ? "請重新選擇工單"
              : `執行進度 (${queue}/${executeOrderIdArray.length})`}
          </RobotSuccessSubTitle>
        </RobotSuccessBox>
      ) : null}

      {informationAreaMode === "order" ? (
        <OrderListBox>
          <OrderListTitle>
            <OrderListTitleText width="20%">次序</OrderListTitleText>
            <OrderListTitleText sx={{ flexGrow: 1 }}>名稱</OrderListTitleText>
            {/* <OrderListTitleText width="25%">辨識</OrderListTitleText> */}
            <OrderListTitleText width="32%">
              尺寸
              <OrderListTitleSmText>(長寬高)</OrderListTitleSmText>
            </OrderListTitleText>
          </OrderListTitle>

          <OrderListContent className="orderlist">
            {orderSelectData.aiTraining_order.split(",").map((order, index) => (
              <OrderListContentBox
                key={index}
                isDoing={realtimeItemCount === index + 1}
                ref={realtimeItemCount === index + 2 ? scrollRef : null}
              >
                <OrderListContentSmBox width="20%">
                  <OrderListContentAvatar
                    count={realtimeItemCount === index + 1}
                  >
                    {index + 1}
                  </OrderListContentAvatar>
                </OrderListContentSmBox>

                <OrderListContentSmBox
                  sx={{
                    flexGrow: 1,
                    paddingRight: "20px",
                    color:
                      realtimeItemCount === index + 1 && Colors.lightOrange,
                  }}
                >
                  <img src={`${order}.png`} alt={`${order}.png`}></img>
                  <OrderListContentName>{order}</OrderListContentName>
                </OrderListContentSmBox>

                <OrderListContentSmBox
                  width="32%"
                  sx={{
                    color:
                      realtimeItemCount === index + 1 && Colors.lightOrange,
                  }}
                >
                  {itemSize[order]}
                </OrderListContentSmBox>
              </OrderListContentBox>
            ))}
          </OrderListContent>
        </OrderListBox>
      ) : null}

      {informationAreaMode === "multipleOrder" ? (
        <>
          <OrderListTitle>
            <OrderListTitleText width="20%">次序</OrderListTitleText>
            <OrderListTitleText sx={{ flexGrow: 1 }}>名稱</OrderListTitleText>
            <OrderListTitleText width="20%">資訊</OrderListTitleText>
          </OrderListTitle>

          <MultiOrderDetailBox className="orderlist">
            {multipleOrderArray.map((order, index) => (
              <MultiOrderDetailSmBox
                key={index}
                isDoing={parseDoingQueue(queue + 1) === index && isDoing}
              >
                <MultiOrderAvatarBox>
                  <MultiOrderAvatar
                    isDoing={parseDoingQueue(queue + 1) === index && isDoing}
                  >
                    {parseIndex(index)}
                  </MultiOrderAvatar>
                  {order.includes("*") ? (
                    <>
                      <AvatarDivider
                        isDoing={
                          parseDoingQueue(queue + 1) === index && isDoing
                        }
                      />
                      <MultiOrderAvatar
                        isDoing={
                          parseDoingQueue(queue + 1) === index && isDoing
                        }
                      >
                        {parseIndex2(index)}
                      </MultiOrderAvatar>
                    </>
                  ) : null}
                </MultiOrderAvatarBox>

                <MultiOrderName
                  isDoing={parseDoingQueue(queue + 1) === index && isDoing}
                >
                  {parseName(parseId(order)).name}
                </MultiOrderName>

                <MultipleOrderInfo>
                  <IconButton
                    onClick={() =>
                      multipleOrderDetailHandler(parseId(order), "multiOrder")
                    }
                  >
                    <InfoIcon
                      sx={{
                        fontSize: "20px",
                        color:
                          parseDoingQueue(queue + 1) === index && isDoing
                            ? Colors.lightOrange
                            : Colors.darkGreen,
                      }}
                    />
                  </IconButton>
                </MultipleOrderInfo>
              </MultiOrderDetailSmBox>
            ))}
          </MultiOrderDetailBox>
        </>
      ) : null}

      {informationAreaMode === "executeOrder" ? (
        <>
          <OrderListTitle>
            <OrderListTitleText width="20%">次序</OrderListTitleText>
            <OrderListTitleText sx={{ flexGrow: 1 }}>名稱</OrderListTitleText>
            <OrderListTitleText width="20%">資訊</OrderListTitleText>
          </OrderListTitle>

          <MultiOrderDetailBox className="orderlist">
            {executeData.map((eData, index) => (
              <MultiOrderDetailSmBox
                key={index}
                isDoing={eData.index.includes(executeQueue) && isDoing}
              >
                <MultiOrderAvatarBox>
                  <MultiOrderAvatar
                    isDoing={eData.index.includes(executeQueue) && isDoing}
                  >
                    {eData.index.at(0)}
                  </MultiOrderAvatar>
                  {eData.index.length > 1 ? (
                    <Fragment>
                      <AvatarDivider
                        isDoing={eData.index.includes(executeQueue) && isDoing}
                      />
                      <MultiOrderAvatar
                        isDoing={eData.index.includes(executeQueue) && isDoing}
                      >
                        {eData.index.at(1)}
                      </MultiOrderAvatar>
                    </Fragment>
                  ) : null}
                </MultiOrderAvatarBox>

                <MultiOrderName
                  isDoing={eData.index.includes(executeQueue) && isDoing}
                >
                  {eData.isInsert ? (
                    <MultiOrderInsertBox
                      isDoing={eData.index.includes(executeQueue) && isDoing}
                      sx={{ display: index === 0 && "none" }}
                    >
                      插單
                    </MultiOrderInsertBox>
                  ) : null}

                  {eData.name}
                </MultiOrderName>

                <MultipleOrderInfo>
                  <IconButton
                    onClick={() =>
                      multipleOrderDetailHandler(eData.id, "executeOrder")
                    }
                  >
                    <InfoIcon
                      sx={{
                        fontSize: "20px",
                        color:
                          eData.index.includes(executeQueue) && isDoing
                            ? Colors.lightOrange
                            : Colors.darkGreen,
                      }}
                    />
                  </IconButton>
                </MultipleOrderInfo>
              </MultiOrderDetailSmBox>
            ))}
          </MultiOrderDetailBox>
        </>
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
        source={stateDialog}
      />
    </InformationAreaContentBox>
  );
}

export default InformationAreaContent;
