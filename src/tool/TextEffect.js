import React from "react";
import { Colors } from "../styles/theme";
import "./css/TextEffect.css";

function TextEffect({ text, textColor, textCoverColor }) {
  if (textCoverColor === Colors.purple400) {
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
