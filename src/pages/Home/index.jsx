import { useNavigate } from "react-router-dom"; // Import navigation hook
import Logo from "../../assets/LogoImage.png";
import Catfilm from "../../assets/Catfilm.png";
import Paw from "../../assets/Paw.png";
import Cut from "../../assets/Cutselection.png";
import Computer from "../../assets/ComputerView.png";
import Photo from "../../assets/PhotoSelection.png";
import Filter from "../../assets/AddFilter.png";
import Frame from "../../assets/FrameColor.png";
import Download from "../../assets/DownloadShare.png";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useEffect } from "react";
import "./index.css"; // Import the CSS file

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

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
            <img src={Logo} alt="NeroFilm Logo" className="home-logo" />
            <h3 className="home-subtitle">
              No photobooth nearby? <br /> Your camera is all you need
            </h3>
            <button className="home-button" onClick={() => navigate("/try-it")}>
              Try It Now!
            </button>
          </div>

          {/* Right Side Image */}
          <div className="home-right-content">
            <img src={Catfilm} alt="Cat Film" className="home-catfilm" />
          </div>
        </div>

        {/* Paw Image Below Everything */}
        <img src={Paw} alt="Paw Icon" className="home-paw" />

        {/* Cherish Memories, Relive Moments - Placed Below Everything */}
        <h3 className="home-cherish-memories">
          Cherish Memories <br /> Relive Moments
        </h3>

        {/* Select Frame Layout */}
        <h3 className="home-select-frame">Select Frame Layout</h3>

        {/* Cut Selection Image */}
        <img src={Cut} alt="Cut Icon" className="home-cut-selection" />

        {/* Capture the Moment */}
        <h3 className="home-capture-moment">Capture the Moment</h3>

        {/* Computer View Image */}
        <img src={Computer} alt="Computer Icon" className="home-computer-view" />

        {/* Select Photos */}
        <h3 className="home-select-photos">Select Photos</h3>

        {/* Photo Selection Image */}
        <img src={Photo} alt="Photo Icon" className="home-photo-selection" />

        {/* Add Filter */}
        <h3 className="home-add-filter">Add Filter</h3>

        {/* Add Filter Image */}
        <img src={Filter} alt="Filter Icon" className="home-filter" />

        {/* Frame Color */}
        <h3 className="home-frame-color">Add Frame Color</h3>

        {/* Frame Color Image */}
        <img src={Frame} alt="Frame Icon" className="home-frame" />

        {/* Download and Share */}
        <h3 className="home-download-share">
          Download & Share
          <br /> with Friends!
        </h3>

        {/* Download Image */}
        <img src={Download} alt="Download Icon" className="home-download" />

        <button className="home-button" onClick={() => navigate("/try-it")}>
          Try It Now!
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
