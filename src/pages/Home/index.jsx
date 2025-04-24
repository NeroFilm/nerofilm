import { Link } from "react-router-dom";

import "./index.css";

import photobooth from "../../assets/photobooth.png";
import fridge from "../../assets/fridge.svg";
import privacyPolicy from "../../assets/privacy-policy.svg";
import enterPhotobooth from "../../assets/enter-photobooth.svg";
import aboutUs from "../../assets/about-us.svg";
import wall from "../../assets/wall.svg";
import letter from "../../assets/letter.png";

import Footer from "../../components/Footer/Footer";

const Home = () => {
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
          <Link to="frame-layout">
            <img
              className="hero-img home-photobooth"
              src={photobooth}
              alt="photobooth"
            />
          </Link>
          <Link to="frame-layout">
            <img
              className="hero-img home-enter-photobooth"
              src={enterPhotobooth}
              alt="enter photobooth"
            />
          </Link>
          <Link to="privacy-policy">
            <img
              className="hero-img home-privacy-policy"
              src={privacyPolicy}
              alt="privacy policy"
            />
          </Link>
          <Link to="about">
            <img
              className="hero-img home-about-us"
              src={aboutUs}
              alt="photobooth"
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
