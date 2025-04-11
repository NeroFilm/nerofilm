import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© NeroFilm 2025</p>
      <div className="footer-right">
        <Link to="/privacy-policy" className="privacy-policy-link">
          Privacy Policy
        </Link>
        <a href="mailto:contact.nerofilm@gmail.com">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;
