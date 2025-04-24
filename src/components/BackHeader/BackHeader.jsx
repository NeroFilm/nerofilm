import { Link, useNavigate } from "react-router-dom";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import "./back-header.css";
import PropTypes from "prop-types";

const BackHeader = ({ isBlack = false }) => {
  const navigate = useNavigate();

  return (
    <header className={`back-header ${isBlack && "back-header-black"}`}>
      <div className={`logo ${isBlack && "white-logo"}`}>
        <Link to="/">NeroFilm</Link>
      </div>
      <button
        onClick={() => navigate(-1)} // Navigate back one step in history
        className="back-button"
      >
        <ArrowUturnLeftIcon
          className={`back-icon ${isBlack && "white-back-icon"}`}
        />
      </button>
    </header>
  );
};

export default BackHeader;

BackHeader.propTypes = {
  isBlack: PropTypes.bool,
};
