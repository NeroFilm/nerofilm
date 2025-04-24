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
      <header>
        <nav>
          <Link to="/">NeroFilm</Link>
          <Link to="/frame-layout">
            <button className="btn-small">Enter Photobooth</button>
          </Link>
        </nav>
        <p>NeroFilm</p>
        <p>Cherish memories, relive moments</p>
      </header>
      <section className="hero">
        <Link to="frame-layout">
          <img src={photobooth} alt="photobooth" />
        </Link>
        <Link to="frame-layout">
          <img src={enterPhotobooth} alt="enter photobooth" />
        </Link>
        <Link to="privacy-policy">
          <img src={privacyPolicy} alt="privacy policy" />
        </Link>
        <Link to="about">
          <img src={aboutUs} alt="photobooth" />
        </Link>
      </section>
      <section className="home-section">
        <p>Decorate your place with special moments</p>
        <Link to="/frame-layout">
          <button className="btn-small">Enter Photobooth</button>
        </Link>
        <img src={fridge} alt="fridge with photobooth strip" />
      </section>
      <section className="home-section">
        <p>A wall full of your memories</p>
        <Link to="/frame-layout">
          <button className="btn-small">Enter Photobooth</button>
        </Link>
        <img src={wall} alt="wall with photobooth strip" />
      </section>

      <Footer />
      <img className="letter" src={letter} alt="letter" />
    </div>
  );
};

export default Home;
