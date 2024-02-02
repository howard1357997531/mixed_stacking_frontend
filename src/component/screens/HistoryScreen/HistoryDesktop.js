import React, { useEffect, useState } from "react";
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
  const [date, setDate] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const dateHandler = (e) => {
    console.log(e.target.value);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${domain}/api/history_record/`).then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <HistoryContainer>
      <StyleBox>
        <HistoryBox>
          <HistoryTitleBox>
            <HistoryTitle>歷史紀錄</HistoryTitle>
            <IconButton onClick={() => setDate(!date)}>
              <SearchIcon />
            </IconButton>
            <input
              type="date"
              style={{
                display: !date && "none",
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
            <HistoryListDate isFirst={0 === 0}>2024/01/25</HistoryListDate>
            <HistoryListDetial onClick={() => setDialogOpen(true)}>
              <HistoryName>10單</HistoryName>
              <HistoryTime>12:15 ~ 13:45</HistoryTime>
            </HistoryListDetial>
            <HistoryListDetial>
              <HistoryName>10單</HistoryName>
              <HistoryTime>12:15 ~ 13:45</HistoryTime>
            </HistoryListDetial>
            <HistoryListDate>2024/01/25</HistoryListDate>
            <HistoryListDetial>
              <HistoryName>10單</HistoryName>
              <HistoryTime>12:15 ~ 13:45</HistoryTime>
            </HistoryListDetial>
            <HistoryListDetial>
              <HistoryName>10單</HistoryName>
              <HistoryTime>12:15 ~ 13:45</HistoryTime>
            </HistoryListDetial>
            <HistoryListDetial>
              <HistoryName>10單</HistoryName>
              <HistoryTime>12:15 ~ 13:45</HistoryTime>
            </HistoryListDetial>
            <HistoryListDetial>
              <HistoryName>10單</HistoryName>
              <HistoryTime>12:15 ~ 13:45</HistoryTime>
            </HistoryListDetial>
            <HistoryListDetial>
              <HistoryName>10單</HistoryName>
              <HistoryTime>12:15 ~ 13:45</HistoryTime>
            </HistoryListDetial>
            <HistoryListDetial>
              <HistoryName>10單</HistoryName>
              <HistoryTime>12:15 ~ 13:45</HistoryTime>
            </HistoryListDetial>
          </HistoryContent>
        </HistoryBox>
      </StyleBox>
      <HistoryDialog open={dialogOpen} closeOpen={() => setDialogOpen(false)} />
    </HistoryContainer>
  );
}

export default HistoryDesktop;
