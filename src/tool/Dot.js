import React from "react";
import "./css/Dot.css";

function Dot({ dotColor }) {
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
