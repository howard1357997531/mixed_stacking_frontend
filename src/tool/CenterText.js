import { Typography } from "@mui/material";
import React from "react";
import { Colors } from "../styles/theme";

function CenterText({ text }) {
  return (
    <Typography
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: Colors.greyText,
        fontSize: "20px",
        fontWeight: 600,
      }}
    >
      {text}
    </Typography>
  );
}

export default CenterText;
