import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <div className="about-privacy-container">
        <div className="about-privacy-wrapper">
          <div className="about-privacy-text-section">
            <h1 className="about-privacy-heading">Privacy Policy</h1>
            <p className="about-privacy-paragraph">
              At NeroFilm, your privacy comes first. We don’t track, collect, or
              store your data. Everything you create stays on your device, and
              nothing is uploaded or shared.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
