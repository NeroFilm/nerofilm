import Logo from "../../assets/Logoimage.png"; // Import the logo image
import "./footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      {/* Left Side - Logo */}
      <div className="footer-logo">
        <img src={Logo} alt="NeroFilm Logo" />
      </div>

      {/* Right Side - Contact Info */}
      <div className="footer-contact">
        <h3>Contact</h3>
        <p>contact.nerofilm@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;
