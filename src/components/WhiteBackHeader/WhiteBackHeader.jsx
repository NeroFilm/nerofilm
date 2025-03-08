import { Link, useNavigate } from "react-router-dom";
import BlackBackArrow from "../../assets/BlackBackArrow.png";
import "./whiteback-header.css"; // Import the CSS file

const WhiteBackHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="white-back-header">
      <div className="white-logo">
        <Link to="/">NeroFilm</Link>
      </div>
      <button
        onClick={() => navigate(-1)} // nav back one step in history
        className="white-back-header-back"
      >
        <img src={BlackBackArrow} alt="Back Arrow" className="white-icon" />
      </button>
    </header>
  );
};

export default WhiteBackHeader;
