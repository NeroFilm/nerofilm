import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { FrameProvider } from "./hooks/FrameContext";
import Instructions from "./pages/Instructions";
import AboutUs from "./pages/AboutUs";
import SelectFrame from "./pages/SelectFrame";
import AddFilter from "./pages/AddFilter";
import ChooseFrame from "./pages/ChooseFrame";
import Download from "./pages/Download";
import CameraAccess from "./pages/CameraAccess";
import SelectPhotos from "./pages/SelectPhotos";
import "./styles/global.css";

const App = () => {
  return (
    <FrameProvider>
      <HashRouter basename="/nerofilm">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/select-frame" element={<SelectFrame />} />
          <Route path="/camera" element={<CameraAccess />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/select-photos" element={<SelectPhotos />} />
          <Route path="/choose-frame" element={<ChooseFrame />} />
          <Route path="/add-filter" element={<AddFilter />} />
          <Route path="/download" element={<Download />} />
        </Routes>
      </HashRouter>
    </FrameProvider>
  );
};

export default App;
