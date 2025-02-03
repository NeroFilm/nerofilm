import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <h1>NeroFilm</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/try-it">Try It</Link></li>
        </ul>
      </nav>

      <h2>Welcome to NeroFilm</h2>
      <p>Click below to start using the camera feature.</p>
      <Link to="/try-it">
        <button className="start-button">Start Now</button>
      </Link>
    </div>
  );
};

export default Home;
