import React, { Fragment, useEffect, useState } from "react";
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
import {
  IconButton,
  Input,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { ROBOT_CONTROL_SCREEN } from "../../../../redux/constants";
import LoadingCircle from "../../../../tool/LoadingCircle";
import ErrorMsgBox from "../../../../tool/ErrorMsgBox";
import {
  OrderListContentMsg,
  StyleCancelButton,
  StyleSearchIcon,
} from "../../../../styles/OrderScreen";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../../../styles/theme";
import { multipleOrderlistSelectAction } from "../../../../redux/actions/RobotControlScreenAction";
import { dialogOrderFilterAction } from "../../../../redux/actions/RobotControlScreenAction";

function OrderListDialogTabsMultipleOrder({ onOrderListDialogOpen }) {
  const dispatch = useDispatch();
  const {
    loading: multipleOrderListLoading,
    error: multipleOrderListError,
    data: multipleOrderListData,
  } = useSelector((state) => state.multipleOrderList);

  const { data: selectData, searchData } = useSelector(
    (state) => state.robotControlScreen_multipleOrderSelect
  );

  if (multipleOrderListData.length > 0) {
    const tempData = searchData !== null ? searchData : multipleOrderListData;

    var groupedData = tempData.reduce((acc, item) => {
      const date = item.createdAt.slice(0, -7);
      if (!acc[date]) {
        acc[date] = [];
      }
      if (item) {
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

  const multipleOrderListHandler = (orderId) => {
    const [multipleOrderSelectData] = multipleOrderListData.filter(
      (order) => order.id === orderId
    );
    dispatch(multipleOrderlistSelectAction(multipleOrderSelectData));
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
      dispatch(dialogOrderFilterAction("name", inputName, "multipleOrder"));
    }
  };

  const filterDateHandler = (e) => {
    setIsFilter(true);
    dispatch(dialogOrderFilterAction("date", e.target.value, "multipleOrder"));
  };

  const removeFilterHandler = () => {
    setIsFilter(false);
    dispatch({
      type: ROBOT_CONTROL_SCREEN.multipleOrderSelect,
      payload: { searchData: null },
    });
  };

  useEffect(() => {
    if (searchData !== null) {
      setIsFilter(true);
    }
  }, [searchData]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <OrderDialogBox>
      <OrderDialogSearchBox>
        <IconButton onClick={selectSearchHandler}>
          <StyleSearchIcon />
        </IconButton>

        {selectName ? (
          <Input
            sx={{
              width: "170px",
              marginRight: "10px",
              color: Colors.orangeDialog,
              backgroundColor: Colors.greyTextBlood,
              fontWeight: 600,
            }}
            endAdornment={
              <InputAdornment position="end" onClick={filterNameHandler}>
                <PlayArrowIcon
                  sx={{
                    width: "22px",
                    height: "22px",
                    backgroundColor: Colors.orangeDialog,
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
            className="input-date-orange"
            style={{
              width: "140px",
              marginRight: "10px",
              color: matches ? Colors.orangeDialog : Colors.greyTextBlood,
              backgroundColor: matches && Colors.greyTextBlood,
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

      {multipleOrderListLoading ? (
        <LoadingCircle />
      ) : multipleOrderListError ? (
        <ErrorMsgBox />
      ) : multipleOrderListData.length === 0 ? (
        <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
      ) : searchData !== null && searchData.length === 0 ? (
        <Fragment>
          <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
          {isFilter ? (
            <OrderDialogBackBox onClick={removeFilterHandler}>
              <StyleCancelButton />
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
                    onClick={() => multipleOrderListHandler(order.id)}
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
              <StyleCancelButton />
            </OrderDialogBackBox>
          ) : null}
        </Fragment>
      )}
    </OrderDialogBox>
  );
}

export default OrderListDialogTabsMultipleOrder;

{
  /* <StyleBox className="dialog-box">
      {multipleOrderListLoading ? (
        <LoadingCircle />
      ) : multipleOrderListError ? (
        <ErrorMsgBox />
      ) : multipleOrderListData.length === 0 ? (
        <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
      ) : (
        multipleOrderListData.map((order) => (
          <StyleInnerBox
            key={order.id}
            onClick={() => multipleOrderListHandler(order.id)}
          >
            <StyleInnerSmallBox>{order.name}</StyleInnerSmallBox>
          </StyleInnerBox>
        ))
      )}
    </StyleBox> */
}
