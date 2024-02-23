import React, { Fragment, useEffect, useState } from "react";
import {
  BackBtnIconButton,
  HistoryBox,
  HistoryContainer,
  HistoryContent,
  HistoryListDate,
  HistoryListDetial,
  HistoryName,
  HistoryTime,
  HistoryTitle,
  HistoryTitleBox,
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

function HistoryDesktop() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateInput, setDateInput] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [filterData, setFilterData] = useState([]);

  const dateHandler = (e) => {
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
      });
    } catch (error) {
      setLoading(false);
    }
  }, []);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const removeFilterHandler = () => {
    setIsFilter(false);
  };

  return (
    <HistoryContainer>
      <StyleBox>
        <HistoryBox>
          <HistoryTitleBox>
            <HistoryTitle>歷史紀錄</HistoryTitle>
            <IconButton onClick={() => setDateInput(!dateInput)}>
              <StyleSearchIcon />
            </IconButton>
            <input
              type="date"
              className="input-date-orange"
              style={{
                display: !dateInput && "none",
                width: matches && "120px",
                marginLeft: matches && "2px",
                color: matches ? Colors.lightOrange : Colors.greyTextBlood,
                backgroundColor: matches && Colors.greyTextBlood,
                fontWeight: 600,
              }}
              onChange={dateHandler}
            />
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
                        <HistoryName>
                          {parseCount(order.order_id)} 單
                        </HistoryName>
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
