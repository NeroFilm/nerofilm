import { useNavigate } from "react-router-dom"; 
import "./TryIt.css"; 
import Catfilm from "../assets/Catfilm.png";

const TryIt = () => {
  const navigate = useNavigate(); 

  return (
    <>
      <div className="tryit-container">
        <div className="try-it-screen">
          <img src={Catfilm} alt="Catfilm" className="catfilm-image" />
          <p><br /></p>
          <button className="start-button" onClick={() => navigate("/select-frame")}>
            Start Now
          </button>
        </div>
      </div>
    </>
  );
};

export default TryIt;
