import Frame from "../../components/Frame/Frame"
import { useFrame } from "../../hooks/FrameContext"

function Download() {
  const frame = useFrame();
  const images = ["", "", "", ""]

  return (
    <div>
      <Frame
        images={images}
        layout={frame.layout}
        color={frame.color}
      />
      <button>Save image</button>
    </div>
  );
}

export default Download
