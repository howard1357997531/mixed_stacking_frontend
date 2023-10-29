import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/nav/Navbar";
import HomeScreen from "./screen/HomeScreen";
import OrderScreen from "./screen/OrderScreen";
import CreateOrderListScreen from "./component/screen/CreateOrderListScreen";
import ControlRobotScreen_socket from "./component/screen/ControlRobotScreen_socket";
import RobotControlScreen from "./screen/RobotControlScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  ROBOT_CONTROL_SCREEN_realtimeRobot,
  ROBOT_CONTROL_SCREEN_realtimeVisual,
  ROBOT_CONTROL_SCREEN_robotState,
} from "./redux/constants";
import { webSocketDomain } from "./env";

function App() {
  const dispatch = useDispatch();
  const { detail: orderSelectDetail } = useSelector(
    (state) => state.robotControlScreen_orderSelect
  );

  const { mode: robotStateMode } = useSelector(
    (state) => state.robotControlScreen_robotState
  );

  const { mode: realtimeRobotMode, count: realtimeRobotCount } = useSelector(
    (state) => state.robotControlScreen_realtimeRobot
  );

  const {
    mode: realtimeVisualMode,
    name: objectName,
    nextName: objectNextName,
  } = useSelector((state) => state.robotControlScreen_realtimeVisual);

  useEffect(() => {
    if (orderSelectDetail.length !== 0) {
      const orderList = orderSelectDetail.aiTraining_order.split(",");
      if (!realtimeRobotCount) {
        dispatch({
          type: ROBOT_CONTROL_SCREEN_realtimeVisual.name,
          payload: orderList[0],
        });

        dispatch({
          type: ROBOT_CONTROL_SCREEN_realtimeVisual.nextName,
          payload: orderList[1],
        });
      }
    }
  }, [dispatch, orderSelectDetail, realtimeRobotCount]);

  const reduxData = {
    orderSelectDetail,
    robotStateMode,
    realtimeRobotMode,
    realtimeRobotCount,
    realtimeVisualMode,
    objectName,
    objectNextName,
  };

  useEffect(() => {
    const socket = new WebSocket(
      `ws://${webSocketDomain}/ws/RobotControlConsumers/`
    );

    socket.onopen = () => {
      console.log("webSocket connect");
    };

    socket.onmessage = (event) => {
      const realtimeData = JSON.parse(event.data);

      console.log(event);
      if (realtimeData.count) {
        dispatch({
          type: ROBOT_CONTROL_SCREEN_realtimeRobot.count,
          payload: realtimeData.count,
        });
      }

      if (realtimeData.name) {
        setTimeout(() => {
          dispatch({
            type: ROBOT_CONTROL_SCREEN_realtimeVisual.name,
            payload: realtimeData.name,
          });

          dispatch({
            type: ROBOT_CONTROL_SCREEN_realtimeVisual.nextName,
            payload: realtimeData.nextName,
          });
        }, 600);
      }

      // if (realtimeData.nextName) {
      //   setTimeout(() => {
      //     dispatch({
      //       type: ROBOT_CONTROL_SCREEN_realtimeVisual.nextName,
      //       payload: realtimeData.nextName,
      //     });
      //   }, 600);
      // }

      if (realtimeData.mode) {
        if (
          realtimeData.mode === "prepare" ||
          realtimeData.mode === "operate"
        ) {
          dispatch({
            type: ROBOT_CONTROL_SCREEN_robotState.mode,
            payload: realtimeData.mode,
          });
          dispatch({
            type: ROBOT_CONTROL_SCREEN_realtimeRobot.mode,
            payload: realtimeData.mode,
          });
        } else {
          dispatch({
            type: ROBOT_CONTROL_SCREEN_realtimeVisual.mode,
            payload: realtimeData.mode,
          });
        }
      }
    };

    socket.onclose = (event) => {
      console.log("webSocket close: ", event);
    };

    return () => {
      socket.close();
    };
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/order" element={<OrderScreen />} />
        <Route path="/create-orderlist" element={<CreateOrderListScreen />} />
        <Route
          path="/robot-control"
          element={<RobotControlScreen {...reduxData} />}
        />
        <Route
          path="/control-robot-socket"
          element={<ControlRobotScreen_socket />}
        />
      </Routes>
    </Router>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./component/nav/Navbar";
// import HomeScreen from "./component/screen/HomeScreen";
// import ControlRobotScreen from "./component/screen/ControlRobotScreen";
// import ControlRobotScreen2 from "./component/screen/ControlRobotScreen2";
// import SelectItemScreen from "./component/screen/SelectItemScreen";
// import AiTrainingScreen from "./component/screen/AiTrainingScreen";
// import UploadFileScreen from "./component/screen/UploadFileScreen";
// import CreateOrderListScreen from "./component/screen/CreateOrderListScreen";
// import { useEffect, useState } from "react";
// import ControlRobotScreen_socket from "./component/screen/ControlRobotScreen_socket";

// function App() {
//   const [qrCodeId, setQRcodeId] = useState(null);

//   const onQRcodeNavId = (id) => {
//     setQRcodeId(id);
//   };

//   const onExecuteOtherQRcode = (data) => {
//     setQRcodeId(data);
//   };
//   console.log(qrCodeId);
//   return (
//     <Router>
//       <Navbar onQRcodeNavId={onQRcodeNavId} />
//       <Routes>
//         <Route path="/" element={<HomeScreen />} />
//         <Route path="/control-robot" element={<ControlRobotScreen />} />
//         <Route
//           path="/control-robot2"
//           element={
//             <ControlRobotScreen2
//               qrCodeId={qrCodeId}
//               onExecuteOtherQRcode={onExecuteOtherQRcode}
//             />
//           }
//         />
//         <Route
//           path="/control-robot-socket"
//           element={
//             <ControlRobotScreen_socket
//               qrCodeId={qrCodeId}
//               onExecuteOtherQRcode={onExecuteOtherQRcode}
//             />
//           }
//         />
//         <Route path="/select-item" element={<SelectItemScreen />} />
//         <Route path="/ai-training" element={<AiTrainingScreen />} />
//         <Route path="/upload-file" element={<UploadFileScreen />} />
//         <Route path="/create-orderlist" element={<CreateOrderListScreen />} />
//       </Routes>
//     </Router>
//   );
// }
