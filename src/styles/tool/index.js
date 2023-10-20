import { Box, IconButton, styled } from "@mui/material";
import { errorMsgIconButtonAnimation } from "../../animation";

export const ErrorMsg = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const ErrorMsgIconButton = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    transform: "scale(1.1)",
    animation: `${errorMsgIconButtonAnimation} .5s `,
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));
