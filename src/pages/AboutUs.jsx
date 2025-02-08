import CatFilmImage from '../assets/Catfilm.png';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-content-wrapper">
        {/* Left content section */}
        <div className="about-text-section">
          <h1 className="about-heading">
            WHO ARE WE
          </h1>

          <div className="about-text-container">
            <p className="about-paragraph">
              Bridging the past and present, we bring the classic photobooth experience into the 
              digital age—no bulky setups, just your device's camera.
            </p>

            <p className="about-paragraph">
              With photobooths rising in popularity, we're making them more accessible than ever.
            </p>

            <p className="about-paragraph">
              Whether you're a small business looking to attract customers or someone without a 
              photobooth nearby, our platform lets you capture the fun anytime, anywhere.
            </p>
          </div>
        </div>

        {/* Right image section */}
        <div className="about-image-section">
          <img 
            src={CatFilmImage} 
            alt="Cat Film Frame"
            className="about-image"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
