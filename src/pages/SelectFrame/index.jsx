import { useFrame, useFrameUpdate } from "../../hooks/FrameContext";
import Frame from "../../components/Frame/Frame";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SelectFrame() {
  const frame = useFrame();
  const setFrame = useFrameUpdate();
  const navigate = useNavigate();

  const handleSelectLayout = (layout) => {
    setFrame({ ...frame, layout }); // Store selected layout in context
    navigate("/instructions"); 
  };

  return (
    <div>
      <h1>Select Frame Layout</h1>
      <ul className="frame-options">
        <li
          className={frame.layout === "original" ? "frame-selected" : ""}
          onClick={() => handleSelectLayout("original")}
        >
         <Frame images={["/placeholder1.png", "/placeholder2.png", "/placeholder3.png", "/placeholder4.png"]} layout="original" color={frame.color} />
          <p>4 Cut Original</p>
        </li>
        <li
          className={frame.layout === "wide" ? "frame-selected" : ""}
          onClick={() => handleSelectLayout("wide")}
        >
        <Frame images={["/placeholder1.png", "/placeholder2.png", "/placeholder3.png", "/placeholder4.png"]} layout="wide" color={frame.color} />
        <p>4 Cut Wide</p>
        </li>
      </ul>
      <Link to="/camera">Camera</Link>
    </div>
  );
}

export default SelectFrame;
