import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import {
  IconButtonAdd,
  IconButtonHelp,
  IndexText,
  InsertNowText,
  InsertText,
  OrderListExeListAdd,
  OrderListExeListBox,
  OrderListExeListCheck,
  OrderListExeListDelete,
  OrderListExeListInProgress,
  OrderListExeListName,
  OrderListExeListNameBox,
  OrderListExeListTitleBox,
  OrderText,
  StyleHelpRoundedIcon,
  WaitToExecuteText,
} from "../../../../styles/RobotControlScreen/dialog";
import { Box, Tooltip, Typography } from "@mui/material";
import TextEffect from "../../../../tool/TextEffect";
import { Colors } from "../../../../styles/theme";
import "./css/OrderListDialogExecutionList.css";
import OrderListDialogExecutionListInsert from "./OrderListDialogExecutionListInsert";
import {
  deleteExecutionListAction,
  insertOrderAction,
} from "../../../../redux/actions/RobotControlScreenAction";
import OrderListDialogExecutionListInsertDetail from "./OrderListDialogExecutionListInsertDetail";

function OrderListDialogExecutionList(props) {
  const dispatch = useDispatch();
  const {
    executeOrderId: executeOrderIdArray,
    name: executeOrderNameArray,
    queue,
    insertOrderOpen,
    insertOrderDetailOpen,
  } = props.robotExecutionData;

  const insertOrderHandler = (insertIndex) => {
    dispatch(insertOrderAction(insertIndex));
  };

  const deleteOrderHandler = (index, name) => {
    const replaceName = replaceInsertName(name);
    dispatch(
      deleteExecutionListAction(index, replaceName, props.robotExecutionData)
    );
  };

  const replaceInsertName = (name) => {
    return name.endsWith("_insert") ? name.replace("_insert", "") : name;
  };

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
            執行清單 {`(${queue}/${executeOrderIdArray.length})`}
          </OrderListExeListTitleBox>

          <OrderListExeListNameBox className="dialogExecutionList">
            {executeOrderNameArray.map((name, index) => (
              <Fragment key={index}>
                <OrderListExeListName
                  sx={{
                    backgroundColor:
                      index + 1 < queue ? Colors.softGreen : "transparent",
                    borderTop:
                      index === 0 ? "none" : `1px solid ${Colors.brownHover}`,
                  }}
                >
                  <IndexText finish={index + 1 < queue}>{index + 1}</IndexText>

                  {name.endsWith("_insert") ? (
                    <InsertText>插單</InsertText>
                  ) : null}

                  <OrderText finish={index + 1 < queue}>
                    {replaceInsertName(name)}
                  </OrderText>

                  {index + 1 < queue ? <OrderListExeListCheck /> : null}

                  {index + 1 == queue ? (
                    <OrderListExeListInProgress>
                      {props.robotStateMode === "inactivate" ? (
                        <WaitToExecuteText>待執行</WaitToExecuteText>
                      ) : null}

                      {props.robotStateMode === "pause" ? (
                        <Typography color={Colors.red800} fontWeight={600}>
                          暫停
                        </Typography>
                      ) : null}

                      {!["inactivate", "pause"].includes(
                        props.robotStateMode
                      ) ? (
                        <TextEffect
                          text={"進行中"}
                          textColor={Colors.greyTextBlood}
                          textCoverColor={Colors.purple400}
                        />
                      ) : null}
                    </OrderListExeListInProgress>
                  ) : null}

                  {index + 1 > queue ? (
                    <OrderListExeListDelete
                      onClick={() => deleteOrderHandler(index, name)}
                    />
                  ) : null}
                </OrderListExeListName>

                {/* 可以在待執行單前面插單 */}
                {index + 2 == queue && props.robotStateMode === "inactivate" ? (
                  <Box sx={{ borderTop: `1px solid ${Colors.brownHover}` }}>
                    <InsertNowText
                      onClick={() => insertOrderHandler(index + 1)}
                    >
                      即刻插單
                    </InsertNowText>
                    {/* <IconButtonAdd
                      className="iconBtn-add"
                      
                    >
                      <OrderListExeListAdd className="icon-add" />
                    </IconButtonAdd> */}
                  </Box>
                ) : null}

                {index + 1 >= queue ? (
                  <Box sx={{ borderTop: `1px solid ${Colors.brownHover}` }}>
                    <Tooltip title="插單" placement="right" arrow>
                      <IconButtonAdd
                        className="iconBtn-add"
                        onClick={() => insertOrderHandler(index + 1)}
                      >
                        <OrderListExeListAdd className="icon-add" />
                      </IconButtonAdd>
                    </Tooltip>
                  </Box>
                ) : null}
              </Fragment>
            ))}
          </OrderListExeListNameBox>
        </OrderListExeListBox>
      ) : null}
    </>
  );
}

export default OrderListDialogExecutionList;
