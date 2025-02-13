import { useNavigate } from "react-router-dom"; 
import "./index.css"; 
import Catfilm from "../../assets/Catfilm.png";
import Header from "../../components/Header/Header";
import { useFrameUpdate } from "../../hooks/FrameContext";
import { useEffect } from "react";
import { defaultFrame } from "../../constants/frames";

const TryIt = () => {
  const navigate = useNavigate(); 
  const setFrame = useFrameUpdate();

  useEffect(()=>{
    setFrame(defaultFrame);
  }, []);

  return (
    <>
      <Header />
      <div className="tryit-container">
        <div className="try-it-screen">
          <img src={Catfilm} alt="Catfilm" className="catfilm-image" />
          <p><br /></p>
          <button className="btn" onClick={() => navigate("/select-frame")}>
            Start Now
          </button>
        </div>
      </div>
    </>
  );
};

export default TryIt;
