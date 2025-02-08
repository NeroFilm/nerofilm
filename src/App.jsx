import React from "react";
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
  );
};

export default App;
