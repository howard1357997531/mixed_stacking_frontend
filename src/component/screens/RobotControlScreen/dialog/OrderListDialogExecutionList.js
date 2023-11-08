import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import {
  OrderListExeListAdd,
  OrderListExeListBox,
  OrderListExeListCheck,
  OrderListExeListDelete,
  OrderListExeListInProgress,
  OrderListExeListName,
  OrderListExeListNameBox,
  OrderListExeListTitle,
} from "../../../../styles/RobotControlScreen/dialog";
import { Button, IconButton, Typography } from "@mui/material";

import OrderListDialogExecutionListSwiper from "./OrderListDialogExecutionListSwiper";
import TextEffect from "../../../../tool/TextEffect";
import { Colors } from "../../../../styles/theme";

function OrderListDialogExecutionList(props) {
  const {
    executeOrderId: executeOrderIdArray,
    name: executeOrderNameArray,
    queue,
  } = props.robotExecutionData;

  const isSingleOrder = executeOrderIdArray.length === 1;
  return (
    <OrderListExeListBox>
      <OrderListExeListTitle>{`(${queue}/${executeOrderIdArray.length})`}</OrderListExeListTitle>

      <OrderListExeListNameBox>
        {executeOrderNameArray.map((name, index) => (
          <Fragment key={index}>
            <OrderListExeListName>
              <Typography>{name}</Typography>
              {index + 1 < queue ? <OrderListExeListCheck /> : null}
              {index + 1 == queue ? (
                <OrderListExeListInProgress>
                  <TextEffect
                    text={"進行中"}
                    textColor={Colors.greyTextBlood}
                    textCoverColor={Colors.darkGreenHover}
                  />
                </OrderListExeListInProgress>
              ) : null}
              {index + 1 >= queue ? <OrderListExeListDelete /> : null}
            </OrderListExeListName>
            <IconButton sx={{ margin: "2px", padding: "3px" }}>
              <OrderListExeListAdd />
            </IconButton>
          </Fragment>
        ))}
      </OrderListExeListNameBox>
    </OrderListExeListBox>
  );
}

export default OrderListDialogExecutionList;
