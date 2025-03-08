import { useNavigate } from "react-router-dom";
import Paw from "../../assets/Paw.png";
import Cut from "../../assets/Cutselection.png";
import Computer from "../../assets/ComputerView.png";
import Photo from "../../assets/PhotoSelection.png";
import Filter from "../../assets/AddFilter.png";
import Frame from "../../assets/FrameColor.png";
import Download from "../../assets/DownloadShare.png";
import HomePic1 from "../../assets/homepic1.png";
import HomePic2 from "../../assets/homepic2.png";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useEffect } from "react";
import "./index.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <div className="home-container">
        {/* Main Content */}
        <div className="home-main-content">
          {/* Left Side Content */}
          <div className="home-left-content">
            <h1 className="home-logo-text">NeroFilm</h1>
            <p className="home-slogan">
              No photobooth nearby? <br /> Your camera is all you need
            </p>
            <button
              className="global-button"
              onClick={() => navigate("/frame-layout")}
            >
              Try It Now!
            </button>
          </div>

          {/* Right Side Images */}
          <div className="home-right-content">
            <img src={HomePic1} alt="HomePic1" className="home-image1" />
            <img src={HomePic2} alt="HomePic2" className="home-image2" />
          </div>
        </div>

        {/* Decorative Paw Image */}
        <div className="home-paw-container">
          <img src={Paw} alt="Paw Icon" className="home-paw" />
        </div>

        {/* Sections */}
        <div className="home-sections">
          <h3 className="home-heading-1">
            Cherish Memories <br /> Relive Moments
          </h3>

          <div className="home-section">
            <h3 className="home-heading-2">Select Frame Layout</h3>
            <img src={Cut} alt="Cut Icon" className="home-large-image" />
          </div>

          <div className="home-section">
            <h3 className="home-heading-2">Capture the Moment</h3>
            <img
              src={Computer}
              alt="Computer Icon"
              className="home-large-image"
            />
          </div>

          <div className="home-section">
            <h3 className="home-heading-2">Select Photos</h3>
            <img src={Photo} alt="Photo Icon" className="home-large-image" />
          </div>

          <div className="home-section">
            <h3 className="home-heading-2">Add Filter</h3>
            <img src={Filter} alt="Filter Icon" className="home-large-image" />
          </div>

          <div className="home-section">
            <h3 className="home-heading-2">Add Frame Color</h3>
            <img src={Frame} alt="Frame Icon" className="home-large-image" />
          </div>

          <div className="home-section">
            <h3 className="home-heading-2">
              Download & Share <br /> with Friends!
            </h3>
            <img
              src={Download}
              alt="Download Icon"
              className="home-large-image"
            />
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="home-button-container">
          <button
            className="global-button"
            onClick={() => navigate("/frame-layout")}
          >
            Try It Now!
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
