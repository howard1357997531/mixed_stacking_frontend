import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material";
import { brown, grey } from "@mui/material/colors";
import "./css/uploadFileDialog.css";

function WorkListDropdownMenu({ onFunctionMenuValue }) {
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
          height: "60%",
          color: "#fff",
          backgroundColor: grey[700],
          textTransform: "capitalize",
          "&:hover": {
            transform: "scale(1.05)",
            transition: "all 0.2s ease-in-out",
            backgroundColor: grey[800],
            cursor: "pointer",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        Tool
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose("qrcode")}>
          Download QR code
        </MenuItem>
        <MenuItem onClick={() => handleClose("edit")}>Edit</MenuItem>
        <MenuItem onClick={() => handleClose("delete")}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

export default WorkListDropdownMenu;
