import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";  // Import the Header component
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";

const TryIt = () => <h1>Try It Page</h1>;

const App = () => {
  return (
    <Router>
      <Header /> {/* This will display the Header at the top */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/try-it" element={<TryIt />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
};

export default App;
