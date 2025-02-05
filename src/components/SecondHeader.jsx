import React from "react";
import { useNavigate } from "react-router-dom";
import BlackBackArrow from "../assets/BlackBackArrow.png"; 

const SecondHeader = () => {
  const navigate = useNavigate(); 

  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 30px", 
      width: "100vw",
      backgroundColor: "white",
      color: "black",
      boxSizing: "border-box",
    }}>
      
      {/* Brand Name */}
      <button 
        onClick={() => navigate("/")}
        style={{ 
          background: "none", 
          border: "none", 
          cursor: "pointer", 
          fontSize: "24px", 
          fontWeight: "bold", 
          color: "black" 
        }}
      >
        NeroFilm
      </button>
      
      {/* Back Arrow Button */}
      <button 
        onClick={() => navigate(-1)} // nav back one step in history
        style={{ 
          background: "none", 
          border: "none", 
          cursor: "pointer", 
          padding: 0 
        }}
      >
        <img src={BlackBackArrow} alt="Back Arrow" className="icon" />
      </button>

    </header>
  );
};

export default SecondHeader;
