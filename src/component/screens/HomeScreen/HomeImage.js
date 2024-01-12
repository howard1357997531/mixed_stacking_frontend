import React, { useEffect, useState } from "react";
import {
  AllArea,
  DescText,
  HomeContainer,
  HomeDescBox,
  HomeHoverArea,
  LeftArea,
  RightArea,
} from "../../../styles/HomeScreen";
import "./css/home.css";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomeImage() {
  const navigate = useNavigate();
  const [image, setImage] = useState("home-icon.png");
  const [text, setText] = useState("");
  const [AreaTop, setAreaTop] = useState(true);

  const leftAreaMouseEnter = () => {
    setImage("home-icon2.png");
    setText("請將原始工單上傳，讓系統演算出最佳的堆疊方式");
  };

  const leftAreaMouseLeave = () => {
    setImage("home-icon.png");
    setText("");
  };

  const leftAreaClick = () => {
    setImage("home-icon4.png");
    setAreaTop(false);
    setTimeout(() => {
      navigate("/order");
    }, 1000);
  };

  const rightAreaMouseEnter = () => {
    setImage("home-icon3.png");
    setText("機械手臂將系統演算出來的執行工單進行堆疊");
  };

  const rightAreaClick = () => {
    setImage("home-icon5.png");
    setAreaTop(false);
    setTimeout(() => {
      navigate("/robot-control");
    }, 1000);
  };

  const allAreaMouseEnter = () => {
    setImage(image);
    setText(text);
  };

  return (
    <HomeContainer>
      <Box sx={{ position: "relative", marginTop: "20px" }}>
        <HomeHoverArea>
          <LeftArea
            sx={{ display: !AreaTop && "none" }}
            onMouseEnter={leftAreaMouseEnter}
            onMouseLeave={leftAreaMouseLeave}
            onClick={leftAreaClick}
          ></LeftArea>

          <RightArea
            sx={{ display: !AreaTop && "none" }}
            onMouseEnter={rightAreaMouseEnter}
            onMouseLeave={leftAreaMouseLeave}
            onClick={rightAreaClick}
          ></RightArea>

          <AllArea
            sx={{ display: AreaTop && "none" }}
            onMouseEnter={allAreaMouseEnter}
          ></AllArea>
        </HomeHoverArea>

        <img className="home-icon" src={image} alt={image} />

        <HomeDescBox>
          <DescText>{text}</DescText>
        </HomeDescBox>
      </Box>
    </HomeContainer>
  );
}

export default HomeImage;
