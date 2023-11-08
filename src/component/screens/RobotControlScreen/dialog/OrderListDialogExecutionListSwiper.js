import React, { useEffect, useState } from "react";
import {
  SwiperBox,
  SwiperIndexBox,
  SwiperNameBox,
  SwiperNextBtn,
  SwiperPrevBtn,
  SwiperTopBox,
} from "../../../../styles/RobotControlScreen/dialog";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch } from "react-redux";
import { swiperChangeAction } from "../../../../redux/actions/RobotControlScreenAction";

function OrderListDialogExecutionListSwiper({ robotExecutionData }) {
  const dispatch = useDispatch();
  const {
    executeOrderId: executeOrderIdArray,
    name: executeOrderNameArray,
    queue,
    swiperCurrentCount,
  } = robotExecutionData;

  const executeOrderCount = executeOrderIdArray.length;

  const swiperChangeHandler = (mode) => {
    dispatch(swiperChangeAction(mode, swiperCurrentCount));
  };

  return (
    <SwiperBox>
      <SwiperTopBox>
        <SwiperPrevBtn>
          <IconButton
            disabled={swiperCurrentCount === 1}
            onClick={() => swiperChangeHandler("prev")}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        </SwiperPrevBtn>
        <SwiperNameBox>
          <Typography>
            {executeOrderNameArray[swiperCurrentCount - 1]}
          </Typography>
        </SwiperNameBox>
        <SwiperNextBtn>
          <IconButton
            disabled={swiperCurrentCount === executeOrderCount}
            onClick={() => swiperChangeHandler("next")}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </SwiperNextBtn>
      </SwiperTopBox>

      <SwiperIndexBox>{`${swiperCurrentCount} / ${executeOrderCount}`}</SwiperIndexBox>
    </SwiperBox>
  );
}

export default OrderListDialogExecutionListSwiper;
