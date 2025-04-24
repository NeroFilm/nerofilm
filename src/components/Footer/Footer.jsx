import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© NeroFilm 2025</p>
      <nav className="footer-right">
        <Link to="/about-us" className="footer-link">
          About Us
        </Link>
        <Link to="/privacy-policy" className="footer-link">
          Privacy Policy
        </Link>
        <a href="mailto:contact.nerofilm@gmail.com">Contact Us</a>
      </nav>
    </footer>
  );
};

export default Footer;
