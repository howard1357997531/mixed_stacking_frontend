import React from "react";
import "./css/TextEffect.css";
import { Colors } from "../styles/theme";

function TextEffect({ text, textColor, textCoverColor }) {
  if (textCoverColor === Colors.darkGreenHover) {
    var className = `text-effect text-effect2`;
  } else {
    var className = "text-effect text-effect1";
  }
  return (
    <p className={className} data-text={text} style={{ color: textColor }}>
      {text}
    </p>
  );
}

export default TextEffect;
