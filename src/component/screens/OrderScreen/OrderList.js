import React, { useEffect, useState } from "react";
import {
  BackBtnIconButton,
  OrderListBox,
  OrderListContentBox,
  OrderListNav,
  OrderListNavBtn,
  OrderListNavBtnBox,
  OrderListNavBtnText,
  OrderListNavFixedBox,
  OrderListNavFixedSmBox,
  OrderListSearch,
  OrderSwitchBox,
  OrderSwitchBtn,
  SearchSelect,
  StyleCancelButton,
  StyleSearchIcon,
} from "../../../styles/OrderScreen";
import {
  IconButton,
  Input,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import OrderListDropdownMenu from "./OrderListDropdownMenu";
import OrderListUploadFileDialog from "./OrderListUploadFileDialog";
import OrderListContent from "./OrderListContent";
import { useDispatch, useSelector } from "react-redux";
import {
  functionAreaModeAction,
  orderDeleteSelectAction,
  orderEditSelectAction,
  orderlistFilterAction,
  removeFilterAction,
} from "../../../redux/actions/OrderScreenAction";
import { ORDER_LIST, ORDER_SCREEN } from "../../../redux/constants";
import { Colors } from "../../../styles/theme";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import aos from "aos";
import "./css/OrderList.css";

function OrderList(props) {
  const dispatch = useDispatch();
  const { orderSelectMode, orderListData, multipleOrderListData } = props;

  const { loading: orderListLoading } = useSelector((state) => state.orderList);
  const { loading: multipleOrderListLoading } = useSelector(
    (state) => state.multipleOrderList
  );
  const { orderId, orderSearch, multiOrderSearch } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  const colorMode = ["multipleOrder", "multipleOrderCreate"].includes(
    orderSelectMode
  )
    ? true
    : false;

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

  const orderSwitchHandler = (mode) => {
    if (orderSelectMode === mode) return;
    if (orderSelectMode === "close" && mode === "orderDetail") return;

    if (mode === "orderDetail") {
      dispatch({
        type: ORDER_SCREEN.orderSelect,
        payload: {
          orderId: orderListData.at(0).id,
          aiTrainingState: orderListData.at(0).aiTraining_state,
        },
      });

      dispatch({
        type: ORDER_LIST.revise,
        payload: { name: orderListData.at(0).name },
      });
    }
    dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: { mode },
    });
  };

  const [isFilter, setIsFilter] = useState(false);
  const [selectSearchName, setSelectSearchName] = useState(true);
  const [selectSearchDate, setSelectSearchDate] = useState(true);
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
    let data =
      orderSelectMode === "multipleOrder"
        ? multipleOrderListData
        : orderListData;
    dispatch(removeFilterAction(orderSelectMode, data));
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

  // navBtn
  const changeMode = (mode) => {
    dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: { mode },
    });

    if (mode === "edit") {
      if (orderId) {
        dispatch(orderEditSelectAction(orderId, orderListData));
      }
    }

    if (mode === "delete") {
      const [orderName] = orderListData.filter((order) => order.id === orderId);
      if (orderId) {
        dispatch({
          type: ORDER_SCREEN.selectDelete,
          payload: { selectId: orderId, name: orderName.name, check: true },
        });
      }
    }
  };
  // upload
  const [open, setOpen] = useState(false);
  const onCloseDialog = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const matches_lg = useMediaQuery(theme.breakpoints.up("lg"));
  const matches_md = useMediaQuery(theme.breakpoints.up("md"));
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const orderListClassName = ["multipleOrder", "multipleOrderCreate"].includes(
    orderSelectMode
  )
    ? "multi-order-list"
    : "order-list";

  const dateClassName = ["multipleOrder", "multipleOrderCreate"].includes(
    orderSelectMode
  )
    ? "input-date-green"
    : "input-date-orange";
  return (
    <OrderListBox mode={colorMode}>
      <OrderSwitchBox>
        <OrderSwitchBtn onClick={() => orderSwitchHandler("orderDetail")}>
          <img
            style={{ width: "24px", height: "15px", marginRight: "4px" }}
            src="order.png"
            alt="order.png"
          />
          上傳工單
        </OrderSwitchBtn>
        <OrderSwitchBtn
          sx={{ backgroundColor: Colors.green }}
          onClick={() => orderSwitchHandler("multipleOrder")}
        >
          <img
            style={{ width: "24px", height: "15px", marginRight: "4px" }}
            src="combineOrder.png"
            alt="combineOrder.png"
          />
          合併工單
        </OrderSwitchBtn>
      </OrderSwitchBox>

      <OrderListNav>
        <OrderListSearch>
          <IconButton onClick={selectSearchHandler}>
            <StyleSearchIcon />
          </IconButton>
          {selectName ? (
            <Input
              sx={{
                width: "170px",
                color: colorMode ? Colors.green : Colors.lightOrange,
                backgroundColor: Colors.greyTextBlood,
                fontWeight: 600,
                [theme.breakpoints.down("lg")]: {
                  width: "140px",
                },
                [theme.breakpoints.down("sm")]: {
                  width: "170px",
                },
              }}
              endAdornment={
                <InputAdornment position="end" onClick={filterNameHandler}>
                  <PlayArrowIcon
                    sx={{
                      width: "20px",
                      height: "22px",
                      backgroundColor: colorMode
                        ? Colors.green
                        : Colors.lightOrange,
                      marginRight: "4px",
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
              className={dateClassName}
              style={{
                width: matches_lg ? "150px" : matches_md ? "120px" : "160px",
                height: "28%",
                color: matches
                  ? colorMode
                    ? Colors.green
                    : Colors.lightOrange
                  : Colors.greyTextBlood,
                backgroundColor: matches && Colors.greyTextBlood,
                fontWeight: 600,
              }}
              onChange={filterDateHandler}
            />
          ) : null}
          {selectSearchName ? (
            <SearchSelect
              sx={{ marginLeft: !selectName && !selectDate ? "2px" : "6px" }}
              mode={colorMode}
              data-aos="zoom-out"
              onClick={() => selectCondition("name")}
            >
              名稱
            </SearchSelect>
          ) : null}
          {selectSearchDate ? (
            <SearchSelect
              sx={{ marginLeft: !selectName && !selectDate ? "12px" : "6px" }}
              mode={colorMode}
              data-aos="zoom-out"
              data-aos-delay="100"
              onClick={() => selectCondition("date")}
            >
              日期
            </SearchSelect>
          ) : null}
        </OrderListSearch>

        {/* <OrderListDropdownMenu
          onFunctionMenuValue={onFunctionMenuValueHandler}
        /> */}

        <OrderListNavBtnBox>
          {/* orderList */}
          {!["multipleOrder", "multipleOrderCreate"].includes(
            orderSelectMode
          ) && matches ? (
            <OrderListNavBtn onClick={() => changeMode("edit")}>
              <img
                style={{ width: "20px", height: "20px" }}
                src={orderSelectMode === "edit" ? "edit2.png" : "edit.png"}
                alt={orderSelectMode === "edit" ? "edit2.png" : "edit.png"}
              />
              <OrderListNavBtnText
                sx={{ color: orderSelectMode === "edit" && Colors.blue400 }}
              >
                修改
              </OrderListNavBtnText>
            </OrderListNavBtn>
          ) : null}

          {!["multipleOrder", "multipleOrderCreate"].includes(
            orderSelectMode
          ) && matches ? (
            <OrderListNavBtn onClick={() => changeMode("delete")}>
              <img
                style={{ width: "16px", height: "20px" }}
                src={
                  orderSelectMode === "delete" ? "delete2.png" : "delete.png"
                }
                alt={
                  orderSelectMode === "delete" ? "delete2.png" : "delete.png"
                }
              />
              <OrderListNavBtnText
                sx={{ color: orderSelectMode === "delete" && Colors.red }}
              >
                刪除
              </OrderListNavBtnText>
            </OrderListNavBtn>
          ) : null}

          {["close", "orderDetail", "aiResult", "edit", "delete"].includes(
            orderSelectMode
          ) && matches ? (
            <OrderListNavBtn onClick={() => setOpen(true)}>
              <img
                style={{ width: "26px", height: "20px" }}
                src="upload.png"
                alt="upload.png"
              />
              <OrderListNavBtnText>上傳</OrderListNavBtnText>
            </OrderListNavBtn>
          ) : null}

          {["close", "orderDetail", "aiResult", "edit", "delete"].includes(
            orderSelectMode
          ) && !matches ? (
            <OrderListNavFixedBox>
              <OrderListNavFixedSmBox
                mode={orderSelectMode === "edit"}
                onClick={() => changeMode("edit")}
              >
                <OrderListNavBtn>
                  <img
                    style={{ width: "20px", height: "20px" }}
                    src={orderSelectMode === "edit" ? "edit2.png" : "edit.png"}
                    alt={orderSelectMode === "edit" ? "edit2.png" : "edit.png"}
                  />
                  <OrderListNavBtnText
                    sx={{ color: orderSelectMode === "edit" && Colors.blue400 }}
                  >
                    修改
                  </OrderListNavBtnText>
                </OrderListNavBtn>
              </OrderListNavFixedSmBox>

              <OrderListNavFixedSmBox
                mode={orderSelectMode === "delete"}
                onClick={() => changeMode("delete")}
              >
                <OrderListNavBtn>
                  <img
                    style={{ width: "16px", height: "20px" }}
                    src={
                      orderSelectMode === "delete"
                        ? "delete2.png"
                        : "delete.png"
                    }
                    alt={
                      orderSelectMode === "delete"
                        ? "delete2.png"
                        : "delete.png"
                    }
                  />
                  <OrderListNavBtnText
                    sx={{ color: orderSelectMode === "delete" && Colors.red }}
                  >
                    刪除
                  </OrderListNavBtnText>
                </OrderListNavBtn>
              </OrderListNavFixedSmBox>

              <OrderListNavFixedSmBox onClick={() => setOpen(true)}>
                <OrderListNavBtn>
                  <img
                    style={{ width: "26px", height: "20px" }}
                    src="upload.png"
                    alt="upload.png"
                  />
                  <OrderListNavBtnText>上傳</OrderListNavBtnText>
                </OrderListNavBtn>
              </OrderListNavFixedSmBox>
            </OrderListNavFixedBox>
          ) : null}

          {/* multipleOrder */}
          {["multipleOrder"].includes(orderSelectMode) ? (
            <OrderListNavBtn onClick={createMultiOrderHandle}>
              <img
                style={{
                  width: matches ? "24px" : "22px",
                  height: matches ? "24px" : "20px",
                }}
                src={
                  orderSelectMode === "multipleOrderCreate"
                    ? "createCombineOrder2.png"
                    : "createCombineOrder.png"
                }
                alt={
                  orderSelectMode === "multipleOrderCreate"
                    ? "createCombineOrder2.png"
                    : "createCombineOrder.png"
                }
              />
              <OrderListNavBtnText>創建</OrderListNavBtnText>
            </OrderListNavBtn>
          ) : null}

          {["multipleOrderCreate"].includes(orderSelectMode) ? (
            <OrderListNavBtn onClick={() => setOpen(true)}>
              <img
                style={{
                  width: matches ? "24px" : "24px",
                  height: matches ? "20px" : "16px",
                }}
                src="upload.png"
                alt="upload.png"
              />
              <OrderListNavBtnText>上傳</OrderListNavBtnText>
            </OrderListNavBtn>
          ) : null}
        </OrderListNavBtnBox>
      </OrderListNav>

      <OrderListContentBox className={orderListClassName} isFilter={isFilter}>
        <OrderListContent {...props} />
      </OrderListContentBox>

      {isFilter && !orderListLoading && !multipleOrderListLoading ? (
        <BackBtnIconButton onClick={removeFilterHandler}>
          <StyleCancelButton />
        </BackBtnIconButton>
      ) : null}

      <OrderListUploadFileDialog open={open} onCloseDialog={onCloseDialog} />
    </OrderListBox>
  );
}

export default OrderList;
