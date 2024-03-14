import React, { Fragment, useEffect, useState } from "react";
import {
  BackBtnIconButton,
  HistoryBox,
  HistoryContainer,
  HistoryContent,
  HistoryInsertState,
  HistoryListDate,
  HistoryListDetial,
  HistoryName,
  HistoryResetAllState,
  HistoryResetState,
  HistoryStateCount,
  HistoryStateMulti,
  HistoryTime,
  HistoryTitle,
  HistoryTitleBox,
  NewText,
  StyleBox,
  StyleCancelButton,
} from "../../../styles/HistoryScreen/HistoryDesktop";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Colors } from "../../../styles/theme";
import HistoryDialog from "./HistoryDialog";
import { domain } from "../../../env";
import axios from "axios";
import "./css/HistoryDesktop.css";
import {
  OrderListContentMsg,
  StyleSearchIcon,
} from "../../../styles/OrderScreen";
import LoadingCircle from "../../../tool/LoadingCircle";
import { useDispatch, useSelector } from "react-redux";
import { NAV } from "../../../redux/constants";

function HistoryDesktop() {
  const dispatch = useDispatch();
  const { historyCount } = useSelector((state) => state.nav);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateInput, setDateInput] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [filterData, setFilterData] = useState([]);

  const dateFilterHandler = (e) => {
    setLoading(true);
    setIsFilter(true);
    axios
      .get(`${domain}/api/filter_history_record?date=${e.target.value}`)
      .then((res) => {
        setFilterData(res.data);
        setLoading(false);
      });
  };

  const dialogOpenHandler = (order) => {
    setDialogOpen(true);
    setDialogData(order);
  };

  const parseCount = (orders) => {
    const count = orders
      .split(",")
      .map((order) =>
        order.includes("*") ? parseInt(order.split("*").at(1)) : 1
      );
    return count.reduce((acc, crr) => acc + crr);
  };

  if (data.length > 0) {
    const hData = isFilter ? filterData : data;
    var groupedData = hData.reduce((acc, item) => {
      const dateTemp = item.start_time.slice(0, 10);
      if (!acc[dateTemp]) {
        acc[dateTemp] = [];
      }
      acc[dateTemp].push(item);
      return acc;
    }, {});
  }

  useEffect(() => {
    try {
      axios.get(`${domain}/api/history_record/`).then((res) => {
        setData(res.data);
        setLoading(false);
        console.log("get");
      });
    } catch (error) {
      setLoading(false);
    }

    if (historyCount !== 0) {
      dispatch({ type: NAV.historyCount, payload: 0 });
      setTimeout(() => {
        try {
          axios.post(`${domain}/api/clear_new_history_record/`).then((res) => {
            console.log("asd");
          });
        } catch (error) {}
      }, 2000);
    }
  }, []);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const removeFilterHandler = () => {
    setIsFilter(false);
  };

  // console.log(data);

  const parseState = (data) => {
    return data === "" || data === null ? false : true;
  };

  const parseInsertCount = (data, insertIndex) => {
    const temp = data
      .split(",")
      .filter((_, index) => insertIndex.split(",").includes(String(index)));
    const temp2 = temp.map((d) =>
      d.includes("*") ? parseInt(d.split("*").at(1)) : 1
    );

    return temp2.reduce((acc, cur) => acc + cur);
  };

  const parseResetCount = (data, resetAllIndex) => {
    // var count = data.split(",").length;
    // if (resetAllIndex !== null && resetAllIndex !== "") {
    //   count -= 1;
    // }
    return data.split(",").length;
  };

  return (
    <HistoryContainer>
      <StyleBox>
        <HistoryBox>
          <HistoryTitleBox>
            <HistoryTitle>歷史紀錄</HistoryTitle>
            <div>
              <input
                type="date"
                className="input-date-orange"
                style={{
                  display: !dateInput && "none",
                  width: matches && "120px",
                  marginRight: matches && "2px",
                  color: matches ? Colors.lightOrange : Colors.greyTextBlood,
                  backgroundColor: matches && Colors.greyTextBlood,
                  fontWeight: 600,
                }}
                onChange={dateFilterHandler}
              />
              <IconButton onClick={() => setDateInput(!dateInput)}>
                <StyleSearchIcon />
              </IconButton>
            </div>
          </HistoryTitleBox>

          <HistoryContent className="history-content" isFilter={isFilter}>
            {loading ? (
              <LoadingCircle />
            ) : data.length === 0 ? (
              <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
            ) : filterData.length === 0 && isFilter ? (
              <OrderListContentMsg variant="h5">查無此資料</OrderListContentMsg>
            ) : (
              <Fragment>
                {Object.keys(groupedData).map((date, index) => (
                  <Fragment key={index}>
                    <HistoryListDate isFirst={index === 0}>
                      {date}
                    </HistoryListDate>

                    {groupedData[date].map((order) => (
                      <HistoryListDetial
                        key={order.id}
                        onClick={() => dialogOpenHandler(order)}
                      >
                        {order.is_new ? <NewText>New</NewText> : null}

                        <HistoryName>
                          {parseCount(order.order_id)} 單
                        </HistoryName>

                        {/* 只要使用全部中斷裡面一定包含1個中斷(除了執行中的第一單中斷之外) */}
                        {/* 若使用全部中斷會減去1個中斷(除了執行中的第一單中斷之外) */}
                        {/* 若中斷 === 0 就不會顯示 */}
                        {parseState(order.reset_index) ? (
                          <Fragment>
                            <HistoryResetState>中斷</HistoryResetState>
                            <HistoryStateMulti>x</HistoryStateMulti>
                            <HistoryStateCount>
                              {parseResetCount(
                                order.reset_index,
                                order.reset_all_index
                              )}
                            </HistoryStateCount>
                          </Fragment>
                        ) : null}

                        {parseState(order.insert_index) ? (
                          <Fragment>
                            <HistoryInsertState>插單</HistoryInsertState>
                            <HistoryStateMulti>x</HistoryStateMulti>
                            <HistoryStateCount>
                              {parseInsertCount(
                                order.order_id,
                                order.insert_index
                              )}
                            </HistoryStateCount>
                          </Fragment>
                        ) : null}

                        {parseState(order.reset_all_index) ? (
                          <HistoryResetAllState>全部中斷</HistoryResetAllState>
                        ) : null}

                        <HistoryTime>
                          {order.start_time.slice(11)} ~{" "}
                          {order.end_time.slice(11)}
                        </HistoryTime>
                      </HistoryListDetial>
                    ))}
                  </Fragment>
                ))}
                <HistoryDialog
                  open={dialogOpen}
                  closeOpen={() => setDialogOpen(false)}
                  data={dialogData}
                />
              </Fragment>
            )}
          </HistoryContent>

          {isFilter && !loading ? (
            <BackBtnIconButton onClick={removeFilterHandler}>
              <StyleCancelButton />
            </BackBtnIconButton>
          ) : null}
        </HistoryBox>
      </StyleBox>
    </HistoryContainer>
  );
}

export default HistoryDesktop;
