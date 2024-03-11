import React, { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IconButtonAdd,
  IndexText,
  InsertBox,
  InsertNowText,
  InsertText,
  OrderListExeListAdd,
  OrderListExeListBottomBox,
  OrderListExeListBox,
  OrderListExeListCheck,
  OrderListExeListDelete,
  OrderListExeListInProgress,
  OrderListExeListName,
  OrderListExeListNameBox,
  OrderListExeListReset,
  OrderListExeListTitleBox,
  OrderText,
  RetrieveText,
  StopAllText,
  StyleReportIcon,
  WaitToExecuteText,
} from "../../../../styles/RobotControlScreen/dialog";
import { Tooltip, Typography } from "@mui/material";
import TextEffect from "../../../../tool/TextEffect";
import { Colors } from "../../../../styles/theme";
import "./css/OrderListDialogExecutionList.css";
import OrderListDialogExecutionListInsert from "./OrderListDialogExecutionListInsert";
import {
  deleteExecutionListAction,
  executeRobotFinishAction,
  insertOrderAction,
  robotSettingAction,
} from "../../../../redux/actions/RobotControlScreenAction";
import OrderListDialogExecutionListInsertDetail from "./OrderListDialogExecutionListInsertDetail";
import { confirmSwal, confirmSwal2 } from "../../../../swal";
import { ROBOT_CONTROL_SCREEN } from "../../../../redux/constants";

function OrderListDialogExecutionList(props) {
  const dispatch = useDispatch();
  const robotExecutionData = props.robotExecutionData;
  const robotStateMode = props.robotStateMode;
  const { mode: informationAreaMode } = useSelector(
    (state) => state.robotControlScreen_informationArea
  );

  const {
    isOpenBool,
    executeOrderId: executeOrderIdArray,
    name: executeOrderNameArray,
    queue,
    insertOrderOpen,
    insertOrderDetailOpen,
    resetIndex,
  } = props.robotExecutionData;

  // const executionListQueue =
  //   robotStateMode === "activate" && queue === 1
  //     ? queue - 1
  //     : robotStateMode === "activate" && informationAreaMode === "autoRetrieve"
  //     ? queue
  //     : [
  //         "success",
  //         "reset",
  //         "autoSuccess",
  //         "autoRetrieve",
  //         "autoRetrieveSuccess",
  //       ].includes(robotStateMode)
  //     ? queue
  //     : queue - 1;

  const executionListQueue =
    // 在 autoRetrieve 的 activate 下會 == queue
    robotStateMode === "activate" && informationAreaMode === "autoRetrieve"
      ? queue
      : [
          "success",
          "reset",
          "autoSuccess",
          "autoRetrieve",
          "autoRetrieveSuccess",
        ].includes(robotStateMode)
      ? queue
      : queue - 1;

  const insertOrderHandler = (insertIndex) => {
    dispatch(insertOrderAction(insertIndex));
  };

  const deleteOrderHandler = (index, name) => {
    const replaceName = replaceInsertName(name);
    dispatch(
      deleteExecutionListAction(index, replaceName, props.robotExecutionData)
    );
  };

  const stopAllBtnHandler = () => {
    confirmSwal("警告", "要全部中斷 ?").then((result) => {
      if (result.isConfirmed) {
        confirmSwal2("二次警告", "確定要全部中斷 ?").then((result) => {
          if (result.isConfirmed) {
            dispatch(robotSettingAction("reset", 20, true));
          }
        });
      }
    });
  };

  const replaceInsertName = (name) => {
    return name.endsWith("_insert") ? name.replace("_insert", "") : name;
  };

  const state1 = [
    "success",
    "reset",
    "autoSuccess",
    "autoRetrieve",
    "autoRetrieveSuccess",
  ];

  // 如果執行太多，可能會滑到其他地方，所以在每次開啟、插完單都會
  // 自動 scroll 到目前執行的工單位置
  const insertRef = useRef();
  useEffect(() => {
    if (insertRef.current) {
      insertRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isOpenBool, queue, insertOrderOpen]);

  return (
    <>
      {insertOrderOpen ? (
        <OrderListDialogExecutionListInsert {...props} />
      ) : null}

      {insertOrderDetailOpen ? (
        <OrderListDialogExecutionListInsertDetail {...props} />
      ) : null}

      {!insertOrderOpen && !insertOrderDetailOpen ? (
        <OrderListExeListBox>
          <OrderListExeListTitleBox>
            執行進度 {`(${queue}/${executeOrderIdArray.length})`}
          </OrderListExeListTitleBox>

          <OrderListExeListNameBox className="dialogExecutionList">
            {executeOrderNameArray.map((name, index) => (
              <Fragment key={index}>
                <OrderListExeListName
                  data={[
                    resetIndex.includes(index),
                    index < executionListQueue,
                    index === 0,
                  ]}
                  ref={queue - 2 === index ? insertRef : null}
                >
                  {/* 排序 */}
                  <IndexText
                    data={[
                      resetIndex.includes(index),
                      index < executionListQueue,
                    ]}
                  >
                    {index + 1}
                  </IndexText>

                  {/* 插單 */}
                  {name.endsWith("_insert") ? (
                    <InsertText
                      data={[
                        resetIndex.includes(index),
                        index < executionListQueue,
                      ]}
                    >
                      插單
                    </InsertText>
                  ) : null}

                  {/* 名稱 */}
                  <OrderText
                    data={[
                      resetIndex.includes(index),
                      index < executionListQueue,
                    ]}
                  >
                    {replaceInsertName(name)}
                  </OrderText>

                  {/* 成功 icon */}
                  {!resetIndex.includes(index) && index < executionListQueue ? (
                    <OrderListExeListCheck />
                  ) : null}

                  {/* 收回中 */}
                  {index === executionListQueue - 1 &&
                  ["activate", "autoRetrieve"].includes(props.robotStateMode) &&
                  informationAreaMode === "autoRetrieve" ? (
                    <RetrieveText>收回中</RetrieveText>
                  ) : null}

                  {/* 中斷 */}
                  {resetIndex.includes(index) ? (
                    <OrderListExeListReset>中斷</OrderListExeListReset>
                  ) : null}

                  {/* 待執行 */}
                  {index === executionListQueue ? (
                    state1.includes(props.robotStateMode) ? (
                      <WaitToExecuteText>待執行</WaitToExecuteText>
                    ) : null
                  ) : null}

                  {/* 待執行，在 autoRetrieve activate 也會顯示 */}
                  {index === executionListQueue &&
                  props.robotStateMode === "activate" &&
                  informationAreaMode === "autoRetrieve" ? (
                    <WaitToExecuteText>待執行</WaitToExecuteText>
                  ) : null}

                  {/* 進行中 */}
                  {index === executionListQueue ? (
                    <OrderListExeListInProgress>
                      {props.robotStateMode === "pause" ? (
                        <Typography color={Colors.red800} fontWeight={600}>
                          暫停
                        </Typography>
                      ) : null}

                      {![
                        "inactivate",
                        "success",
                        "reset",
                        "pause",
                        "autoSuccess",
                        "autoRetrieve",
                        "autoRetrieveSuccess",
                      ].includes(props.robotStateMode) &&
                      informationAreaMode !== "autoRetrieve" ? (
                        <TextEffect
                          text={"進行中"}
                          textColor={Colors.blue500}
                        />
                      ) : null}
                    </OrderListExeListInProgress>
                  ) : null}

                  {/* 刪除 */}
                  {index > executionListQueue ? (
                    <OrderListExeListDelete
                      onClick={() => deleteOrderHandler(index, name)}
                    />
                  ) : null}

                  {/* 刪除(待執行工單的) */}
                  {index === executionListQueue &&
                  state1.includes(props.robotStateMode) ? (
                    <OrderListExeListDelete
                      onClick={() => deleteOrderHandler(index, name)}
                    />
                  ) : null}

                  {/* 刪除，在 autoRetrieve activate 也會顯示 */}
                  {index === executionListQueue &&
                  props.robotStateMode === "activate" &&
                  informationAreaMode === "autoRetrieve" ? (
                    <OrderListExeListDelete
                      onClick={() => deleteOrderHandler(index, name)}
                    />
                  ) : null}
                </OrderListExeListName>

                {/* 即刻插單，可以在待執行單前面插單 */}
                {index + 1 === executionListQueue &&
                state1.includes(props.robotStateMode) ? (
                  <InsertBox>
                    <InsertNowText
                      onClick={() => insertOrderHandler(index + 1)}
                    >
                      即刻插單
                    </InsertNowText>
                  </InsertBox>
                ) : null}

                {/* 即刻插單，在 autoRetrieve activate 也會顯示 */}
                {index + 1 === executionListQueue &&
                ["activate"].includes(props.robotStateMode) &&
                informationAreaMode === "autoRetrieve" ? (
                  <InsertBox>
                    <InsertNowText
                      onClick={() => insertOrderHandler(index + 1)}
                    >
                      即刻插單
                    </InsertNowText>
                  </InsertBox>
                ) : null}

                {/* 插單 */}
                {index >= executionListQueue ? (
                  <InsertBox>
                    <Tooltip title="插單" placement="right" arrow>
                      <IconButtonAdd
                        className="iconBtn-add"
                        onClick={() => insertOrderHandler(index + 1)}
                      >
                        <OrderListExeListAdd className="icon-add" />
                      </IconButtonAdd>
                    </Tooltip>
                  </InsertBox>
                ) : null}
              </Fragment>
            ))}
          </OrderListExeListNameBox>

          <OrderListExeListBottomBox
            className="stop-all-box"
            onClick={stopAllBtnHandler}
          >
            <StyleReportIcon className="stop-all-btn" />
            <StopAllText>全部中斷</StopAllText>
            <StyleReportIcon className="stop-all-btn" />
          </OrderListExeListBottomBox>
        </OrderListExeListBox>
      ) : null}
    </>
  );
}

export default OrderListDialogExecutionList;
