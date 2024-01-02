import React, { useEffect, useState } from "react";
import {
  OrderListBox,
  OrderListDropdown,
  OrderListNav,
  OrderListSearch,
  OrderListUploadFile,
  SearchSelect,
} from "../../../styles/OrderScreen";
import { IconButton, Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import OrderListDropdownMenu from "./OrderListDropdownMenu";
import OrderListUploadFileDialog from "./OrderListUploadFileDialog";
import "./css/OrderList.css";
import OrderListContent from "./OrderListContent";
import { useDispatch } from "react-redux";
import { functionAreaModeAction } from "../../../redux/actions/OrderScreenAction";
import { ORDER_SCREEN_orderList } from "../../../redux/constants";
import { Colors } from "../../../styles/theme";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import aos from "aos";

function OrderList(props) {
  const dispatch = useDispatch();
  const { orderSelectMode, multipleOrderListData } = props;

  const onFunctionMenuValueHandler = (mode) => {
    if (mode === null || mode === orderSelectMode) {
      return;
    }

    dispatch(functionAreaModeAction(mode, multipleOrderListData));
  };

  const [selectSearchName, setSelectSearchName] = useState(false);
  const [selectSearchDate, setSelectSearchDate] = useState(false);
  const [selectName, setSelectName] = useState(false);
  const [selectDate, setSelectDate] = useState(false);

  const selectSearchHandler = () => {
    if (selectName || selectDate) {
      setSelectSearchName(false);
      setSelectSearchDate(false);
      setSelectName(false);
      setSelectDate(false);
    } else {
      setSelectSearchName(!selectSearchName);
      setSelectSearchDate(!selectSearchDate);
    }
  };

  const selectCondition = (condition) => {
    if (condition === "name") {
      if (selectDate) {
        setSelectSearchDate(true);
      }
      setSelectSearchName(false);
      setSelectName(true);
      setSelectDate(false);
    } else {
      if (selectName) {
        setSelectSearchName(true);
      }
      setSelectSearchDate(false);
      setSelectName(false);
      setSelectDate(true);
    }
  };

  useEffect(() => {
    aos.init();
    aos.refresh();
  });

  return (
    <OrderListBox>
      <OrderListNav>
        <OrderListSearch>
          <IconButton onClick={selectSearchHandler}>
            <SearchIcon sx={{ color: Colors.greyText }} />
          </IconButton>

          {selectName ? (
            <Input
              sx={{
                width: "200px",
                color: Colors.lightOrangeHover,
                backgroundColor: Colors.greyText,
              }}
              endAdornment={
                <InputAdornment position="end">
                  <PlayArrowIcon
                    sx={{
                      width: "22px",
                      height: "22px",
                      backgroundColor: Colors.lightOrangeHover,
                      marginRight: "6px",
                      "&:hover": {
                        cursor: "pointer",
                        transform: "scale(1.1)",
                      },
                      "&:active": {
                        transform: "scale(0.9)",
                      },
                    }}
                  />
                </InputAdornment>
              }
            />
          ) : null}

          {selectDate ? (
            <input
              type="date"
              style={{
                color: Colors.lightOrangeHover,
                backgroundColor: Colors.greyText,
                fontWeight: 600,
                border: `1px solid ${Colors.greyText}`,
              }}
            />
          ) : null}

          {selectSearchName ? (
            <SearchSelect
              data-aos="zoom-out"
              onClick={() => selectCondition("name")}
            >
              名稱
            </SearchSelect>
          ) : null}

          {selectSearchDate ? (
            <SearchSelect
              data-aos="zoom-out"
              data-aos-delay="100"
              onClick={() => selectCondition("date")}
            >
              日期
            </SearchSelect>
          ) : null}
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
