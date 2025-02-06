import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";  // Import the Header component
import Home from "./pages/Home"; 
import TryIt from "./pages/TryIt";
import Instructions from "./pages/Instructions"
import CameraAccess from "./pages/CameraAccess";

const AboutUs = () => <h1>About Us Page</h1>;

const App = () => {
  return (
    <Router>
      <Header /> {/* This will display the Header at the top */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/try-it" element={<TryIt />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/camera" element={<CameraAccess />} />
      </Routes>
    </Router>
  );
};

export default App;
