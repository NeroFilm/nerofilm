import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import Header from "../components/Header"; 
import "../pages/Home.css"; 

const Home = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  return (
    <>
      <Header /> {/* Include Header */}
      <main className="home-container">
        <h1>Welcome to NeroFilm</h1>
        <h1 className="title">NeroFilm</h1>
        <p>No photobooth nearby?<br />Your camera is all you need</p>
        
        {/* Navigation Buttons */}
        <div className="home-buttons">
          <button className="home-button" onClick={() => navigate("/try-it")}>
            Try It
          </button>
          <button className="home-button" onClick={() => navigate("/camera")}>
            Open Camera
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
