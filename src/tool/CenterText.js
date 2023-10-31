import { Typography } from "@mui/material";
import React from "react";

function CenterText({ text }) {
  return (
    <Typography
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {text}
    </Typography>
  );
}

export default CenterText;
