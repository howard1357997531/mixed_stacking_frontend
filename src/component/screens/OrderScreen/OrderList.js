import React, { useEffect, useState } from "react";
import {
  BackBtnIconButton,
  OrderListBox,
  OrderListContentBox,
  OrderListNav,
  OrderListNavBtn,
  OrderListSearch,
  SearchSelect,
} from "../../../styles/OrderScreen";
import { IconButton, Input, InputAdornment, Typography } from "@mui/material";
import OrderListDropdownMenu from "./OrderListDropdownMenu";
import OrderListUploadFileDialog from "./OrderListUploadFileDialog";
import OrderListContent from "./OrderListContent";
import { useDispatch, useSelector } from "react-redux";
import {
  functionAreaModeAction,
  orderlistFilterAction,
} from "../../../redux/actions/OrderScreenAction";
import { ORDER_SCREEN } from "../../../redux/constants";
import { Colors } from "../../../styles/theme";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  multipleOrderListAction,
  orderListAction,
} from "../../../redux/actions/OrderActions";
import aos from "aos";
import "./css/OrderList.css";

function OrderList(props) {
  const dispatch = useDispatch();
  const { orderSelectMode, orderListData, multipleOrderListData } = props;

  const { loading: orderListLoading } = useSelector((state) => state.orderList);
  const { loading: multipleOrderListLoading } = useSelector(
    (state) => state.multipleOrderList
  );
  const { orderSearch, multiOrderSearch } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  const titleName = (mode) => {
    if (["close", "orderDetail", "aiResult"].includes(mode)) {
      return "我的工單";
    } else if (["multipleOrder", "noMultipleOrder"].includes(mode)) {
      return "組合單";
    } else if (mode === "multipleOrderCreate") {
      return "創建組合單";
    } else if (mode === "edit") {
      return "修改";
    } else if (mode === "delete") {
      return "刪除";
    }
  };

  const onFunctionMenuValueHandler = (mode) => {
    if (mode === null || mode === orderSelectMode) {
      return;
    }
    dispatch(functionAreaModeAction(mode, multipleOrderListData));
  };

  const createMultiOrderHandle = () => {
    dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: { mode: "multipleOrderCreate" },
    });
  };

  const [isFilter, setIsFilter] = useState(false);
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

  const [inputName, setInputName] = useState("");

  const filterNameHandler = () => {
    if (inputName) {
      setIsFilter(true);
      dispatch(orderlistFilterAction("name", inputName, orderSelectMode));
    }
  };

  const filterDateHandler = (e) => {
    setIsFilter(true);
    dispatch(orderlistFilterAction("date", e.target.value, orderSelectMode));
  };

  const removeFilterHandler = () => {
    setIsFilter(false);
    if (orderSelectMode === "multipleOrder") {
      dispatch({
        type: ORDER_SCREEN.orderSelect,
        payload: { multiOrderSearch: null },
      });
    } else {
      dispatch({
        type: ORDER_SCREEN.orderSelect,
        payload: { orderSearch: null },
      });
    }
  };

  useEffect(() => {
    if (orderSelectMode === "multipleOrder") {
      if (multiOrderSearch !== null) {
        setIsFilter(true);
      } else {
        setIsFilter(false);
      }
    } else {
      if (orderSearch !== null) {
        setIsFilter(true);
      } else {
        setIsFilter(false);
      }
    }
  }, [orderSelectMode, orderSearch, multiOrderSearch]);
  return (
    <OrderListBox>
      <Typography
        sx={{
          position: "absolute",
          top: "-17px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "2px 15px 0px",
          color: Colors.greyText,
          background: Colors.lightOrange,
          fontSize: 22,
          fontWeight: 600,
          zIndex: 0.5,
          borderTopLeftRadius: "25px",
          borderTopRightRadius: "25px",
        }}
      >
        {titleName(orderSelectMode)}
      </Typography>

      <OrderListNav>
        <OrderListSearch>
          <IconButton onClick={selectSearchHandler}>
            <SearchIcon sx={{ color: Colors.greyText }} />
          </IconButton>

          {selectName ? (
            <Input
              sx={{
                width: "200px",
                color: Colors.lightOrange,
                backgroundColor: Colors.grey600,
              }}
              endAdornment={
                <InputAdornment position="end" onClick={filterNameHandler}>
                  <PlayArrowIcon
                    sx={{
                      width: "22px",
                      height: "22px",
                      backgroundColor: Colors.lightOrange,
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
              onChange={(e) => setInputName(e.target.value)}
            />
          ) : null}

          {selectDate ? (
            <input
              type="date"
              className="orderlist-input-date"
              style={{
                width: "140px",
                color: Colors.lightOrange,
                backgroundColor: Colors.grey600,
                fontWeight: 600,
              }}
              onChange={filterDateHandler}
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

        <OrderListDropdownMenu
          onFunctionMenuValue={onFunctionMenuValueHandler}
        />

        {["close", "orderDetail", "aiResult", "multipleOrderCreate"].includes(
          orderSelectMode
        ) ? (
          <OrderListUploadFileDialog />
        ) : null}

        {orderSelectMode === "multipleOrder" ? (
          <OrderListNavBtn
            disableElevation
            variant="contained"
            onClick={createMultiOrderHandle}
          >
            創建
          </OrderListNavBtn>
        ) : null}
      </OrderListNav>

      <OrderListContentBox className="order-list" isFilter={isFilter}>
        <OrderListContent {...props} />
      </OrderListContentBox>

      {isFilter && !orderListLoading && !multipleOrderListLoading ? (
        <BackBtnIconButton onClick={removeFilterHandler}>
          <CancelIcon />
        </BackBtnIconButton>
      ) : null}
    </OrderListBox>
  );
}

export default OrderList;
