import { Link } from "react-router-dom";
import "./Header.css"; // Import the CSS file

const Header = () => {
  return (
    <header className="header">
      {/* Brand Name */}
      <div className="logo">
        <Link to="/">NeroFilm</Link>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="header-nav">
          <li>
            <Link to="/about">About</Link>
          </li>
          <Link to="/frame-layout">
            <button className="btn-small">Enter Photobooth</button>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
