import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material";
import { Colors } from "../../../styles/theme";

function OrderListDropdownMenu({ onFunctionMenuValue }) {
  const StyleMenuItem = styled(MenuItem)(({ theme }) => ({
    width: "108px",
    justifyContent: "center",
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
          height: "60%",
          color: "#fff",
          fontSize: "16px",
          backgroundColor: Colors.grey600,
          textTransform: "capitalize",
          "&:hover": {
            transform: "scale(1.05)",
            transition: "all 0.2s ease-in-out",
            backgroundColor: Colors.greyText,
            cursor: "pointer",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        功能
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
        <StyleMenuItem onClick={() => handleClose("orderDetail")}>
          工單
        </StyleMenuItem>
        <StyleMenuItem onClick={() => handleClose("multipleOrder")}>
          組合單
        </StyleMenuItem>
        <StyleMenuItem onClick={() => handleClose("edit")}>修改</StyleMenuItem>
        <StyleMenuItem onClick={() => handleClose("delete")}>
          刪除
        </StyleMenuItem>
      </Menu>
    </div>
  );
}

export default OrderListDropdownMenu;
