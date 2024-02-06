import React, { Fragment, useEffect, useState } from "react";
import {
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
} from "../../../styles/HistoryScreen/HistoryDesktop";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./css/HistoryDesktop.css";
import { Colors } from "../../../styles/theme";
import HistoryDialog from "./HistoryDialog";
import { domain } from "../../../env";
import axios from "axios";

function HistoryDesktop() {
  const [dateInput, setDateInput] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const dateHandler = (e) => {
    console.log(e.target.value);
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const parseCount = (orders) => {
    const count = orders
      .split(",")
      .map((order) =>
        order.includes("*") ? parseInt(order.split("*").at(1)) : 1
      );
    return count.reduce((acc, crr) => acc + crr);
  };

  if (data.length > 0) {
    var groupedData = data.reduce((acc, item) => {
      const dateTemp = item.start_time.slice(0, 10);
      if (!acc[dateTemp]) {
        acc[dateTemp] = [];
      }
      acc[dateTemp].push(item);
      return acc;
    }, {});
    // console.log(Object.keys(groupedData));
  }

  useEffect(() => {
    axios.get(`${domain}/api/history_record/`).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <HistoryContainer>
      <StyleBox>
        <HistoryBox>
          <HistoryTitleBox>
            <HistoryTitle>歷史紀錄</HistoryTitle>
            <IconButton onClick={() => setDateInput(!dateInput)}>
              <SearchIcon />
            </IconButton>
            <input
              type="date"
              style={{
                display: !dateInput && "none",
                width: "120px",
                padding: "7.5px",
                marginLeft: "2px",
                color: Colors.lightOrange,
                backgroundColor: Colors.grey600,
                fontWeight: 600,
              }}
              onChange={dateHandler}
            />
          </HistoryTitleBox>

          <HistoryContent className="history-content">
            {loading
              ? "asd"
              : Object.keys(groupedData).map((date, index) => (
                  <Fragment key={index}>
                    <HistoryListDate isFirst={index === 0}>
                      {date}
                    </HistoryListDate>

                    {groupedData[date].map((order) => (
                      <HistoryListDetial
                        key={order.id}
                        onClick={() => setDialogOpen(true)}
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
          </HistoryContent>
        </HistoryBox>
      </StyleBox>
      <HistoryDialog open={dialogOpen} closeOpen={() => setDialogOpen(false)} />
    </HistoryContainer>
  );
}

export default HistoryDesktop;
