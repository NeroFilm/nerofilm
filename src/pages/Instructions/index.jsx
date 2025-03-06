import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import BackHeader from "../../components/BackHeader/BackHeader";
import WatchIcon from "../../assets/WatchIcon.png";
import CamIcon from "../../assets/CamIcon.png";
import GalleryIcon from "../../assets/GalleryIcon.png";
import SettingsIcon from "../../assets/SettingsIcon.png";

const Instructions = () => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  return (
    <div>
      <BackHeader />
      <div className="instruction-box">
        <div className="texts-box">
          <h2>Before Taking Your Photos</h2>

          <ul className="instructions">
            <li>
              <img src={WatchIcon} alt="Watch Icon" className="icons" />
              The timer is set for 5 seconds
            </li>

            <li>
              <img src={CamIcon} alt="Camera Icon" className="icons" />
              Press the button to start the shoot
            </li>

            <li>
              <img src={GalleryIcon} alt="Gallery Icon" className="icons" />
              You'll get 8 photos—pick your favorite 4!
            </li>

            <li>
              <img src={SettingsIcon} alt="Settings Icon" className="icons" />
              Enable camera access in settings if needed
            </li>
          </ul>

          <div className="checkbox">
            <input
              type="checkbox"
              id="dont-show-again"
              checked={dontShowAgain}
              onChange={() => setDontShowAgain(!dontShowAgain)}
            />
            <label htmlFor="dont-show-again">Do not show this page again</label>
          </div>
          <Link className="btn btn-inverted" to="/camera">
            I’m Ready!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
