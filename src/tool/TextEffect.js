import React from "react";
import "./css/TextEffect.css";

function TextEffect({ text, textColor, textCoverColor }) {
  console.log(textCoverColor);
  return (
    <p className="text-effect" data-text={text} style={{ color: textColor }}>
      {text}
    </p>
  );
}

export default TextEffect;
