import { Link } from "react-router-dom";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      {/* Brand Name */}
      <div className="logo logo-small">NeroFilm</div>

      {/* Right Side Content (Email & Privacy Policy) */}
      <div className="footer-right">
        <a href="mailto:contact.nerofilm@gmail.com" className="footer-email">
          contact.nerofilm@gmail.com
        </a>
        <Link to="/privacy-policy" className="privacy-policy-link">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
