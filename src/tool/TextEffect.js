import React from "react";
import { Colors } from "../styles/theme";
import "./css/TextEffect.css";

function TextEffect({ text, textColor }) {
  if (textColor === Colors.white) {
    var className = `text-effect text-effect2`;
  } else if (textColor === Colors.blue500) {
    var className = "text-effect text-effect1";
  }
  return (
    <p
      className={className}
      data-text={text}
      style={{ color: Colors.greyText }}
    >
      {text}
    </p>
  );
}

export default TextEffect;
