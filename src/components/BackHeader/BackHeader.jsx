import { useNavigate } from "react-router-dom";
import BlackBackArrow from "../../assets/BlackBackArrow.png"; 
import "./back-header.css"; // Import the CSS file

const BackHeader = () => {
  const navigate = useNavigate(); 

  return (
    <header className="second-header">
      {/* Brand Name */}
      <button 
        onClick={() => navigate("/")}
        className="second-header-brand"
      >
        NeroFilm
      </button>
      
      {/* Back Arrow Button */}
      <button 
        onClick={() => navigate(-1)} // nav back one step in history
        className="second-header-back"
      >
        <img src={BlackBackArrow} alt="Back Arrow" className="icon" />
      </button>
    </header>
  );
};

export default BackHeader;
