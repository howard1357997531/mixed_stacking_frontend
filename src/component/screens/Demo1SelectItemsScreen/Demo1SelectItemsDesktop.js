import {
  StyleStack,
  StyleBox,
  StyleTitle,
  StyleItemSixStack,
  StyleItemBox,
  StyleItemStack,
  StyleLittleBox_60,
  StyleLittleBox_20,
} from "../../../styles/Demo1SelectItemsScreen";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { brown, indigo, yellow } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../styles/theme";
import SelectItemDialog from "./SelectItemDialog";
import Swal from "sweetalert2";
import aos from "aos";
import "aos/dist/aos.css";
import "./css/Demo1SelectItemsDesktop.css";

function Demo1SelectItemsDesktop() {
  const [qty1, setQty1] = useState(0);
  const [qty2, setQty2] = useState(0);
  const [qty3, setQty3] = useState(0);
  const [qty4, setQty4] = useState(0);
  const [qty5, setQty5] = useState(0);
  const [qty6, setQty6] = useState(0);
  const [qty7, setQty7] = useState(0);
  const [qty8, setQty8] = useState(0);
  const [qty9, setQty9] = useState(0);
  const [qty10, setQty10] = useState(0);
  const [qty11, setQty11] = useState(0);
  const [listDailogOpen, setListDailogOpen] = useState(false);
  const totalCount =
    qty1 +
    qty2 +
    qty3 +
    qty4 +
    qty5 +
    qty6 +
    qty7 +
    qty8 +
    qty9 +
    qty10 +
    qty11;

  const data = {
    "16A": qty1,
    "18A": qty2,
    33: qty3,
    "7A": qty4,
    13: qty5,
    22: qty6,
    20: qty7,
    29: qty8,
    9: qty9,
    26: qty10,
    35: qty11,
    count: totalCount,
  };

  const data2 = [
    { name: "16A", count: qty1, image: "16A.png" },
    { name: "18A", count: qty2, image: "18A.png" },
    { name: "33", count: qty3, image: "33.png" },
    { name: "7A", count: qty4, image: "7A.png" },
    { name: "13", count: qty5, image: "13.png" },
    { name: "22", count: qty6, image: "22.png" },
    { name: "20", count: qty7, image: "20.png" },
    { name: "29", count: qty8, image: "29.png" },
    { name: "9", count: qty9, image: "9.png" },
    { name: "26", count: qty10, image: "26.png" },
    { name: "35", count: qty11, image: "35.png" },
  ];

  const onListDailogOpen = (status) => {
    setListDailogOpen(status);
  };

  const handleChange = (e, index) => {
    if (index === 1) {
      setQty1(e.target.value);
    } else if (index === 2) {
      setQty2(e.target.value);
    } else if (index === 3) {
      setQty3(e.target.value);
    } else if (index === 4) {
      setQty4(e.target.value);
    } else if (index === 5) {
      setQty5(e.target.value);
    } else if (index === 6) {
      setQty6(e.target.value);
    } else if (index === 7) {
      setQty7(e.target.value);
    } else if (index === 8) {
      setQty8(e.target.value);
    } else if (index === 9) {
      setQty9(e.target.value);
    } else if (index === 10) {
      setQty10(e.target.value);
    } else if (index === 11) {
      setQty11(e.target.value);
    }
  };

  const SendDataHandler = () => {
    if (totalCount === 0) {
      Swal.fire({
        title: "數量不能為 0 個",
        icon: "warning",
        background: indigo[200],
      });
    } else {
      setListDailogOpen(!listDailogOpen);
    }
  };

  const itemTop = [
    {
      image: "16A.png",
      size: "尺寸 : 70 * 52 * 32 (mm)",
      bgColor: Colors.grey,
      value: qty1,
    },
    {
      image: "18A.png",
      size: "尺寸 : 70 * 52 * 36 (mm)",
      bgColor: Colors.lightGreen,
      value: qty2,
    },
    {
      image: "33.png",
      size: "尺寸 : 88 * 42 * 36 (mm)",
      bgColor: Colors.grey,
      value: qty3,
    },
    {
      image: "7A.png",
      size: "尺寸 : 70 * 52 * 40 (mm)",
      bgColor: Colors.red,
      value: qty4,
    },
    {
      image: "13.png",
      size: "尺寸 : 112 * 50 * 28 (mm)",
      bgColor: Colors.grey,
      value: qty5,
    },
    {
      image: "22.png",
      size: "尺寸 : 90 * 52 * 36 (mm)",
      bgColor: Colors.darkPink,
      value: qty6,
    },
  ];

  const itemDown = [
    {
      image: "20.png",
      size: "尺寸 : 106 * 68 * 26 (mm)",
      bgColor: yellow[300],
      value: qty7,
    },
    {
      image: "29.png",
      size: "尺寸 : 130 * 50 * 36 (mm)",
      bgColor: Colors.grey,
      value: qty8,
    },
    {
      image: "9.png",
      size: "尺寸 : 86 * 64 * 46 (mm)",
      bgColor: Colors.darkGreen,
      value: qty9,
    },
    {
      image: "26.png",
      size: "尺寸 : 144 * 50 * 40 (mm)",
      bgColor: Colors.grey,
      value: qty10,
    },
    {
      image: "35.png",
      size: "尺寸 : 204 * 92 * 36 (mm)",
      bgColor: Colors.orange,
      value: qty11,
    },
  ];

  useEffect(() => {
    document.querySelectorAll(".aoxItem-flip-left").forEach((el) => {
      el.setAttribute("data-aos", "flip-left");
    });
    document.querySelectorAll(".aoxItem-zoom-in").forEach((el) => {
      el.setAttribute("data-aos", "zoom-in");
    });
    setTimeout(() => {
      aos.init();
      aos.refresh();
    }, 100);
    setTimeout(() => {
      document.querySelectorAll(".aoxItem-flip-left").forEach((el) => {
        el.removeAttribute("data-aos", "flip-left");
      });
      document.querySelectorAll(".aoxItem-zoom-in").forEach((el) => {
        el.removeAttribute("data-aos", "zoom-in");
      });
    }, 1600);
  }, []);
  return (
    <StyleStack>
      <StyleBox>
        <StyleTitle>紙箱類型</StyleTitle>

        <StyleItemSixStack>
          {itemTop.map((item, index) => (
            <StyleItemBox
              key={index}
              sx={{ backgroundColor: item.bgColor }}
              className="aoxItem-flip-left"
              data-aos-delay={index * 100}
            >
              <StyleItemStack>
                <StyleLittleBox_60>
                  <img
                    src={item.image}
                    alt={item.image}
                    className="select-item-img"
                  ></img>
                </StyleLittleBox_60>
                <StyleLittleBox_20>
                  <Typography> {item.size}</Typography>
                </StyleLittleBox_20>
                <StyleLittleBox_20>
                  <Typography>數量 : </Typography>
                  <FormControl
                    sx={{ width: "50%", marginLeft: "10px" }}
                    size="small"
                  >
                    <Select
                      value={item.value}
                      onChange={(e) => handleChange(e, index + 1)}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{ textAlign: "center" }}
                    >
                      <MenuItem value={0}>0</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                </StyleLittleBox_20>
              </StyleItemStack>
            </StyleItemBox>
          ))}
        </StyleItemSixStack>

        <StyleItemSixStack>
          {itemDown.map((item, index) => (
            <StyleItemBox
              key={index + 7}
              sx={{ backgroundColor: item.bgColor }}
              className="aoxItem-flip-left"
              data-aos-delay={index * 100 + 600}
            >
              <StyleItemStack>
                <StyleLittleBox_60>
                  <img
                    src={item.image}
                    alt={item.image}
                    className="select-item-img"
                  ></img>
                </StyleLittleBox_60>

                <StyleLittleBox_20>
                  <Typography> {item.size}</Typography>
                </StyleLittleBox_20>

                <StyleLittleBox_20>
                  <Typography>數量 : </Typography>
                  <FormControl
                    sx={{ width: "50%", marginLeft: "10px" }}
                    size="small"
                  >
                    <Select
                      value={item.value}
                      onChange={(e) => handleChange(e, index + 7)}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{ textAlign: "center" }}
                    >
                      <MenuItem value={0}>0</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      {/* {index !== 4 ? <MenuItem value={3}>3</MenuItem> : null} */}
                      {index !== 4 ? <MenuItem value={4}>4</MenuItem> : null}
                      {index !== 4 ? <MenuItem value={5}>5</MenuItem> : null}
                      {/* <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem> */}
                    </Select>
                  </FormControl>
                </StyleLittleBox_20>
              </StyleItemStack>
            </StyleItemBox>
          ))}

          <StyleItemBox
            sx={{
              backgroundColor: brown[300],
              "&:hover": {
                backgroundColor: brown[400],
                transition: "all 0.3s ease-in-out",
                transform: "scale(1.05)",
                cursor: "pointer",
              },
              "&:active": {
                transform: "scale(0.9)",
              },
            }}
            onClick={SendDataHandler}
            className="aoxItem-zoom-in"
            data-aos-delay={1200}
          >
            <StyleItemStack>
              <StyleLittleBox_60>
                <img
                  className="select"
                  src={"listBtn.png"}
                  alt={"listBtn.png"}
                ></img>
              </StyleLittleBox_60>
              <StyleLittleBox_20>
                <Typography>建立工單</Typography>
              </StyleLittleBox_20>
              <StyleLittleBox_20>
                <Typography>Create a Work Order</Typography>
              </StyleLittleBox_20>
            </StyleItemStack>
          </StyleItemBox>
        </StyleItemSixStack>
      </StyleBox>

      <SelectItemDialog
        listDailogOpen={listDailogOpen}
        onListDailogOpen={onListDailogOpen}
        data={data}
        data2={data2}
      />
    </StyleStack>
  );
}

export default Demo1SelectItemsDesktop;
