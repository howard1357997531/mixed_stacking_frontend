import React, { Fragment, useState } from "react";
import {
  OrderBox,
  DescTextBox,
  DescText,
  AiResultBox,
  AiResultIndex,
  AiResultDataBox,
  AiResultDataSmBox,
  AiResultDataSmmBox,
  AiResultAvatar,
  AiResultText,
  AiResultImageBtn,
  AiResultImageBox,
  AiResultImageBackBtn,
} from "../../../styles/dialog/OrderDetailDialogTabsAiResult";
import { AiResultAvatarBgcolor } from "../../../tool/func";
import { domain } from "../../../env";
import { useMediaQuery, useTheme } from "@mui/material";
import { Colors } from "../../../styles/theme";

function OrderDetailDialogTabsAiResult({ source, orderId, orderSelectData }) {
  if (source === "order" && orderId) {
    var data = orderSelectData;
  } else if (source === "multiOrder" && orderId) {
    const [orderTemp] = orderSelectData.multipleOrder.filter(
      (order) => order.order.id === orderId
    );
    var data = orderTemp.order;
  } else if (source === "executeOrder") {
    var data = orderSelectData;
  }

  if (data) {
    var orderData = data;
    var aiResultData = orderData.aiTraining_order.split(",");
    var orderCount = aiResultData.length;
    const aiLayerCount = orderData.aiLayer_order;
    var aiLayerCountArray = aiLayerCount.split(",").map((num) => parseInt(num));
    var index = [];
    var allData = [];

    for (let i = 0; i < aiLayerCountArray.length; i++) {
      index.push(
        aiLayerCountArray.slice(0, i + 1).reduce((acc, cur) => acc + cur)
      );
    }

    for (let i = 0; i < index.length; i++) {
      if (i === 0) {
        allData.push(aiResultData.slice(0, index[i]));
      } else {
        allData.push(aiResultData.slice(index[i - 1], index[i]));
      }
    }
  }

  const parseCount = (index, InnerIndex) => {
    if (index === 0) {
      return InnerIndex + 1;
    } else {
      const count = aiLayerCountArray
        .slice(0, index)
        .reduce((acc, cur) => acc + cur);
      return InnerIndex + count + 1;
    }
  };

  const [imageOpen, setImageOpen] = useState(false);
  const aiImageHandler = () => {
    setImageOpen(!imageOpen);
  };

  const page = window.location.pathname === "/order";
  const dialogClassName = page ? "order-dialog" : "multi-order-dialog";
  const theme = useTheme();
  const matches_900 = useMediaQuery(theme.breakpoints.down("md"));
  const matches_600 = useMediaQuery(theme.breakpoints.down("sm"));
  return orderId ? (
    <OrderBox>
      {imageOpen ? (
        <AiResultImageBox>
          <img
            src={`${domain}/static/media/ai_figure/Figures_${orderId}/box_${orderCount}_bin_1.png`}
            alt={`${domain}/static/media/ai_figure/Figures_${orderId}/box_${orderCount}_bin_1.png`}
            style={{
              marginTop: "5px",
              width: matches_600 ? "90%" : matches_900 ? "75%" : "90%",
            }}
          ></img>
          <AiResultImageBackBtn
            page={page}
            variant="contained"
            disableElevation
            onClick={() => setImageOpen(!imageOpen)}
          >
            返回
          </AiResultImageBackBtn>
        </AiResultImageBox>
      ) : (
        <Fragment>
          <DescTextBox>
            <DescText
              isTitle={true}
              sx={{ color: page ? Colors.greenDialog : Colors.orangeDialog }}
            >
              堆疊順序
            </DescText>
            <AiResultImageBtn page={page} onClick={aiImageHandler}>
              圖片
            </AiResultImageBtn>
          </DescTextBox>

          <AiResultBox className={dialogClassName}>
            {allData.map((datas, index) => (
              <Fragment key={index}>
                <AiResultIndex>第 {index + 1} 層</AiResultIndex>
                <AiResultDataBox>
                  {datas.map((data, innerIndex) => (
                    <AiResultDataSmBox key={innerIndex}>
                      <AiResultDataSmmBox page={page}>
                        <AiResultAvatar
                          sx={{
                            backgroundColor: AiResultAvatarBgcolor(index),
                          }}
                        >
                          {parseCount(index, innerIndex)}
                        </AiResultAvatar>
                        <AiResultText>{data}</AiResultText>
                      </AiResultDataSmmBox>
                    </AiResultDataSmBox>
                  ))}
                </AiResultDataBox>
              </Fragment>
            ))}
          </AiResultBox>
        </Fragment>
      )}
    </OrderBox>
  ) : null;
}

export default OrderDetailDialogTabsAiResult;
