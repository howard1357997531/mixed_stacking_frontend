import { useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import RobotControlDesktop from "../component/screens/RobotControlScreen/RobotControlDesktop";
import { useDispatch } from "react-redux";
import { orderListAction } from "../redux/actions/OrderActions";

function RobotControlScreen(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  // useEffect(() => {
  //   dispatch(orderListAction());
  // }, [dispatch]);

  return (
    <>
      {matches ? (
        <RobotControlDesktop matches={matches} {...props} />
      ) : (
        <RobotControlDesktop matches={matches} {...props} />
      )}
    </>
  );
}

export default RobotControlScreen;
