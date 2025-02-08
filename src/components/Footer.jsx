import React from "react";
import Logo from "../assets/Logoimage.png"; // Import the logo image

const Footer = () => {
  return (
    <footer style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 80px",
      backgroundColor: "#FEF9ED", // Light cream background
      borderTop: "1px solid #ccc",
      fontFamily: "'Itim', cursive",
    }}>
      {/* Left Side - Logo */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={Logo} alt="NeroFilm Logo" style={{ height: "60px" }} />
      </div>

      {/* Right Side - Contact Info */}
      <div style={{ textAlign: "right" }}>
        <h3 style={{ fontSize: "20px", color: "#5A5858", marginBottom: "5px" }}>Contact</h3>
        <p style={{ fontSize: "16px", color: "#5A5858" }}>nerofilm.official@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;
