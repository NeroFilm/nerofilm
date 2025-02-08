import { useFrame, useFrameUpdate } from "../hooks/FrameContext";
import Frame from "../components/frame";
import { useLocation, Link } from "react-router-dom";

function ChooseFrame() {
  const frame = useFrame();
  const setFrame = useFrameUpdate();
  const location = useLocation();
  const photos = location.state?.photos || []; // Retrieve photos from /camera

  return (
    <div>
      <h1>Add Color</h1>
      
      {/* Display the taken photos inside the selected frame */}
      <Frame images={photos} layout={frame.layout} color={frame.color} />

      {/* Color selection options */}
      <ul>
        <li
          className={frame.color === "black" ? "option-selected" : ""}
          onClick={() => setFrame({ ...frame, color: "black" })}
        >
          Black
        </li>
        <li
          className={frame.color === "white" ? "option-selected" : ""}
          onClick={() => setFrame({ ...frame, color: "white" })}
        >
          White
        </li>
        <li
          className={frame.color === "pink" ? "option-selected" : ""}
          onClick={() => setFrame({ ...frame, color: "pink" })}
        >
          Pink
        </li>
        <li
          className={frame.color === "blue" ? "option-selected" : ""}
          onClick={() => setFrame({ ...frame, color: "blue" })}
        >
          Blue
        </li>
      </ul>

      <Link to="/download">Download</Link>
    </div>
  );
}

export default ChooseFrame;
