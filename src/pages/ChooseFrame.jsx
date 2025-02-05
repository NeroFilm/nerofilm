import { useFrame, useFrameUpdate } from "../hooks/FrameContext";
import Frame from "../components/frame";
import { Link } from "react-router-dom";

function ChooseFrame() {
  const images = ["", "", "", ""];
  const frame = useFrame();
  const setFrame = useFrameUpdate();
  
  return (
    <div>
      <h1>Add color</h1>
      <Frame images={images} layout={frame.layout} color={frame.color} />
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
      <Link to="/download">Download</Link>;
    </div>
  );
}

export default ChooseFrame;
