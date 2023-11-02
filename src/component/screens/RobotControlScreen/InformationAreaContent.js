import React, { useState } from "react";
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
} from "../../../styles/RobotControlScreen";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Typography } from "@mui/material";
import "./css/InformationAreaContent.css";
import { Colors } from "../../../styles/theme";
import { domain } from "../../../env";
import MultipleOrderInfoDetailDialog from "./dialog/MultipleOrderInfoDetailDialog";
import { ROBOT_CONTROL_SCREEN_informationArea } from "../../../redux/constants";
import { blueGrey } from "@mui/material/colors";

function InformationAreaContent() {
  const dispatch = useDispatch();
  const { detail: orderList } = useSelector(
    (state) => state.robotControlScreen_orderSelect
  );

  const { detail: multipleOrderList } = useSelector(
    (state) => state.robotControlScreen_multipleOrderSelect
  );

  const { mode: robotStateMode } = useSelector(
    (state) => state.robotControlScreen_robotState
  );

  const { mode: informationAreaMode } = useSelector(
    (state) => state.robotControlScreen_informationArea
  );

  const { mode: realtimeRobotMode, count } = useSelector(
    (state) => state.robotControlScreen_realtimeRobot
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

  const [
    multipleOrderInfoDetailDialogOpen,
    setMultipleOrderInfoDetailDialogOpen,
  ] = useState(false);

  const onMultipleOrderInfoDetailDialogOpen = (state) => {
    setMultipleOrderInfoDetailDialogOpen(state);
  };

  const multipleOrderDetailHandler = (orderId) => {
    dispatch({
      type: ROBOT_CONTROL_SCREEN_informationArea.multipleOrderId,
      payload: orderId,
    });
    setMultipleOrderInfoDetailDialogOpen(true);
  };
  return (
    <InformationAreaContentBox hasOrderList={orderList.length !== 0}>
      {informationAreaMode === "initial" && (
        <NoSelectOrderText>尚未選擇工單</NoSelectOrderText>
      )}

      {informationAreaMode === "order" && (
        <OrderListBox>
          <OrderListTitle>
            <Typography
              sx={{
                textAlign: "center",
                color: "#fff",
                width: "25%",
              }}
            >
              次序
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                color: "#fff",
                width: "35%",
                marginLeft: "15px",
              }}
            >
              名稱
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                color: "#fff",
                width: "40%",
                marginRight: "10px",
              }}
            >
              尺寸
            </Typography>
          </OrderListTitle>

          <OrderListContent className="orderlist">
            {orderList.aiTraining_order.split(",").map((order, index) => (
              <OrderListContentBox
                key={index}
                sx={{
                  backgroundColor:
                    count === index + 1 ? Colors.brown : "transparent",
                }}
              >
                <OrderListContentSmBox width="25%">
                  <Avatar
                    sx={{
                      backgroundColor:
                        count === index + 1 && Colors.lightYellow,
                      color: count === index + 1 && Colors.brown,
                    }}
                  >
                    {index + 1}
                  </Avatar>
                </OrderListContentSmBox>

                <OrderListContentSmBox width="35%">
                  <img
                    src={`${order}.png`}
                    alt={`${order}.png`}
                    style={{ marginRight: "10px" }}
                  ></img>
                  {order}
                </OrderListContentSmBox>

                <OrderListContentSmBox width="40%">
                  {itemSize[order]}
                </OrderListContentSmBox>
              </OrderListContentBox>
            ))}
          </OrderListContent>
        </OrderListBox>
      )}

      {informationAreaMode === "multipleOrder" ? (
        <MultipleOrderListBox>
          {multipleOrderList.multipleOrder.map((order, index) => (
            <MultipleOrderListDetailBox key={order.order.id}>
              <MultipleOrderListDetailOrder>
                <Avatar sx={{ backgroundColor: blueGrey[300] }}>
                  {index + 1}
                </Avatar>
              </MultipleOrderListDetailOrder>
              <MultipleOrderListDetailName>
                {order.order.name}
              </MultipleOrderListDetailName>
              <MultipleOrderListDetailInfo>
                <Button
                  variant="contained"
                  onClick={() => multipleOrderDetailHandler(order.order.id)}
                >
                  詳細資料
                </Button>
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

      {!realtimeRobotMode && robotStateMode === "activate" && (
        <NoSelectOrderText>啟動手臂中</NoSelectOrderText>
      )}

      {realtimeRobotMode && informationAreaMode === "picture" && (
        <img
          src={`${domain}/static/media/Figures_step2_${orderList.id}/box_${count}_bin_1.png`}
          alt={`${domain}/static/media/Figures_step2_${orderList.id}/box_${count}_bin_1.png`}
          className="item-realtime-photo"
        ></img>
      )}
    </InformationAreaContentBox>
  );
}

export default InformationAreaContent;
