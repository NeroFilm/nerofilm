import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./TryIt.css"; 
import Catfilm from "../assets/Catfilm.png";
import Header from "../components/Header"; 

const TryIt = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <>
      <Header /> {/* Add the Header at the top */}
      <div className="tryit-container">
        <div className="try-it-screen">
          <img src={Catfilm} alt="Catfilm" className="catfilm-image" />
          <p><br /></p>
          <button className="start-button" onClick={() => navigate("/instructions")}>
            Start Now
          </button>
        </div>
      </div>
    </>
  );
};

export default TryIt;
