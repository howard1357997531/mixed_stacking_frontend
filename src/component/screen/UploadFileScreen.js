import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import "./css/uploadFile.css";

function UploadFileScreen() {
  const StyleBox = styled(Box)(({ theme }) => ({
    width: "500px",
    height: "500px",
    margin: "0 auto",
    backgroundColor: grey[300],
  }));
  const StyleUploadBox = styled(Box)(({ theme }) => ({
    backgroundColor: grey[600],
  }));

  const [orders, setOrders] = useState([]);
  console.log(orders);
  const fileChangeHandler = (e) => {
    const formData = new FormData();
    formData.append(`csv_file_length`, e.target.files.length);
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append(`csv_file${i + 1}`, e.target.files[i]);
      formData.append(`csv_file_name${i + 1}`, e.target.files[i].name);
    }
    axios
      .post("http://127.0.0.1:8000/api/uploadCsv/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {});
  };

  const CreateXlsxFileHandler = (id) => {
    console.log(id);
    axios
      .get(`http://127.0.0.1:8000/api/getOrderXlsxFile/${id}/`)
      .then((res) => {
        console.log(res.data);
      });
  };

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/getOrderData/").then((res) => {
      setOrders(res.data);
    });
  }, []);

  return (
    <StyleBox>
      <StyleUploadBox>
        <input
          type="file"
          id="file"
          onChange={fileChangeHandler}
          style={{ display: "none" }}
          multiple
        />
        <label htmlFor="file" className="labelStyle">
          上傳
        </label>
      </StyleUploadBox>
      {orders.map((order) => (
        <Button onClick={() => CreateXlsxFileHandler(order.id)}>123</Button>
      ))}
    </StyleBox>
  );
}

export default UploadFileScreen;
