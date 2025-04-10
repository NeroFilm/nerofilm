import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <div className="about-privacy-container">
        <div className="about-privacy-wrapper">
          <div className="about-privacy-text-section">
            <h1 className="about-privacy-heading">ABOUT US</h1>

            <div className="about-privacy-text-container">
              <p className="about-privacy-paragraph">
                Bridging the past and present, we bring the classic photobooth
                experience into the digital age&mdash;no bulky setups, just your
                device&apos;s camera.
              </p>

              <p className="about-privacy-paragraph">
                With photobooths rising in popularity, we&apos;re making them
                more accessible than ever.
              </p>

              <p className="about-privacy-paragraph">
                Whether you&apos;re a small business looking to attract
                customers or someone without a photobooth nearby, our platform
                lets you capture the fun anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
