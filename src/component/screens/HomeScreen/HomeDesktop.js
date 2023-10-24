import React, { useEffect } from "react";
import {
  HomeContainer,
  HomeContent,
  HomeContentButton,
  HomeDescription,
  HomeTitle,
} from "../../../styles/HomeScreen";
import { useDispatch, useSelector } from "react-redux";
import { HOME_BUTTON } from "../../../redux/constants";
import aos from "aos";
import "aos/dist/aos.css";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomeDesktop({ matches }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createNewOrder, robotConsole } = useSelector(
    (state) => state.HomeButtonHover
  );

  const mouseEnterHandler = (name) => {
    name === "create new order"
      ? dispatch({ type: HOME_BUTTON.createNewOrder.hover })
      : dispatch({ type: HOME_BUTTON.robotConsole.hover });
  };

  const mouseLeaveHandler = (name) => {
    name === "create new order"
      ? dispatch({ type: HOME_BUTTON.createNewOrder.unhover })
      : dispatch({ type: HOME_BUTTON.robotConsole.unhover });
  };

  const navigateHandler = (name) => {
    navigate(name === "create new order" ? "/order" : "/robot-control");
    dispatch({ type: HOME_BUTTON.createNewOrder.unhover });
    dispatch({ type: HOME_BUTTON.robotConsole.unhover });
  };

  useEffect(() => {
    aos.init();
    aos.refresh();
    setTimeout(() => {
      document.querySelectorAll(".aoxItem").forEach((el) => {
        el.removeAttribute("data-aos");
      });
    }, 1000);
  }, []);

  return (
    <HomeContainer>
      <HomeTitle variant="h4" data-aos="zoom-in">
        {/* Please select a method */}
        請選擇方式
      </HomeTitle>

      <HomeContent>
        <HomeContentButton
          variant="outlined"
          className="aoxItem"
          data-aos="zoom-in"
          data-aos-delay="300"
          onMouseEnter={() => mouseEnterHandler("create new order")}
          onMouseLeave={() => mouseLeaveHandler("create new order")}
          onClick={() => navigateHandler("create new order")}
        >
          {/* Create new order */}
          建立新工單
        </HomeContentButton>

        <HomeContentButton
          variant="outlined"
          className="aoxItem"
          data-aos="zoom-in"
          data-aos-delay="300"
          onMouseEnter={() => mouseEnterHandler("robot console")}
          onMouseLeave={() => mouseLeaveHandler("robot console")}
          onClick={() => navigateHandler("robot console")}
        >
          {/* Robot console */}
          手臂控制台
        </HomeContentButton>
      </HomeContent>

      <HomeDescription>
        {createNewOrder && (
          <Typography data-aos="fade-right" data-aos-duration="1000">
            {/* The order has not been created yet, please go to create one. */}
            尚未建立工單，請前往去建立
          </Typography>
        )}

        {robotConsole && (
          <Typography data-aos="fade-left" data-aos-duration="1000">
            {/* Already used AI to calculate orders and went to control the arm. */}
            已使用過AI演算過工單，前去操控手臂
          </Typography>
        )}
      </HomeDescription>
    </HomeContainer>
  );
}

export default HomeDesktop;
