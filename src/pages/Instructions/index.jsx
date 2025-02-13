import { useState } from "react";
import "./index.css"; 
import { useNavigate } from "react-router-dom"; 
import BackHeader from "../../components/BackHeader/BackHeader";
import BlackBackArrrow from "../../assets/BlackBackArrow.png";
import WatchIcon from "../../assets/WatchIcon.png";
import CamIcon from "../../assets/CamIcon.png";
import GalleryIcon from "../../assets/GalleryIcon.png";
import SettingsIcon from "../../assets/SettingsIcon.png";
import CheckboxUnchecked from "../../assets/Checkbox.png";
import CheckboxChecked from "../../assets/CheckboxChecked.png";
import useRefreshWarning from "../../hooks/useRefreshWarning";

const Instructions = ({ onClose }) => {
  useRefreshWarning();
  
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="instructions-page">
      {/* Header at the top */}
      <BackHeader />

      <div className="instructions-overlay">
        <div className="instructions-container">
          {/* Popup Box */}
          <div className="instructions-popup">
            {/* Back Button */}
            <button
              className="back-button"
              onClick={() => navigate("/select-frame")}
            >
              <img src={BlackBackArrrow} alt="Back" className="back-icon" />
            </button>

            {/* Header */}
            <h2>Before Taking Your Photos</h2>

            {/* Instructions List */}
            <ul className="instructions-list">
              <li className="instructions-item">
                <img src={WatchIcon} alt="Watch Icon" className="icon" />
                <span className="instructions-text">
                  The timer is set for 5 seconds
                </span>
              </li>
              <li className="instructions-item">
                <img src={CamIcon} alt="Camera Icon" className="icon" />
                <span className="instructions-text">
                  Press the button to start the shoot
                </span>
              </li>
              <li className="instructions-item">
                <img src={GalleryIcon} alt="Gallery Icon" className="icon" />
                <span className="instructions-text">
                  You'll get 8 photos—pick your favorite 4!
                </span>
              </li>
              <li className="instructions-item">
                <img src={SettingsIcon} alt="Settings Icon" className="icon" />
                <span className="instructions-text">
                  Enable camera access in settings if needed
                </span>
              </li>
            </ul>

            {/* Checkbox */}
            <div
              className="checkbox-container"
              onClick={() => setDontShowAgain(!dontShowAgain)}
            >
              <img
                src={dontShowAgain ? CheckboxChecked : CheckboxUnchecked}
                alt="Checkbox"
                className="checkbox-icon"
              />
              <span>Do not show this popup again</span>
            </div>
          </div>

          {/* Ready Button Below Popup */}
          <button className="ready-button" onClick={() => navigate("/camera")}>
            I'm Ready!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
