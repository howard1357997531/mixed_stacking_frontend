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
import { Stack, Typography, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import "./css/nav.css";
import QRcodeDialog from "./QRcodeDialog";

function Navbar({ onQRcodeNavId }) {
  const navigate = useNavigate();
  const routeName = [
    { name: "首頁", url: "/" },
    { name: "手臂控制台", url: "/control-robot" },
    { name: "選擇紙箱類型", url: "/select-item" },
    { name: "AI 演算", url: "/ai-training" },
  ];
  const StyleSecondStack = styled(Stack)({
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexGrow: 1,
    height: "100%",
  });
  const StyleSideStack = styled(Stack)({
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "18%",
    height: "100%",
  });
  const StyleLinkImageBox = styled(Box)({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    width: "40%",
  });
  const StyleLinkImageSmallBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "4px 2px 0px",
    width: "100%",
    "&:hover": {
      transform: "scale(1.1)",
      backgroundColor: grey[300],
      cursor: "pointer",
    },
    "&:active": {
      transform: "scale(.95)",
      backgroundColor: grey[400],
    },
  });
  const StyleLinkImageBoxText = styled(Typography)({
    fontSize: "14px",
    fontWeight: 600,
    color: grey[800],
  });

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

  // QRcode
  const [qrcodeOpen, setQRcodeOpen] = React.useState(false);

  const qrCodeDialogOpenHandler = () => {
    setQRcodeOpen(true);
  };

  const onQRcodeOpen = (mode) => {
    setQRcodeOpen(mode);
  };

  const onQRcodeId = (id) => {
    onQRcodeNavId(id);
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "red",
          backgroundColor: "#FFF7EC",
          height: "100px",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ height: "100%" }}>
          <StyleSideStack>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton> */}
            <Link to={"/"}>
              <img src={"logo.png"} alt={"logo.png"} className="logo-img"></img>
            </Link>
          </StyleSideStack>

          <StyleSecondStack>
            {/* <Typography variant="h6">混料堆疊</Typography> */}
            <Link to={"/"}>
              <img
                src={"mixStackLogo.png"}
                alt={"mixStackLogo.png"}
                className="mixStackLogo-img"
              ></img>
            </Link>
          </StyleSecondStack>

          <StyleSideStack className="linkBox-img">
            {window.location.pathname === "/control-robot" ||
            window.location.pathname === "/control-robot-socket" ||
            window.location.pathname === "/create-orderlist" ? (
              <StyleLinkImageBox onClick={qrCodeDialogOpenHandler}>
                <Box sx={{ display: "inline-block" }}>
                  <StyleLinkImageSmallBox>
                    <img src={"qrcode.png"} alt={"qrcode.png"}></img>
                    <StyleLinkImageBoxText>QRcode</StyleLinkImageBoxText>
                  </StyleLinkImageSmallBox>
                </Box>
              </StyleLinkImageBox>
            ) : null}

            <QRcodeDialog
              qrcodeOpen={qrcodeOpen}
              onQRcodeOpen={onQRcodeOpen}
              onQRcodeId={onQRcodeId}
            ></QRcodeDialog>
            {/* 工單設定 工單查詢 */}
            <StyleLinkImageBox>
              <Link to={"/robot-control"}>
                <StyleLinkImageSmallBox>
                  <img
                    src={"workListSetting.png"}
                    alt={"workListSetting.png"}
                  ></img>
                  <StyleLinkImageBoxText>控制台</StyleLinkImageBoxText>
                </StyleLinkImageSmallBox>
              </Link>
            </StyleLinkImageBox>

            <StyleLinkImageBox>
              <Link to={"/demo1-select-item"}>
                <StyleLinkImageSmallBox>
                  <img
                    src={"workListSearch.png"}
                    alt={"workListSearch.png"}
                  ></img>
                  <StyleLinkImageBoxText>工單</StyleLinkImageBoxText>
                </StyleLinkImageSmallBox>
              </Link>
            </StyleLinkImageBox>
          </StyleSideStack>
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
