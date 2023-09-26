import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/nav/Navbar";
import HomeScreen from "./component/screen/HomeScreen";
import ControlRobotScreen from "./component/screen/ControlRobotScreen";
import ControlRobotScreen2 from "./component/screen/ControlRobotScreen2";
import SelectItemScreen from "./component/screen/SelectItemScreen";
import AiTrainingScreen from "./component/screen/AiTrainingScreen";
import UploadFileScreen from "./component/screen/UploadFileScreen";
import CreateOrderListScreen from "./component/screen/CreateOrderListScreen";
import { useEffect, useState } from "react";

function App() {
  const [qrCodeId, setQRcodeId] = useState(null);

  const onQRcodeNavId = (id) => {
    setQRcodeId(id);
  };

  const onExecuteOtherQRcode = (data) => {
    setQRcodeId(data);
  };
  console.log(qrCodeId);
  return (
    <Router>
      <Navbar onQRcodeNavId={onQRcodeNavId} />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/control-robot" element={<ControlRobotScreen />} />
        <Route
          path="/control-robot2"
          element={
            <ControlRobotScreen2
              qrCodeId={qrCodeId}
              onExecuteOtherQRcode={onExecuteOtherQRcode}
            />
          }
        />
        <Route path="/select-item" element={<SelectItemScreen />} />
        <Route path="/ai-training" element={<AiTrainingScreen />} />
        <Route path="/upload-file" element={<UploadFileScreen />} />
        <Route path="/create-orderlist" element={<CreateOrderListScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
