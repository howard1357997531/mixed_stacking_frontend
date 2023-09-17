import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/nav/Navbar";
import HomeScreen from "./component/screen/HomeScreen";
import ControlRobotScreen from "./component/screen/ControlRobotScreen";
import SelectItemScreen from "./component/screen/SelectItemScreen";
import AiTrainingScreen from "./component/screen/AiTrainingScreen";
import UploadFileScreen from "./component/screen/UploadFileScreen";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/control-robot" element={<ControlRobotScreen />} />
        <Route path="/select-item" element={<SelectItemScreen />} />
        <Route path="/ai-training" element={<AiTrainingScreen />} />
        <Route path="/upload-file" element={<UploadFileScreen/>} />
      </Routes>
    </Router>
  );
}

export default App;
