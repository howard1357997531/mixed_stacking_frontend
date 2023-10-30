import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { ORDER_SCREEN_orderList } from "../../../redux/constants";
import { functionAreaModeAction } from "../../../redux/actions/OrderScreenAction";

function OrderList(props) {
  const dispatch = useDispatch();

  const onFunctionMenuValueHandler = (mode) => {
    if (mode !== null) {
      if (mode !== props.orderSelectMode) {
        dispatch(functionAreaModeAction(mode));
      }
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

      <OrderListContent {...props} />
    </OrderListBox>
  );
}

export default OrderList;
