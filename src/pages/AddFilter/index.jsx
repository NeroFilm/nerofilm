import { useFrame, useFrameUpdate } from "../../hooks/FrameContext";
import Frame from "../../components/Frame/Frame";
import { Link } from "react-router-dom";

function AddFilter() {
  const images = ["", "", "", ""];
  const frame = useFrame();
  const setFrame = useFrameUpdate();
  
  return (
    <div>
      <h1>Add Filter</h1>
      <Frame color={frame.color} images={images} layout={frame.layout} />
      <ul>
        <li
          className={frame.filter === "default" ? "option-selected" : ""}
          onClick={() => setFrame({ ...frame, filter: "default" })}
        >
          Default
        </li>
        <li
          className={frame.filter === "b&w" ? "option-selected" : ""}
          onClick={() => setFrame({ ...frame, filter: "b&w" })}
        >
          B&W
        </li>
      </ul>
      <Link to="/choose-frame">Choose frame</Link>;
    </div>
  );
}

export default AddFilter
