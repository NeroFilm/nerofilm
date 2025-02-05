import { useEffect } from "react";
import Frame from "../components/frame"
import { useFrame, useFrameUpdate } from "../hooks/FrameContext";
import { Link } from "react-router-dom";

function SelectFrame() {
  const images = ["", "", "", ""];
  const frame = useFrame();
  const setFrame = useFrameUpdate();

  useEffect(() => {
    console.log(frame)
  }, [frame])

  return (
    <div>
      <h1>Select Frame Layout</h1>
      <ul className="frame-options">
        <li
          className={frame.layout === "original" ? "frame-selected" : ""}
          onClick={() => setFrame({ ...frame, layout: "original" })}
        >
          <Frame images={images} layout="original" color={frame.color} />
          <p>4 cut original</p>
        </li>
        <li
          className={frame.layout === "wide" ? "frame-selected" : ""}
          onClick={() => setFrame({ ...frame, layout: "wide" })}
        >
          <Frame images={images} layout="wide" color={frame.color} />
          <p>4 cut wide</p>
        </li>
      </ul>
      <Link to="/add-filter">Add Filter</Link>;
    </div>
  );
}

export default SelectFrame
