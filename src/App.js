import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/nav/Navbar";
import HomeScreen from "./screen/HomeScreen";
import OrderScreen from "./screen/OrderScreen";
import CreateOrderListScreen from "./component/screen/CreateOrderListScreen";
import ControlRobotScreen_socket from "./component/screen/ControlRobotScreen_socket";
import RobotControlScreen from "./screen/RobotControlScreen";
import HistoryScreen from "./screen/HistoryScreen";
import { useDispatch, useSelector } from "react-redux";
import { ROBOT_CONTROL_SCREEN } from "./redux/constants";
import { webSocketDomain } from "./env";
import {
  multipleOrderListAction,
  orderListAction,
} from "./redux/actions/OrderActions";
import {
  executeRobotFinishAction,
  hasNextExecutionOrderAction,
  robotExecutionAlertAction,
} from "./redux/actions/RobotControlScreenAction";
import Demo1SelectItemsScreen from "./screen/Demo1SelectItemsScreen";

function App() {
  const dispatch = useDispatch();
  const { data: orderSelectData } = useSelector(
    (state) => state.robotControlScreen_orderSelect
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
    visualResult: realtimeVisualResult,
    visualCount: realtimeVisualCount,
  } = useSelector((state) => state.robotControlScreen_realtimeVisual);

  // box1 slider
  // 為了slider可以穩定輸出
  // 第一個物件和下一個物件名稱一開始就會顯示(robot_mode=activate && !realtimeItemMode)
  // 後台不會用websocket回傳第一個物件和第一個物件下一個名稱，會從第二個開始回傳
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

      // console.log("websocket: ", realtimeData);
      if (realtimeData.count) {
        dispatch({
          type: ROBOT_CONTROL_SCREEN.realtimeItem,
          payload: { count: realtimeData.count },
        });
      }

      if (realtimeData.mode) {
        if (
          [
            "prepare",
            "operate",
            "reset",
            "finish",
            "buffer",
            "buffer_to_main",
          ].includes(realtimeData.mode)
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
          // 當 count=最後數時不顯示mode="detect"

          dispatch({
            type: ROBOT_CONTROL_SCREEN.realtimeVisual,
            payload: { mode: realtimeData.mode },
          });
        }
      }

      if (realtimeData.visual_result) {
        // dispatch({
        //   type: ROBOT_CONTROL_SCREEN.realtimeVisual,
        //   payload: { visualResult: realtimeData.visual_result },
        // });
        // console.log(realtimeData.visual_result);

        dispatch({
          type: ROBOT_CONTROL_SCREEN.realtimeVisual_demo3,
          payload: {
            visualResult: realtimeData.visual_result,
            checkNumberlist: realtimeData.check_numberlist,
          },
        });
        console.log("websocket: ", {
          visualResult: realtimeData.visual_result,
          visualCount: realtimeData.visual_count,
          bufferOrder: realtimeData.buffer_order,
          checkNumberlist: realtimeData.check_numberlist,
        });
      }

      if (realtimeData.bufferquanlity) {
        dispatch({
          type: ROBOT_CONTROL_SCREEN.realtimeVisual_demo3,
          payload: {
            bufferquanlity: realtimeData.bufferquanlity,
          },
        });
        // console.log("websocket: ", {
        //   bufferquanlity: realtimeData.bufferquanlity,
        // });
      }

      if (realtimeData.visual_count) {
        dispatch({
          type: ROBOT_CONTROL_SCREEN.realtimeVisual,
          payload: { visualCount: realtimeData.visual_count },
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
    };

    socket.onclose = (event) => {
      console.log("webSocket close: ", event);
    };

    return () => {
      socket.close();
    };
  }, [dispatch]);

  // loading orderList and multipleOrderList
  useEffect(() => {
    dispatch(orderListAction());
    dispatch(multipleOrderListAction());
  }, [dispatch]);

  // robotExecutionAlert
  useEffect(() => {
    if (robotExecutionData.check) {
      dispatch({
        type: ROBOT_CONTROL_SCREEN.robotExecutionList,
        payload: { check: false },
      });

      if (
        robotExecutionData.name.length > 1 &&
        robotExecutionData.name.length > robotExecutionData.queue
      ) {
        dispatch(hasNextExecutionOrderAction(robotExecutionData));

        setTimeout(() => {
          dispatch(robotExecutionAlertAction(robotExecutionData));
        }, 2000);
      } else {
        dispatch(executeRobotFinishAction(robotExecutionData));
      }
    }
  }, [robotExecutionData.check]);

  const reduxData = {
    orderSelectData,
    informationAreaMode,
    robotStateMode,
    realtimeItemMode,
    realtimeItemCount,
    realtimeVisualMode,
    realtimeVisualResult,
    realtimeVisualCount,
    objectName,
    objectNextName,
    robotExecutionData,
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
        <Route path="/demo1-select-item" element={<Demo1SelectItemsScreen />} />
        <Route path="/history" element={<HistoryScreen />} />
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
