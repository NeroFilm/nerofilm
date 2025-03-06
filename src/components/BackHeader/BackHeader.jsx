import { Link, useNavigate } from "react-router-dom";
import BlackBackArrow from "../../assets/BlackBackArrow.png";
import "./back-header.css"; // Import the CSS file

const BackHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="back-header">
      <div className="logo">
        <Link to="/">NeroFilm</Link>
      </div>
      <button
        onClick={() => navigate(-1)} // nav back one step in history
        className="back-header-back"
      >
        <img src={BlackBackArrow} alt="Back Arrow" className="icon" />
      </button>
    </header>
  );
};

export default BackHeader;
