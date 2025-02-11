import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import { FrameProvider } from "./hooks/FrameContext";
import TryIt from "./pages/TryIt"
import Instructions from "./pages/Instructions";
import AboutUs from "./pages/AboutUs";
import SelectFrame from "./pages/SelectFrame";
import AddFilter from "./pages/AddFilter";
import ChooseFrame from "./pages/ChooseFrame";
import Download from "./pages/Download";
import CameraAccess from "./pages/CameraAccess";
import "./styles/global.css" 

const App = () => {
  return (
    <FrameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/try-it" element={<TryIt />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/select-frame" element={<SelectFrame />} />
          <Route path="/add-filter" element={<AddFilter />} />
          <Route path="/choose-frame" element={<ChooseFrame />} />
          <Route path="/download" element={<Download />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/camera" element={<CameraAccess />} /> 
        </Routes>
      </Router>
    </FrameProvider>
  );
};

export default App;
