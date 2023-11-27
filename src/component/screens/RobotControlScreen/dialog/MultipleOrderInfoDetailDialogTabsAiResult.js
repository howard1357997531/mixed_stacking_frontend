import React from "react";
import { Avatar, Box, styled } from "@mui/material";
import {
  MultipleOrderInfoDialogAiResultBox,
  MultipleOrderInfoDialogAiResultName,
  MultipleOrderInfoDialogAiResultOrder,
} from "../../../../styles/RobotControlScreen";
import { AiResultAvatarBgcolor } from "../../../../tool/func";
function MultipleOrderInfoDetailDialogTabsAiResult({
  multipleOrderSelectId,
  multipleOrderData,
}) {
  const StyleBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    alignContent: "flex-start",
    width: "100%",
    height: "500px",
    overflowY: "auto",
  }));

  return multipleOrderSelectId ? (
    <StyleBox className="multipleOrderInfoDetail">
      {multipleOrderData.aiTraining_order.split(",").map((order, index) => (
        <MultipleOrderInfoDialogAiResultBox key={index}>
          <MultipleOrderInfoDialogAiResultOrder>
            <Avatar sx={{ backgroundColor: AiResultAvatarBgcolor(index + 1) }}>
              {index + 1}
            </Avatar>
          </MultipleOrderInfoDialogAiResultOrder>
          <MultipleOrderInfoDialogAiResultName>
            {order}
          </MultipleOrderInfoDialogAiResultName>
        </MultipleOrderInfoDialogAiResultBox>
      ))}
    </StyleBox>
  ) : null;
}

export default MultipleOrderInfoDetailDialogTabsAiResult;
