import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 50px",
      width: "100%",
      backgroundColor: "white",
      color: "black",
      boxSizing: "border-box",
    }}>
      {/* Brand Name */}
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>NeroFilm</div>
      
      {/* Navigation */}
      <nav>
        <ul style={{
          listStyle: "none",
          display: "flex",
          gap: "20px",
          margin: 0,
          padding: 0,
        }}>
          <li><Link to="/" style={{ textDecoration: "none", color: "black", fontSize: "18px" }}>Home</Link></li>
          <li><Link to="/try-it" style={{ textDecoration: "none", color: "black", fontSize: "18px" }}>Try It</Link></li>
          <li><Link to="/about-us" style={{ textDecoration: "none", color: "black", fontSize: "18px" }}>About Us</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
