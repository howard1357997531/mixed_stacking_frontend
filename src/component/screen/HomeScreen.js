import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Container, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { brown, grey, lightBlue } from "@mui/material/colors";
import aos from "aos";
import "aos/dist/aos.css";

function HomeScreen() {
  const StyleContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 100px)",
  }));
  const StyleTitle = styled(Typography)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    color: lightBlue[700],
    width: "100%",
    height: "25%",
  }));
  const StyleContent = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "50%",
  }));
  const StyleContentButton = styled(Button)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: lightBlue[700],
    borderColor: lightBlue[700],
    fontSize: "26px",
    width: "25%",
    height: "50%",
    "&:hover": {
      border: `2px solid ${lightBlue[700]}`,
      // backgroundColor: lightBlue[50],
      transform: "scale(1.1)",
      transition: "all 0.3s ease-in-out",
      cursor: "pointer",
    },
    "&:active": {
      transform: "scale(.95)",
    },
  }));
  const StyleBottom = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    color: grey[600],
    fontSize: "26px",
    width: "100%",
    height: "25%",
  }));

  const navigate = useNavigate();
  const [leftButtonHover, setLeftButtonHover] = useState(false);
  const [rightButtonHover, setRightButtonHover] = useState(false);

  const mouseEnterHandler = useCallback((position) => {
    if (position === "left") {
      setLeftButtonHover(true);
    } else {
      setRightButtonHover(true);
    }
  }, []);

  const mouseLeaveHandler = useCallback((position) => {
    if (position === "left") {
      setLeftButtonHover(false);
    } else {
      setRightButtonHover(false);
    }
  }, []);

  const buttonHandler = (position) => {
    // navigate(position === "left" ? "/select-item" : "/control-robot");
    navigate(position === "left" ? "/create-orderlist" : "/upload-file");
  };

  useEffect(() => {
    document.querySelectorAll(".aoxItem").forEach((el) => {
      el.setAttribute("data-aos", "zoom-in");
    });
    setTimeout(() => {
      aos.init();
      aos.refresh();
    }, 200);
    setTimeout(() => {
      document.querySelectorAll(".aoxItem").forEach((el) => {
        el.removeAttribute("data-aos");
      });
    }, 1000);
  }, []);

  return (
    <StyleContainer>
      <StyleTitle variant="h4">請選擇方式</StyleTitle>

      <StyleContent>
        <StyleContentButton
          variant="outlined"
          onMouseEnter={() => mouseEnterHandler("left")}
          onMouseLeave={() => mouseLeaveHandler("left")}
          onClick={() => buttonHandler("left")}
          className="aoxItem"
        >
          建立新工單
        </StyleContentButton>
        <StyleContentButton
          variant="outlined"
          onMouseEnter={() => mouseEnterHandler("right")}
          onMouseLeave={() => mouseLeaveHandler("right")}
          onClick={() => buttonHandler("right")}
          className="aoxItem"
        >
          手臂控制台
        </StyleContentButton>
      </StyleContent>

      <StyleBottom>
        {leftButtonHover && "尚未建立工單，請前往去建立"}
        {rightButtonHover && "已使用過AI演算過工單，前去操控手臂"}
      </StyleBottom>
    </StyleContainer>
  );
}

export default HomeScreen;
