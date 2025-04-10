import { useFrame } from "../../hooks/useFrame";
import { useRef, useState } from "react";
import BackHeader from "../../components/BackHeader/BackHeader";
import { generateAndDownloadTimelapse } from "../../utils/generateTimelapse";
import "./index.css";

function Timelapse() {
  const frame = useFrame();
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    generateAndDownloadTimelapse(
      frame.allImages || frame.images,
      canvasRef,
      setLoading
    );
  };

  return (
    <div className="timelapse-container">
      <BackHeader />
      <h1 className="timelapse-title">Download Timelapse</h1>

      {/* Hidden canvas used for rendering the video */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      <button className="btn" onClick={handleDownload} disabled={loading}>
        {loading ? "Generating Timelapse..." : "Download Timelapse"}
      </button>
    </div>
  );
}

export default Timelapse;
