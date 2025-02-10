import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import Logo from "../assets/LogoImage.png";
import Catfilm from "../assets/Catfilm.png";
import Paw from "../assets/Paw.png";
import Cut from "../assets/Cutselection.png";
import Computer from "../assets/ComputerView.png";
import Photo from "../assets/PhotoSelection.png";
import Filter from "../assets/AddFilter.png";
import Frame from "../assets/FrameColor.png";
import Download from "../assets/DownloadShare.png";
import Logo from "../assets/Logobig.png";
import Catfilm from "../assets/Catfilm.png";
import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div style={{
      fontFamily: "'Itim', cursive",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      width: "100vw",
      textAlign: "center",
      marginTop: "350px",
    }}>
      {/* Main Content */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
        maxWidth: "1200px",
      }}>
        {/* Left Side Content */}
        <div style={{ textAlign: "center", flex: 1 }}> 
          <img src={Logo} alt="NeroFilm Logo" style={{ width: "540px", marginTop: "-300px",}} />
          <h3 style={{ fontSize: "32px", color: "#5A5858", marginBottom: "20px" }}>
            No photobooth nearby? <br /> Your camera is all you need
          </h3>
          <button 
            onClick={() => navigate("/try-it")}
            style={{
              padding: "10px 20px",
              fontSize: "28px",
              backgroundColor: "#FFE8F8",
              border: "none",
              borderRadius: "10px",
              boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              color: "#5A5858",
              marginTop: "30px"
            }}>
            Try It Now!
          <button style={{
            padding: "10px 20px",
            fontSize: "24px",
            backgroundColor: "#f8d7e2",
            border: "none",
            borderRadius: "10px",
            boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            marginTop: "10px"
          }}>
            <Link to="/try-it">Try it now</Link>
          </button>
        </div>

        {/* Right Side Image */}
        <div style={{ 
          flex: 1, 
          display: "flex", 
          justifyContent: "center",
          marginTop: "-150px",
          }}>
          <img src={Catfilm} alt="Cat Film" 
          style={{ 
            width: "100%", 
            maxWidth: "320px" 
            }} />
        </div>
      </div>

      {/* Paw Image Below Everything */}
      <img 
        src={Paw} 
        alt="Paw Icon" 
        style={{
          width: "1200px",
          opacity: 0.8,
          marginTop: "90px", // Pushes Paw Image down naturally
        }} 
      />

      {/* Cherish Memories, Relive Moments - Placed Below Everything */}
      <h3 style={{
        fontSize: "56px",
        color: "#8096C3",
        marginTop: "70px", // Adds spacing under the Paw image
      }}>
        Cherish Memories <br /> Relive Moments
      </h3>

      {/* Select Frame Layout */}
      <h3 style={{
        fontSize: "48px",
        color: "#5A5858",
        marginTop: "70px", 
      }}>
        Select Frame Layout
      </h3>

      {/* Cut Selection Image */}
      <img 
        src={Cut} 
        alt="Cut Icon" 
        style={{
          width: "1000px",
          marginTop: "30px", 
        }} 
      />

      {/* Capture the Moment */}
      <h3 style={{
        fontSize: "48px",
        color: "#5A5858",
        marginTop: "90px", 
      }}>
        Capture the Moment
      </h3>

      {/* Computer View Image */}
      <img 
        src={Computer} 
        alt="Computer Icon" 
        style={{
          width: "1000px",
          marginTop: "30px", 
        }} 
      />

      {/* Select Photos */}
      <h3 style={{
        fontSize: "48px",
        color: "#5A5858",
        marginTop: "90px", 
      }}>
        Select Photos
      </h3>

      {/* Photo Selection Image */}
      <img 
        src={Photo} 
        alt="Photo Icon" 
        style={{
          width: "1000px",
          marginTop: "30px", 
        }} 
      />

      {/* Add Filter */}
      <h3 style={{
        fontSize: "48px",
        color: "#5A5858",
        marginTop: "90px", 
      }}>
        Add Filter
      </h3>

      {/* Add Filter Image */}
      <img 
        src={Filter} 
        alt="Filter Icon" 
        style={{
          width: "1000px",
          marginTop: "30px", 
        }} 
      />


      {/* Frame Color */}
      <h3 style={{
        fontSize: "48px",
        color: "#5A5858",
        marginTop: "90px", 
      }}>
        Add Frame Color
      </h3>

      {/* Frame Color Image */}
      <img 
        src={Frame} 
        alt="Frame Icon" 
        style={{
          width: "1000px",
          marginTop: "30px", 
        }} 
      />

      {/* Download and Share */}
      <h3 style={{
        fontSize: "48px",
        color: "#5A5858",
        marginTop: "90px", 
        textAlign: "center",
      }}>
        Download & Share
        <br /> with Friends! 

      </h3>

      {/* Frame Color Image */}
      <img 
        src={Download} 
        alt="Download Icon" 
        style={{
          width: "1000px",
          marginTop: "30px", 
        }} 
      />

      {/* ADDITIONAL "TRY IT NOW!" BUTTON AT THE BOTTOM */}
      <button 
        onClick={() => navigate("/try-it")}
        style={{
          padding: "10px 20px",
          fontSize: "28px",
          backgroundColor: "#FFE8F8",
          border: "none",
          borderRadius: "10px",
          boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
          color: "#5A5858",
          marginTop: "50px", // Adds space before the button
          marginBottom: "100px" // Ensures space at the bottom of the page
        }}>
        Try It Now!
      </button>


    </div>
  );
};

export default Home;
