import { Link, useNavigate } from "react-router-dom";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
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
        <ArrowUturnLeftIcon className="white-icon" />
      </button>
    </header>
  );
};

export default WhiteBackHeader;