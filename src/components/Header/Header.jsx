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
        <Link to="/frame-layout" role="button">
          <button className="btn-small">Enter Photobooth</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
