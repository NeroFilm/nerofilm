import { useFrame } from "../../hooks/FrameContext";
import { useRef, useState } from "react";
import WhiteBackHeader from "../../components/WhiteBackHeader/WhiteBackHeader";
import { generateAndDownloadTimelapse } from "../../utils/generateTimelapse";
import "./index.css";

function Timelapse() {
  const frame = useFrame();
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    generateAndDownloadTimelapse(frame.allImages || frame.images, canvasRef, setLoading);
  };

  return (
    <div className="timelapse-container">
      <WhiteBackHeader />
      <h1 className="timelapse-title">Download Timelapse</h1>

      {/* Hidden canvas used for rendering the video */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      <button className="btn" onClick={handleDownload} disabled={loading}>
        {loading ? "Generating..." : "Download Timelapse"}
      </button>
    </div>
  );
}

export default Timelapse;
