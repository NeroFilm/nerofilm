import React, { useState } from "react";
import CameraAccess from "../components/CameraAccess";
import "./TryIt.css"; 
import Catfilm from "../assets/Catfilm.png";
import Header from "../components/Header"; // Import Header component

const TryIt = () => {
  const [showCamera, setShowCamera] = useState(false);

  return (
    <>
      <Header /> {/* Add the Header at the top */}
      <div className="tryit-container">
        {showCamera ? (
          <CameraAccess />
        ) : (
          <div className="try-it-screen">
            <img src={Catfilm} alt="Catfilm" className="catfilm-image" />
            <p>No photobooth nearby?<br />Your camera is all you need</p>
            <button className="start-button" onClick={() => setShowCamera(true)}>
              Start Now
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TryIt;
