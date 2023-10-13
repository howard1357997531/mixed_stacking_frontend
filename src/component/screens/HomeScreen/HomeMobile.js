import React, { useEffect } from "react";
import {
  HomeContainerMobile,
  HomeContentMobile,
  HomeContentButtonMobile,
  HomeDescriptionMobile,
  HomeTitleMobile,
} from "../../../styles/HomeScreen";
import { useDispatch, useSelector } from "react-redux";
import { HOME_BUTTON } from "../../../redux/constants";
import aos from "aos";
import "aos/dist/aos.css";
import { Typography } from "@mui/material";

function HomeMobile({ matches }) {
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
    <HomeContainerMobile>
      <HomeTitleMobile variant="h4" data-aos="zoom-in">
        Please select a method
      </HomeTitleMobile>

      <HomeContentMobile>
        <HomeContentButtonMobile
          variant="outlined"
          onMouseEnter={() => mouseEnterHandler("create new order")}
          onMouseLeave={() => mouseLeaveHandler("create new order")}
          className="aoxItem"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          Create new order
        </HomeContentButtonMobile>
        <HomeContentButtonMobile
          variant="outlined"
          onMouseEnter={() => mouseEnterHandler("robot console")}
          onMouseLeave={() => mouseLeaveHandler("robot console")}
          className="aoxItem"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          Robot console
        </HomeContentButtonMobile>
      </HomeContentMobile>

      <HomeDescriptionMobile>
        {/* The order has not been created yet, please go to create one. */}
        {createNewOrder && (
          <Typography data-aos="zoom-in" data-aos-duration="500">
            The order has not been created yet, please go to create one.
          </Typography>
        )}
        {robotConsole && (
          <Typography data-aos="zoom-in" data-aos-duration="500">
            Already used AI to calculate orders and went to control the arm.
          </Typography>
        )}
      </HomeDescriptionMobile>
    </HomeContainerMobile>
  );
}

export default HomeMobile;
