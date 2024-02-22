import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Colors } from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const drawerBleeding = -130;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light" ? Colors.bgcolorLightorange : grey[800],
}));

const Puller = styled("div")(({ theme }) => ({
  marginTop: "8px",
  width: 40,
  height: 4,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  //   position: "absolute",
  //   top: 8,
  //   left: "calc(50% - 15px)",
}));

const RouteBox = styled(Box)({
  display: "flex",
  width: "100%",
  height: "50px",
});

const RouteImage = styled(Box)({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  marginRight: "20px",
});

const RouteName = styled(Box)({
  display: "flex",
  flex: 1,
  justifyContent: "space-between",
  alignItems: "center",
  color: Colors.greyTextBlood,
  fontWeight: 600,
  borderBottom: `1px solid ${Colors.grey300}`,
});

const RouteState = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "20px",
  padding: "3px 8px",
  color: Colors.bgcolorLightorange,
  fontSize: 14,
  fontWeight: 600,
  borderRadius: "30px",
});

const LogoImageBox = styled(Box)({
  position: "absolute",
  left: "50%",
  bottom: "15px",
  transform: "translateX(-50%)",
});

const routeData = [
  { name: "首頁", route: "/", image: "home_nav.png" },
  {
    name: "建立工單",
    route: "/order",
    image: "order_nav.png",
    state: "演算中",
    stateColor: Colors.blue500,
  },
  {
    name: "手臂控制台",
    route: "/robot-control",
    image: "robot_nav.png",
    state: "進行中",
    stateColor: Colors.darkGreen,
  },
  { name: "歷史紀錄", route: "/history", image: "history_nav.png" },
];

function SwipeableEdgeDrawer(props) {
  const navigate = useNavigate();
  const { isTraining } = useSelector((state) => state.orderScreen_orderSelect);
  const { mode: robotStateMode } = useSelector(
    (state) => state.robotControlScreen_robotState
  );
  const { window, open, closeOpen } = props;

  const toggleDrawer = (newOpen) => () => {
    closeOpen();
  };

  const routeBoxClickHandler = (route) => {
    closeOpen();
    navigate(route);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      {/* <CssBaseline /> */}
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -8,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            right: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <Puller />
        </StyledBox>
        <StyledBox
          sx={{
            position: "relative",
            paddingLeft: "20px",
            paddingTop: "10px",
            height: "100%",
            overflow: "auto",
          }}
        >
          {routeData.map((data) => (
            <RouteBox
              key={data.name}
              onClick={() => routeBoxClickHandler(data.route)}
            >
              <RouteImage>
                <img
                  src={data.image}
                  alt={data.image}
                  style={{ width: "25px", height: "25px" }}
                />
              </RouteImage>
              <RouteName>
                {data.name}
                {data.route === "/order" && isTraining ? (
                  <RouteState sx={{ backgroundColor: data.stateColor }}>
                    {data.state}
                  </RouteState>
                ) : null}

                {data.route === "/robot-control" &&
                !["inactivate", "reset", "success"].includes(robotStateMode) ? (
                  <RouteState sx={{ backgroundColor: data.stateColor }}>
                    {data.state}
                  </RouteState>
                ) : null}
              </RouteName>
            </RouteBox>
          ))}

          <LogoImageBox>
            <img
              src={"logo.png"}
              alt={"logo.png"}
              style={{ width: "120px", height: "45px" }}
            />
          </LogoImageBox>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SwipeableEdgeDrawer;
