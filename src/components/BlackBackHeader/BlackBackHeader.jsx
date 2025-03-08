import { Link, useNavigate } from "react-router-dom";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
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
        <ArrowUturnLeftIcon className="black-icon" />
        </button>
    </header>
  );
};

export default BlackBackHeader;
