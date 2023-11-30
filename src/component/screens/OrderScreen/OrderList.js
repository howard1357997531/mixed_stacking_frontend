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
import { functionAreaModeAction } from "../../../redux/actions/OrderScreenAction";
import { ORDER_SCREEN_orderList } from "../../../redux/constants";

function OrderList(props) {
  const dispatch = useDispatch();
  const { orderSelectMode, multipleOrderListData } = props;

  const onFunctionMenuValueHandler = (mode) => {
    if (mode === null || mode === orderSelectMode) {
      return;
    }

    if (mode === "multipleOrder" && multipleOrderListData.length === 0) {
      dispatch({
        type: ORDER_SCREEN_orderList.mode,
        payload: "noMultipleOrder",
      });

      dispatch({
        type: ORDER_SCREEN_orderList.orderId,
        payload: [],
      });
      return;
    }

    dispatch(functionAreaModeAction(mode, multipleOrderListData[0].id));
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
