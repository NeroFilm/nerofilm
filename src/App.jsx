import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { FrameProvider } from "./context/FrameProvider";
import About from "./pages/About";
import FrameLayout from "./pages/FrameLayout";
import Filter from "./pages/Filter";
import FrameDesign from "./pages/FrameDesign";
import Download from "./pages/Download";
import Camera from "./pages/Camera";
import PhotoSelection from "./pages/PhotoSelection";
import "./styles/global.css";
import Sticker from "./pages/Sticker";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Timelapse from "./pages/Timelapse";

const App = () => {
  return (
    <FrameProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/frame-layout" element={<FrameLayout />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/photo-selection" element={<PhotoSelection />} />
          <Route path="/frame-design" element={<FrameDesign />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/sticker" element={<Sticker />} />
          <Route path="/download" element={<Download />} />
          <Route path="/timelapse" element={<Timelapse />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </HashRouter>
    </FrameProvider>
  );
};

export default App;
