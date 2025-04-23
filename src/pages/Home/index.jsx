import { Link } from "react-router-dom";

import "./index.css";

import photobooth from "../../assets/photobooth.svg";
import fridge from "../../assets/fridge.svg";
import perfume from "../../assets/perfume.svg";
import homepic1 from "../../assets/homepic1.png";
import homepic2 from "../../assets/homepic2.png";
import privacyPolicy from "../../assets/privacypolicy.svg";
import key from "../../assets/key.svg";
import lock from "../../assets/lock.svg";
import enterPhotobooth from "../../assets/enterphotobooth.svg";
import oneway from "../../assets/oneway.svg";
import about from "../../assets/about.svg";
import bags from "../../assets/bags.svg";
import cattodolist from "../../assets/cattodolist.svg";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="home-container">
      <Header />

      <div className="hero">
        <div className="hero-heading">NeroFilm</div>
        <div className="hero-subheading">Cherish memories, relive moments</div>
      </div>

      <main className="content-container">
        <section className="photobooth-section">
          <div className="photobooth-left">
            <Link to="/privacy-policy">
              <img
                src={privacyPolicy}
                alt="Privacy Policy"
                className="icon-hover"
              />
            </Link>

            <div className="key-lock-row">
              <img src={key} alt="Key Icon" />
              <img src={lock} alt="Lock Icon" />
            </div>

            <Link to="/frame-layout">
              <img
                src={enterPhotobooth}
                alt="Enter Photobooth"
                className="icon-hover"
              />
            </Link>
            <img src={oneway} alt="One Way" />
          </div>

          <Link to="/frame-layout">
            <div className="booth">
              <img src={photobooth} alt="Photobooth" />
            </div>
          </Link>

          <div className="photobooth-right">
            <div className="about-section">
              <Link to="/about">
                <img
                  src={about}
                  alt="About"
                  className="about-label icon-hover"
                />
              </Link>
              <img src={homepic1} alt="homepic1" className="about-homepic1" />
              <img src={homepic2} alt="homepic2" className="about-homepic2" />
            </div>
          </div>
        </section>

        <section className="fridge-section">
          <div className="fridge-text">
            Decorate your place with special moments
          </div>

          <div className="fridge-container">
            <div className="fridge-photo-stack">
              <img
                src={homepic1}
                alt="Homepic 1"
                className="scroll-pic fridge-homepic1"
              />
              <img
                src={homepic2}
                alt="Homepic 2"
                className="scroll-pic fridge-homepic2"
              />
            </div>
            <img src={fridge} alt="Fridge" className="fridge-image" />
          </div>
        </section>

        <section className="perfume-section">
          <div className="perfume-left-column">
            <div className="perfume-top-row">
              <img
                src={cattodolist}
                alt="Cat to-do list"
                className="perfume-item1"
              />
              <img
                src={homepic1}
                alt="Homepic 1"
                className="scroll-pic perfume-item1-homepic1"
              />
              <img
                src={homepic2}
                alt="Homepic 2"
                className="scroll-pic perfume-item1-homepic2"
              />
            </div>
            <img src={perfume} alt="Perfume Shelf" className="perfume-item2" />
            <img src={bags} alt="Bags" className="perfume-item3" />
          </div>

          <div className="perfume-right-text">A wall full of your memories</div>
        </section>

        <div className="bottom-button">
          <Link to="/frame-layout">
            <img
              src={enterPhotobooth}
              alt="Enter Photobooth"
              className="icon-hover"
            />
          </Link>
          <img src={oneway} alt="One Way" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
