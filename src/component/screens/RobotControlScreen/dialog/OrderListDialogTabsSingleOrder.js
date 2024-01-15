import React, { Fragment, useEffect, useState } from "react";
import LoadingCircle from "../../../../tool/LoadingCircle";
import ErrorMsgBox from "../../../../tool/ErrorMsgBox";
import { OrderListContentMsg } from "../../../../styles/OrderScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  dialogOrderFilterAction,
  orderlistSelectAction,
} from "../../../../redux/actions/RobotControlScreenAction";
import { Colors } from "../../../../styles/theme";
import {
  OrderDialogBox,
  OrderDialogDate,
  OrderDialogDetial,
  OrderDialogName,
  OrderDialogTime,
  OrderDialogListBox,
  OrderDialogSearchBox,
  OrderDialogSearchSelect,
  OrderDialogBackBox,
} from "../../../../styles/RobotControlScreen/dialog";
import { IconButton, Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { ROBOT_CONTROL_SCREEN } from "../../../../redux/constants";

function OrderListDialogTabsSingleOrder({ onOrderListDialogOpen }) {
  const dispatch = useDispatch();
  const {
    loading: orderListLoading,
    error: orderListError,
    data: orderListData,
  } = useSelector((state) => state.orderList);

  const { data: selectData, searchData } = useSelector(
    (state) => state.robotControlScreen_orderSelect
  );

  if (orderListData.length > 0) {
    const tempData = searchData !== null ? searchData : orderListData;

    var groupedData = tempData.reduce((acc, item) => {
      const date = item.createdAt.slice(0, -7);
      if (!acc[date]) {
        acc[date] = [];
      }
      if (item.aiTraining_state === "finish_training") {
        acc[date].push(item);
      }

      return acc;
    }, {});

    for (let x in groupedData) {
      if (groupedData[x].length === 0) {
        delete groupedData[x];
      }
    }
  }

  const orderListHandler = (orderId) => {
    const [singalOrderSelectObject] = orderListData.filter(
      (order) => order.id === orderId
    );
    dispatch(orderlistSelectAction(singalOrderSelectObject));
    onOrderListDialogOpen(false);
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

  const [inputName, setInputName] = useState("");

  const filterNameHandler = () => {
    if (inputName) {
      setIsFilter(true);
      dispatch(dialogOrderFilterAction("name", inputName, "orderDetail"));
    }
  };

  const filterDateHandler = (e) => {
    setIsFilter(true);
    dispatch(dialogOrderFilterAction("date", e.target.value, "orderDetail"));
  };

  const removeFilterHandler = () => {
    setIsFilter(false);
    dispatch({
      type: ROBOT_CONTROL_SCREEN.orderSelect,
      payload: { searchData: null },
    });
  };

  useEffect(() => {
    if (searchData !== null) {
      setIsFilter(true);
    }
  }, [searchData]);

  return (
    <OrderDialogBox>
      <OrderDialogSearchBox>
        <IconButton onClick={selectSearchHandler}>
          <SearchIcon sx={{ color: Colors.greyText }} />
        </IconButton>

        {selectName ? (
          <Input
            sx={{
              width: "170px",
              marginRight: "10px",
              color: Colors.brown,
              backgroundColor: Colors.greyText,
            }}
            endAdornment={
              <InputAdornment position="end" onClick={filterNameHandler}>
                <PlayArrowIcon
                  sx={{
                    width: "22px",
                    height: "22px",
                    backgroundColor: Colors.lightbrown,
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
            className="orderlist-dialog-input-date"
            style={{
              width: "140px",
              marginRight: "10px",
              color: Colors.brown,
              backgroundColor: Colors.greyText,
              fontWeight: 600,
            }}
            onChange={filterDateHandler}
          />
        ) : null}

        {selectSearchName ? (
          <OrderDialogSearchSelect onClick={() => selectCondition("name")}>
            名稱
          </OrderDialogSearchSelect>
        ) : null}
        {selectSearchDate ? (
          <OrderDialogSearchSelect onClick={() => selectCondition("date")}>
            日期
          </OrderDialogSearchSelect>
        ) : null}
      </OrderDialogSearchBox>

      {orderListLoading ? (
        <LoadingCircle />
      ) : orderListError ? (
        <ErrorMsgBox />
      ) : orderListData.length === 0 ? (
        <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
      ) : searchData !== null && searchData.length === 0 ? (
        <Fragment>
          <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
          {isFilter ? (
            <OrderDialogBackBox onClick={removeFilterHandler}>
              <CancelIcon />
            </OrderDialogBackBox>
          ) : null}
        </Fragment>
      ) : (
        <Fragment>
          <OrderDialogListBox className="dialog-order-box" isFilter={isFilter}>
            {Object.keys(groupedData).map((date) => (
              <Fragment key={date}>
                <OrderDialogDate>{date}</OrderDialogDate>

                {groupedData[date].map((order) => (
                  <OrderDialogDetial
                    key={order.id}
                    itemSelect={order.id == selectData.id}
                    onClick={() => orderListHandler(order.id)}
                  >
                    <OrderDialogName>{order.name}</OrderDialogName>
                    <OrderDialogTime>
                      {order.createdAt.slice(11)}
                    </OrderDialogTime>
                  </OrderDialogDetial>
                ))}
              </Fragment>
            ))}
          </OrderDialogListBox>

          {isFilter ? (
            <OrderDialogBackBox onClick={removeFilterHandler}>
              <CancelIcon />
            </OrderDialogBackBox>
          ) : null}
        </Fragment>
      )}
    </OrderDialogBox>
  );
}

export default OrderListDialogTabsSingleOrder;
