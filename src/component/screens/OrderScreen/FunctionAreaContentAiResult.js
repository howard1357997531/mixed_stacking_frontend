import React, { Fragment, useState } from "react";
import {
  AiResultAvatar,
  AiResultBox,
  AiResultDataBox,
  AiResultDataSmBox,
  AiResultDataSmmBox,
  AiResultImage,
  AiResultIndex,
  AiResultText,
} from "../../../styles/OrderScreen";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { AiResultAvatarBgcolor } from "../../../tool/func";
import "./css/FunctionAreaContent.css";
import {
  DescText,
  DescTextBox,
  OrderBox,
} from "../../../styles/OrderScreen/FunctionAreaContentOrder";
import { domain } from "../../../env";

function FunctionAreaContentAiResult() {
  const { data } = useSelector((state) => state.orderList);
  const { orderId } = useSelector((state) => state.orderScreen_orderSelect);

  if (data) {
    var [orderData] = data.filter((order) => order.id === orderId);
    var aiResultData = orderData.aiTraining_order.split(",");
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
  return (
    <OrderBox>
      {imageOpen ? (
        <img
          src={`${domain}/static/media/ai_figure/Figures_${120}/box_${33}_bin_1.png`}
          alt={`${domain}/static/media/ai_figure/Figures_${120}/box_${33}_bin_1.png`}
          className="box-photo"
        ></img>
      ) : (
        <>
          <DescTextBox sx={{ marginBottom: "8px" }}>
            <DescText isTitle={true}>堆疊順序</DescText>
            <AiResultImage onClick={aiImageHandler}>圖片</AiResultImage>
          </DescTextBox>

          <AiResultBox className="function-order-box">
            {allData.map((datas, index) => (
              <Fragment key={index}>
                <AiResultIndex>第 {index + 1} 層</AiResultIndex>
                <AiResultDataBox>
                  {datas.map((data, innerIndex) => (
                    <AiResultDataSmBox key={innerIndex}>
                      <AiResultDataSmmBox>
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
        </>
      )}
    </OrderBox>
  );
}

export default FunctionAreaContentAiResult;
