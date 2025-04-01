import { useFrame } from "../../hooks/FrameContext";
import { useState, useRef } from "react";
import WhiteBackHeader from "../../components/WhiteBackHeader/WhiteBackHeader";
import "./index.css";

function Timelapse() {
  const frame = useFrame();
  const canvasRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateTimelapse = async () => {
    const images = frame.allImages;
    if (!images || images.length === 0) {
      alert("No photos found.");
      return;
    }

    setLoading(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const firstImage = new Image();
    firstImage.src = images[0];

    firstImage.onload = async () => {
      canvas.width = firstImage.width;
      canvas.height = firstImage.height;

      const stream = canvas.captureStream();
      const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setLoading(false);
      };

      recorder.start();

      for (let i = 0; i < images.length; i++) {
        const img = new Image();
        img.src = images[i];
        await new Promise((resolve) => {
          img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            setTimeout(resolve, 300); // 300ms per frame (adjust to control speed)
          };
        });
      }

      recorder.stop();
    };
  };

  return (
    <div className="timelapse-container">
      <WhiteBackHeader />
      <h1 className="timelapse-title">Create Timelapse</h1>

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      <button className="btn" onClick={generateTimelapse} disabled={loading}>
        {loading ? "Generating..." : "Generate Timelapse"}
      </button>

      {videoUrl && (
        <div className="video-container">
          <video src={videoUrl} controls />
          <a href={videoUrl} download="timelapse.webm" className="btn">
            Download Timelapse
          </a>
        </div>
      )}
    </div>
  );
}

export default Timelapse;
