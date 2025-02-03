import React from "react";
import Header from "../components/Header"; // Import the Header
import "../pages/Home.css"; // Import the Home-specific styles

const Home = () => {
  return (
    <>
      <Header /> {/* Include Header */}
      <main className="home-container">
        <h1>Welcome to NeroFilm</h1>
        <h1 className="title">NeroFilm</h1>
          <p>No photobooth nearby?<br />Your camera is all you need</p>
      </main>
    </>
  );
};

export default Home;
