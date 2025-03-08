import { Link, useNavigate } from "react-router-dom";
import WhiteBackArrow from "../../assets/WhiteBackArrow.png";
import "./blackback-header.css"; // Import the CSS file

const BlackBackHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="black-back-header">
      <div className="black-logo">
        <Link to="/">NeroFilm</Link>
      </div>
      <button
        onClick={() => navigate(-1)} // nav back one step in history
        className="black-back-header-back"
      >
        <img src={WhiteBackArrow} alt="Back Arrow" className="black-icon" />
      </button>
    </header>
  );
};

export default BlackBackHeader;
