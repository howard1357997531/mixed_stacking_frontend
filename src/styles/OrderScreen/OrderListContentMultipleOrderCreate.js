import { Box, IconButton, Typography, styled } from "@mui/material";
import { Colors } from "../theme";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

export const MultiCreateDate = styled(Typography)(({ theme }) => ({
  borderTop: `1px solid ${Colors.greyBorder}`,
  borderBottom: `1px solid ${Colors.greyBorder}`,
  color: Colors.greyText,
  padding: "5px 10px",
}));

export const MultiCreateDetial = styled(Box, {
  shouldForwardProp: (prop) => prop !== "itemSelect",
})(({ theme, itemSelect }) => ({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "60px",
  color: itemSelect ? Colors.grey100 : Colors.greyText,
  backgroundColor: itemSelect ? Colors.lightbrown200 : null,
  fontWeight: 600,
  "&:hover": {
    backgroundColor: itemSelect
      ? Colors.lightbrown200
      : Colors.lightOrangeHover,
    cursor: "pointer",
  },
}));

export const MultiCreateName = styled(Box, {
  shouldForwardProp: (prop) => prop !== "itemSelect",
})(({ theme, itemSelect }) => ({
  boxSizing: "border-box",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
}));

export const IconButtonHelp = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "display",
})(({ theme, display }) => ({
  marginLeft: "5px",
  padding: "8px",
  display: !display && "none",
  transition: "opacity .2s ease-in-out",
  "&:hover": {
    backgroundColor: "#ffffff55",
  },
}));

export const StyleHelpRoundedIcon = styled(HelpRoundedIcon)(({ theme }) => ({
  fontSize: 16,
}));
