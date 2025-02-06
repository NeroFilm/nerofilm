import Logo from "../assets/Logobig.png";
import Catfilm from "../assets/Catfilm.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{
      fontFamily: "'Itim', cursive",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      textAlign: "center",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
        maxWidth: "1200px",
      }}>
        {/* Left Side Content */}
        <div style={{ textAlign: "center", flex: 1 }}> {/* Centering the content */}
          <img src={Logo} alt="NeroFilm Logo" style={{ width: "400px", paddingTop: "0px", marginTop: "-500px", marginBottom: "20px" }} />
          <h3 style={{ fontSize: "24px", color: "gray", marginBottom: "20px" }}>
            No photobooth nearby? <br /> Your camera is all you need
          </h3>
          <button style={{
            padding: "10px 20px",
            fontSize: "24px",
            backgroundColor: "#f8d7e2",
            border: "none",
            borderRadius: "10px",
            boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            marginTop: "10px"
          }}>
            <Link to="/try-it">Try it now</Link>
          </button>
        </div>

        {/* Right Side Image */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <img src={Catfilm} alt="Cat Film" style={{ width: "100%", maxWidth: "400px" }} />
        </div>
      </div>
    </div>
  );
};

export default Home;