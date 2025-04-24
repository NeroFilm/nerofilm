import { Link } from "react-router-dom";

import "./index.css";

import photobooth from "../../assets/photobooth.svg";
import fridge from "../../assets/fridge.svg";
import privacyPolicy from "../../assets/privacy-policy.svg";
import enterPhotobooth from "../../assets/enter-photobooth.svg";
import aboutUs from "../../assets/about-us.svg";
import wall from "../../assets/wall.svg";
import letter from "../../assets/letter.png";

import Footer from "../../components/Footer/Footer";
import { useEffect } from "react";

const Home = () => {
  // cursor label
  useEffect(() => {
    const label = document.createElement("div");
    label.className = "hero-cursor-label";
    document.body.appendChild(label);

    let mouseX = 0,
      mouseY = 0;
    let labelX = 0,
      labelY = 0;

    const moveHandler = (e) => {
      const target = e.target.closest(".hero-img");
      if (target && target.dataset.label) {
        label.textContent = target.dataset.label;
        mouseX = e.clientX + 24;
        mouseY = e.clientY + 16;
        label.style.opacity = "1";
      } else {
        label.style.opacity = "0";
      }
    };

    const updateLabelPosition = () => {
      const dx = mouseX - labelX;
      const dy = mouseY - labelY;
      const smoothing = 8;
      labelX += dx / smoothing;
      labelY += dy / smoothing;

      label.style.left = `${labelX}px`;
      label.style.top = `${labelY}px`;

      requestAnimationFrame(updateLabelPosition);
    };

    document.addEventListener("mousemove", moveHandler);
    updateLabelPosition();

    return () => {
      document.removeEventListener("mousemove", moveHandler);
      document.body.removeChild(label);
    };
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <nav className="home-nav">
          <Link to="/">NeroFilm</Link>
          <Link to="/frame-layout">
            <button className="btn-small">Enter Photobooth</button>
          </Link>
        </nav>
        <div className="home-header-text">
          <p className="home-header-name">NeroFilm</p>
          <p className="home-header-desc">Cherish memories, relive moments</p>
        </div>
      </header>
      <main className="home-main">
        <section className="home-hero">
          <div className="hero-photobooth-container">
            <Link to="frame-layout">
              <img
                className="hero-img hero-photobooth"
                src={photobooth}
                alt="photobooth"
                data-label="Enter photobooth"
              />
            </Link>
          </div>
          <Link to="frame-layout">
            <img
              className="hero-img hero-enter-photobooth"
              src={enterPhotobooth}
              alt="enter photobooth"
              data-label="Enter photobooth"
            />
          </Link>
          <Link to="privacy-policy">
            <img
              className="hero-img hero-privacy-policy"
              src={privacyPolicy}
              alt="privacy policy"
              data-label="Privacy policy"
            />
          </Link>
          <Link to="about-us">
            <img
              className="hero-img hero-about-us"
              src={aboutUs}
              alt="about us"
              data-label="About us"
            />
          </Link>
        </section>
        <section className="home-section">
          <div>
            <p className="home-section-text">
              Decorate your place with special moments
            </p>
            <Link to="/frame-layout">
              <button className="btn-small">Enter Photobooth</button>
            </Link>
          </div>
          <img src={fridge} alt="fridge with photobooth strip" />
        </section>
        <section className="home-section">
          <img src={wall} alt="wall with photobooth strip" />
          <div>
            <p className="home-section-text">A wall full of your memories</p>
            <Link to="/frame-layout">
              <button className="btn-small">Enter Photobooth</button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <img className="home-letter" src={letter} alt="letter" />
    </div>
  );
};

export default Home;
