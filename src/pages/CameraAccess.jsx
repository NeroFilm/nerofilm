import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFrame, useFrameUpdate } from "../hooks/FrameContext"; // Import frame context
import WhiteBackArrow from "../assets/WhiteBackArrow.png";
import Camera from "../assets/Camera.png";
import CameraDisabled from "../assets/CameraDisabled.png";
import Shutter from "../assets/Shutter.png";
import "../pages/CameraAccess.css";

const CameraAccess = () => {
  const navigate = useNavigate();
  const frame = useFrame();
  const setFrame = useFrameUpdate();

  const [cameraPermission, setCameraPermission] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [countdown, setCountdown] = useState(null);
  const [isShooting, setIsShooting] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);
  const [showPhotoCount, setShowPhotoCount] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: "user", aspectRatio: frame.layout === "wide" ? 9 / 16 : 16 / 9 },
      })
      .then((stream) => {
        setCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(() => {
        setCameraPermission(false);
      });
  }, [frame.layout]);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Adjust canvas size based on selected layout
      if (frame.layout === "wide") {
        canvas.width = video.videoHeight; // Swap width/height for vertical
        canvas.height = video.videoWidth;
        context.translate(canvas.width, 0);
        context.rotate((90 * Math.PI) / 180);
      } else {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataURL = canvas.toDataURL("image/png");

      setFrame((prevFrame) => {
        const updatedPhotos = [...prevFrame.images, imageDataURL];
        return { ...prevFrame, images: updatedPhotos.slice(-8) };
      });

      setPhotoCount((prevCount) => prevCount + 1);
    }
  };

  const startCountdown = (count, callback) => {
    if (count === 0) {
      callback();
      return;
    }
    setCountdown(count);
    setTimeout(() => startCountdown(count - 1, callback), 1000);
  };

  const startPhotoSequence = () => {
    if (isShooting) return;
    setIsShooting(true);
    setPhotoCount(0);
    setShowPhotoCount(true);
    let count = 8;

    const takeNextPhoto = () => {
      if (count === 0) {
        setIsShooting(false);
        setCountdown(null);
        navigate("/choose-frame"); // Navigate after 8 photos
        return;
      }
      startCountdown(3, () => {
        takePhoto();
        count--;
        setTimeout(takeNextPhoto, 500);
      });
    };

    takeNextPhoto();
  };

  return (
    <div className={`camera-page ${frame.layout === "wide" ? "wide-mode" : "original-mode"}`}>
      <button className="back-button" onClick={() => navigate("/instructions")}>
        <img src={WhiteBackArrow} alt="Back" className="back-arrow" />
      </button>

      {cameraPermission === null && (
        <div className="camera-access-message">
          <img src={Camera} alt="Camera" className="camera-image" />
          <h2>Allow Camera Access</h2>
          <p>To take your photo, allow camera access.</p>
        </div>
      )}

      {cameraPermission === false && (
        <div className="camera-access-message">
          <img src={CameraDisabled} alt="Camera Disabled" className="camera-image" />
          <h2>Camera Access Disabled</h2>
          <p>Please enable camera access in your browser settings.</p>
        </div>
      )}

      {cameraPermission === true && (
        <>
          {!showPhotoCount ? (
            <h2 className="camera-instruction">Click to start taking photos</h2>
          ) : (
            <div className="photo-count-display">{photoCount}/8</div>
          )}

          <div className="camera-container">
            <div className={`camera-preview-container ${frame.layout}`}>
              <video ref={videoRef} autoPlay playsInline className={`camera-preview ${frame.layout}`} />

              {countdown !== null && <div className="countdown-timer">{countdown}</div>}

              <button className="shutter-button" onClick={startPhotoSequence} disabled={isShooting}>
                <img src={Shutter} alt="Shutter" className="shutter-icon" />
              </button>

              <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CameraAccess;
