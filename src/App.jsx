import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";  // Import the Header component
import Home from "./pages/Home";
import TryIt from "./pages/TryIt";
import Instructions from "./pages/Instructions";
import AboutUs from "./pages/AboutUs";
import SelectFrame from "./pages/SelectFrame";
import { FrameProvider } from "./hooks/FrameContext";
import AddFilter from "./pages/AddFilter";
import ChooseFrame from "./pages/ChooseFrame";
import Download from "./pages/Download";
import CameraAccess from "./pages/CameraAccess";  // Added from local version

const App = () => {
  return (
    <FrameProvider>
      <Router>
        <Header /> {/* This will display the Header at the top */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/try-it" element={<TryIt />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/select-frame" element={<SelectFrame />} />
          <Route path="/add-filter" element={<AddFilter />} />
          <Route path="/choose-frame" element={<ChooseFrame />} />
          <Route path="/download" element={<Download />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/camera" element={<CameraAccess />} /> {/* Ensure CameraAccess is included */}
        </Routes>
      </Router>
    </FrameProvider>
  );
};

export default App;
