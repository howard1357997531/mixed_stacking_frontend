import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material";
import { brown } from "@mui/material/colors";

function WorkListDropdownMenu({ onFunctionMenuValue }) {
  const StyleButton = styled(Button)(({ theme }) => ({
    width: "80%",
    height: "80%",
    color: "#fff",
    backgroundColor: brown[500],
    "&:hover": {
      transform: "scale(1.05)",
      transition: "all 0.2s ease-in-out",
      backgroundColor: brown[700],
      cursor: "pointer",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
  }));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (mode) => {
    setAnchorEl(null);
    onFunctionMenuValue(mode);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
      }}
    >
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          width: "80%",
          height: "80%",
          color: "#fff",
          backgroundColor: brown[500],
          "&:hover": {
            transform: "scale(1.05)",
            transition: "all 0.2s ease-in-out",
            backgroundColor: brown[700],
            cursor: "pointer",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose("qrcode")}>下載 QR code</MenuItem>
        <MenuItem onClick={() => handleClose("modify")}>修改</MenuItem>
        <MenuItem onClick={() => handleClose("delete")}>刪除</MenuItem>
      </Menu>
    </div>
  );
}

export default WorkListDropdownMenu;
