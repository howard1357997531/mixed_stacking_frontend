import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useNavigate } from "react-router-dom";
import "./css/nav.css";
import {
  NavLeftBox,
  NavMiddleBox,
  NavRightBox,
  NavLinkImageBox,
  NavLinkImageSmallBox,
  NavLinkImageBoxText,
} from "../../styles/nav";
import { useMediaQuery, useTheme } from "@mui/material";
import { Colors } from "../../styles/theme";

function Navbar() {
  const navigate = useNavigate();
  const routeName = [
    { name: "首頁", url: "/" },
    { name: "手臂控制台", url: "/robot-control" },
    { name: "選擇紙箱類型", url: "/order" },
    { name: "歷史紀錄", url: "/history" },
  ];

  const routeHandler = (route) => {
    navigate(route);
  };

  // drawer
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {routeName.map((text, index) => (
          <ListItem key={text.name} disablePadding>
            <ListItemButton onClick={() => routeHandler(text.url)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const theme = useTheme();
  const matches_nine = useMediaQuery(theme.breakpoints.up("md"));
  const matches_six = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#FFF7EC",
          height: "100px",
          boxShadow: "none",
          padding: "0px 50px",
          [theme.breakpoints.down("lg")]: {
            padding: "0px 0px",
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
                  className="mixStackLogo-img-900"
                ></img>
              )}
            </Link>
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
              <>
                <NavLinkImageBox>
                  <Link to={"/demo1-select-item"}>
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
              </>
            ) : (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer("left", true)}
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
            )}
          </NavRightBox>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </Box>
  );
}

export default Navbar;
