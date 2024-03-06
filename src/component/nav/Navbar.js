import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import {
  NavLeftBox,
  NavMiddleBox,
  NavRightBox,
  NavLinkImageBox,
  NavLinkImageSmallBox,
  NavLinkImageBoxText,
  UpBtn,
} from "../../styles/nav";
import { useMediaQuery, useTheme } from "@mui/material";
import { Colors } from "../../styles/theme";
import SwipeableEdgeDrawer from "./SwipeableEdgeDrawer";
import "./css/nav.css";
import { useDispatch } from "react-redux";
import { ROBOT_CONTROL_SCREEN } from "../../redux/constants";

function Navbar() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches_nine = useMediaQuery(theme.breakpoints.up("md"));
  const matches_six = useMediaQuery(theme.breakpoints.up("sm"));

  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  // auto button
  const [manualBtn, setManualBtn] = React.useState(true);

  const setManualBtnHandler = () => {
    setManualBtn(!manualBtn);
    dispatch({
      type: ROBOT_CONTROL_SCREEN.robotExecutionList,
      payload: { mode: manualBtn ? "auto" : "manual" },
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#FFF7EC",
          height: matches_six ? "100px" : "70px",
          boxShadow: "none",
          padding: "0px 50px",
          marginBottom: !matches_six && "10px",
          [theme.breakpoints.down("lg")]: {
            padding: "0px 0px",
          },
          [theme.breakpoints.down("md")]: {
            position: "fixed",
            top: 0,
            zIndex: 999,
            opacity: 0.9,
          },
        }}
      >
        <Toolbar sx={{ height: "100%" }}>
          <NavLeftBox>
            <Link to={"/"}>
              {matches_nine ? (
                <img
                  src={"logo.png"}
                  alt={"logo.png"}
                  className="logo-img"
                ></img>
              ) : (
                <img
                  src={"mixStackLogo.png"}
                  alt={"mixStackLogo.png"}
                  className="mixStackLogo-img"
                ></img>
              )}
            </Link>

            {matches_nine ? (
              <Box
                sx={{
                  marginLeft: "15px",
                  padding: "4px 8px",
                  color: Colors.bgcolorLightorange,
                  backgroundColor: manualBtn ? Colors.red800 : Colors.darkGreen,
                  borderRadius: "5px",
                  fontWeight: 600,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={setManualBtnHandler}
              >
                {manualBtn ? "手動" : "自動"}
              </Box>
            ) : null}
          </NavLeftBox>

          <NavMiddleBox>
            <Link to={"/"}>
              {matches_nine ? (
                <img
                  src={"mixStackLogo.png"}
                  alt={"mixStackLogo.png"}
                  className="mixStackLogo-img"
                ></img>
              ) : null}
            </Link>
          </NavMiddleBox>

          {/* 工單 控制台 歷史紀錄 */}
          <NavRightBox className="linkBox-img">
            {matches_six ? (
              <React.Fragment>
                <NavLinkImageBox>
                  {/* <Link to={"/demo1-select-item"}> */}
                  <Link to={"/order"}>
                    <NavLinkImageSmallBox>
                      <img
                        src={"workListSearch.png"}
                        alt={"workListSearch.png"}
                      ></img>
                      <NavLinkImageBoxText>工單</NavLinkImageBoxText>
                    </NavLinkImageSmallBox>
                  </Link>
                </NavLinkImageBox>

                <NavLinkImageBox>
                  <Link to={"/robot-control"}>
                    <NavLinkImageSmallBox>
                      <img
                        src={"workListSetting.png"}
                        alt={"workListSetting.png"}
                      ></img>
                      <NavLinkImageBoxText>控制台</NavLinkImageBoxText>
                    </NavLinkImageSmallBox>
                  </Link>
                </NavLinkImageBox>

                <NavLinkImageBox>
                  <Link to={"/history"}>
                    <NavLinkImageSmallBox>
                      <img src={"history.png"} alt={"history.png"}></img>
                      <NavLinkImageBoxText>歷史</NavLinkImageBoxText>
                    </NavLinkImageSmallBox>
                  </Link>
                </NavLinkImageBox>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setOpen(true)}
                  sx={{
                    marginRight: "7.5%",
                    backgroundColor: Colors.grey300,
                    "&:hover": {
                      backgroundColor: Colors.grey400,
                    },
                  }}
                >
                  <MenuIcon sx={{ color: Colors.greyTextBlood }} />
                </IconButton>
                <SwipeableEdgeDrawer
                  open={open}
                  closeOpen={() => setOpen(false)}
                />
              </React.Fragment>
            )}
          </NavRightBox>
        </Toolbar>
      </AppBar>

      <UpBtn onClick={scrollToTop} visible={visible} />
    </Box>
  );
}

export default Navbar;
