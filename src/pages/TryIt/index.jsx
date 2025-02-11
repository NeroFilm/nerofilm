import { useNavigate } from "react-router-dom"; 
import "./index.css"; 
import Catfilm from "../../assets/Catfilm.png";
import Header from "../../components/Header/Header";

const TryIt = () => {
  const navigate = useNavigate(); 

  return (
    <>
      <Header />
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
