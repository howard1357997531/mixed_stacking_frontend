import React, { Fragment, useState } from "react";
import {
  AiResultAvatar,
  AiResultBox,
  AiResultDataBox,
  AiResultDataSmBox,
  AiResultDataSmmBox,
  AiResultImageBtn,
  AiResultImageBox,
  AiResultIndex,
  AiResultText,
  AiResultImageBackBtn,
} from "../../../styles/OrderScreen";
import { useSelector } from "react-redux";
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
  return (
    <OrderBox>
      {imageOpen ? (
        <AiResultImageBox>
          <img
            src={`${domain}/static/media/ai_figure/Figures_${orderId}/box_${orderCount}_bin_1.png`}
            alt={`${domain}/static/media/ai_figure/Figures_${orderId}/box_${orderCount}_bin_1.png`}
            // className="box-photo"
            style={{ marginTop: "29.5px", width: "90%" }}
          ></img>
          <AiResultImageBackBtn
            variant="contained"
            disableElevation
            onClick={() => setImageOpen(!imageOpen)}
          >
            返回
          </AiResultImageBackBtn>
        </AiResultImageBox>
      ) : (
        <>
          <DescTextBox sx={{ marginBottom: "8px", justifyContent: "left" }}>
            <DescText isTitle={true}>堆疊順序</DescText>
            <AiResultImageBtn onClick={aiImageHandler}>圖片</AiResultImageBtn>
          </DescTextBox>

          <AiResultBox className="aiResult-box">
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
