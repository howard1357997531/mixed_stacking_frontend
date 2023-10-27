import React from "react";
import "./css/TextEffect2.css";

function TextEffect2({ texts, mode }) {
  const effectClassName = `text-effect2 ${
    mode === "effect" ? "hasEffect" : "noEffect"
  }`;

  return (
    <div className={effectClassName}>
      {texts.split("").map((text, index) => (
        <span key={index}>{text}</span>
      ))}
    </div>
  );
}

export default TextEffect2;
