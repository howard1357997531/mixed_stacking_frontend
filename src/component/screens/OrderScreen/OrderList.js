import React, { useEffect, useState } from "react";
import {
  OrderListBox,
  OrderListDropdown,
  OrderListNav,
  OrderListSearch,
  OrderListUploadFile,
} from "../../../styles/OrderScreen";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import OrderListDropdownMenu from "./OrderListDropdownMenu";
import OrderListUploadFileDialog from "./OrderListUploadFileDialog";
import "./css/OrderList.css";
import OrderListContent from "./OrderListContent";

function OrderList() {
  const [functionBoxMode, setFunctionBoxMode] = useState("");

  const onFunctionMenuValueHandler = (mode) => {
    if (mode !== null) {
      if (mode !== functionBoxMode) {
        // setFunctionBoxData([]);
      }
      //   setOrderSelectId([]);
      //   setFunctionBoxOpen(true);
      setFunctionBoxMode(mode);
    }
  };

  return (
    <OrderListBox>
      <OrderListNav>
        <OrderListSearch>
          <IconButton>
            <SearchIcon />
          </IconButton>
        </OrderListSearch>

        <OrderListDropdown>
          <OrderListDropdownMenu
            onFunctionMenuValue={onFunctionMenuValueHandler}
          />
        </OrderListDropdown>

        <OrderListUploadFile>
          <OrderListUploadFileDialog />
        </OrderListUploadFile>
      </OrderListNav>

      <OrderListContent />
    </OrderListBox>
  );
}

export default OrderList;
