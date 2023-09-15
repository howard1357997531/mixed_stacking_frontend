import React, { useEffect, useState } from "react";
import "./css/dot.css";
import { blue, deepPurple } from "@mui/material/colors";

function Dot({ currentState, robotState }) {
  const [dotColor, setDotColor] = useState(blue[600]);

  useEffect(() => {
    if (currentState === "啟動手臂中") {
      setDotColor(blue[600]);
    } else if (robotState === "prepare") {
      setDotColor(deepPurple[300]);
    }
  }, [currentState, robotState]);

  return (
    <div className="spinner-box">
      <div className="pulse-container">
        <div
          className="pulse-bubble pulse-bubble-1"
          style={{ backgroundColor: dotColor }}
        ></div>
        <div
          className="pulse-bubble pulse-bubble-2"
          style={{ backgroundColor: dotColor }}
        ></div>
        <div
          className="pulse-bubble pulse-bubble-3"
          style={{ backgroundColor: dotColor }}
        ></div>
      </div>
    </div>
  );
}

export default Dot;
