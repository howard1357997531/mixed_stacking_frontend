import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/nav/Navbar";
import HomeScreen from "./screen/HomeScreen";
import OrderScreen from "./screen/OrderScreen";
import CreateOrderListScreen from "./component/screen/CreateOrderListScreen";
import ControlRobotScreen_socket from "./component/screen/ControlRobotScreen_socket";
import RobotControlScreen from "./screen/RobotControlScreen";
import { useDispatch, useSelector } from "react-redux";
import { ROBOT_CONTROL_SCREEN } from "./redux/constants";
import { webSocketDomain } from "./env";
import {
  multipleOrderListAction,
  orderListAction,
} from "./redux/actions/OrderActions";
import { confirmSwal } from "./redux/actions/swal/RobotControlScreenActionSwal";
import { robotExecutionAlertAction } from "./redux/actions/RobotControlScreenAction";

function App() {
  const dispatch = useDispatch();
  const { data: orderSelectData } = useSelector(
    (state) => state.robotControlScreen_orderSelect
  );

  const { data: multipleOrderSelectData } = useSelector(
    (state) => state.robotControlScreen_multipleOrderSelect
  );

  const { mode: informationAreaMode } = useSelector(
    (state) => state.robotControlScreen_informationArea
  );

  const robotExecutionData = useSelector(
    (state) => state.robotControlScreen_robotExecutionList
  );

  const { mode: robotStateMode } = useSelector(
    (state) => state.robotControlScreen_robotState
  );

  const { mode: realtimeItemMode, count: realtimeItemCount } = useSelector(
    (state) => state.robotControlScreen_realtimeItem
  );

  const {
    mode: realtimeVisualMode,
    name: objectName,
    nextName: objectNextName,
  } = useSelector((state) => state.robotControlScreen_realtimeVisual);

  useEffect(() => {
    if (orderSelectData.length !== 0) {
      const orderList = orderSelectData.aiTraining_order.split(",");
      if (!realtimeItemCount) {
        dispatch({
          type: ROBOT_CONTROL_SCREEN.realtimeVisual,
          payload: { name: orderList[0], nextName: orderList[1] },
        });
      }
    }
  }, [dispatch, orderSelectData, realtimeItemCount]);

  // webSocket
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
          type: ROBOT_CONTROL_SCREEN.realtimeItem,
          payload: { count: realtimeData.count },
        });
      }

      if (realtimeData.name) {
        setTimeout(() => {
          dispatch({
            type: ROBOT_CONTROL_SCREEN.realtimeVisual,
            payload: {
              name: realtimeData.name,
              nextName: realtimeData.nextName,
            },
          });
        }, 600);
      }

      if (realtimeData.mode) {
        if (
          ["prepare", "operate", "reset", "finish"].includes(realtimeData.mode)
        ) {
          dispatch({
            type: ROBOT_CONTROL_SCREEN.robotState,
            payload: { mode: realtimeData.mode },
          });

          dispatch({
            type: ROBOT_CONTROL_SCREEN.realtimeItem,
            payload: { mode: realtimeData.mode },
          });
        } else {
          dispatch({
            type: ROBOT_CONTROL_SCREEN.realtimeVisual,
            payload: { mode: realtimeData.mode },
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

  useEffect(() => {
    dispatch(orderListAction());
    dispatch(multipleOrderListAction());
  }, [dispatch]);

  // robotExecutionAlert
  useEffect(() => {
    if (robotExecutionData.name.length !== 0) {
      setTimeout(() => {
        dispatch(
          robotExecutionAlertAction(multipleOrderSelectData, robotExecutionData)
        );
      }, 1000);
    }
  }, [robotExecutionData.queue]);

  const reduxData = {
    orderSelectData,
    informationAreaMode,
    robotStateMode,
    realtimeItemMode,
    realtimeItemCount,
    realtimeVisualMode,
    objectName,
    objectNextName,
  };

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
