import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";  // Import the Header component
import Footer from "./components/Footer";  // Import the Footer component
import Home from "./pages/Home"; 

const AboutUs = () => <h1>About Us Page</h1>;
const TryIt = () => <h1>Try It Page</h1>;

const App = () => {
  return (
    <Router>
      <div style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",  // Ensures content expands properly
      }}>
        <Header /> {/* Header stays at the top */}

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/try-it" element={<TryIt />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </div>

        <Footer /> {/* Footer stays at the bottom */}
      </div>
    </Router>
=======
import { FrameProvider } from "./hooks/FrameContext";
import Header from "./components/Header";  
import Home from "./pages/Home";
import TryIt from "./pages/TryIt";
import Instructions from "./pages/Instructions";
import AboutUs from "./pages/AboutUs";
import SelectFrame from "./pages/SelectFrame";
import AddFilter from "./pages/AddFilter";
import ChooseFrame from "./pages/ChooseFrame";
import Download from "./pages/Download";
import CameraAccess from "./pages/CameraAccess";  

const App = () => {
  return (
    <FrameProvider>
      <Router>
        <Header /> 
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
