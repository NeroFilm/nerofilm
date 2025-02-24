import "./footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      {/* Left Side - Logo */}
      <div className="footer-logo">
        <h1 className="footer-logo-text">NeroFilm</h1>
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
