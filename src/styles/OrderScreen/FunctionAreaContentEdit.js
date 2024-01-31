import { Box, Typography, styled } from "@mui/material";
import { Colors } from "../theme";
import EditIcon from "@mui/icons-material/Edit";

export const StyleEditIcon = styled(EditIcon)(({ theme }) => ({
  position: "absolute",
  top: "25px",
  right: "25px",
  padding: "3px 6px",
  borderRadius: "10px",
  color: Colors.lightOrange,
  backgroundColor: Colors.darkGreen,
  "&:hover": {
    transform: "scale(1.1)",
    cursor: "pointer",
  },
  "&:active": {
    transform: "scale(.95)",
  },
}));
