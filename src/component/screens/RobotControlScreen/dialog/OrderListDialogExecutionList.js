import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import {
  IconButtonAdd,
  OrderListExeListAdd,
  OrderListExeListBox,
  OrderListExeListCheck,
  OrderListExeListDelete,
  OrderListExeListInProgress,
  OrderListExeListName,
  OrderListExeListNameBox,
  OrderListExeListTitleBox,
} from "../../../../styles/RobotControlScreen/dialog";
import { Box, Typography } from "@mui/material";
import TextEffect from "../../../../tool/TextEffect";
import { Colors } from "../../../../styles/theme";
import "./css/OrderListDialogExecutionList.css";
import OrderListDialogExecutionListInsert from "./OrderListDialogExecutionListInsert";
import { insertOrderAction } from "../../../../redux/actions/RobotControlScreenAction";
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

  const insertOrderHandler = (index) => {
    dispatch(insertOrderAction(index));
  };

  return (
    <>
      {insertOrderOpen ? <OrderListDialogExecutionListInsert /> : null}

      {insertOrderDetailOpen ? (
        <OrderListDialogExecutionListInsertDetail {...props} />
      ) : null}

      {!insertOrderOpen && !insertOrderDetailOpen ? (
        <OrderListExeListBox>
          <OrderListExeListTitleBox>{`(${queue}/${executeOrderIdArray.length})`}</OrderListExeListTitleBox>

          <OrderListExeListNameBox className="dialogExecutionList">
            {executeOrderNameArray.map((name, index) => (
              <Fragment key={index}>
                <OrderListExeListName
                  sx={{
                    backgroundColor:
                      index + 1 < queue ? "#61d1c68b" : "transparent",
                    borderTop:
                      index === 0 ? "none" : `1px solid ${Colors.brownHover}`,
                  }}
                >
                  <Typography
                    sx={{
                      color:
                        index + 1 < queue
                          ? Colors.green800
                          : Colors.greyTextBlood,
                    }}
                  >
                    {name}
                  </Typography>
                  {index + 1 < queue ? <OrderListExeListCheck /> : null}
                  {index + 1 == queue ? (
                    <OrderListExeListInProgress>
                      {props.robotStateMode === "inactivate" ? (
                        <Typography color={Colors.purple} fontWeight={600}>
                          待執行
                        </Typography>
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
                          textCoverColor={Colors.darkGreenHover}
                        />
                      ) : null}
                    </OrderListExeListInProgress>
                  ) : null}
                  {index + 1 > queue ? <OrderListExeListDelete /> : null}
                </OrderListExeListName>

                {/* 可以在待執行單前面插單 */}
                {index + 2 == queue && props.robotStateMode === "inactivate" ? (
                  <Box sx={{ borderTop: `1px solid ${Colors.brownHover}` }}>
                    <IconButtonAdd
                      onClick={() => insertOrderHandler(index + 1)}
                    >
                      <OrderListExeListAdd />
                    </IconButtonAdd>
                  </Box>
                ) : null}

                {index + 1 >= queue ? (
                  <Box sx={{ borderTop: `1px solid ${Colors.brownHover}` }}>
                    <IconButtonAdd
                      onClick={() => insertOrderHandler(index + 1)}
                    >
                      <OrderListExeListAdd />
                    </IconButtonAdd>
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
