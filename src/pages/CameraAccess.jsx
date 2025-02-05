import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import WhiteBackArrow from "../assets/WhiteBackArrow.png"; 
import Camera from "../assets/Camera.png"; 
import CameraDisabled from "../assets/CameraDisabled.png"; 
import Shutter from "../assets/Shutter.png";
import "../pages/CameraAccess.css";

const CameraAccess = ({ onBack }) => {
  const navigate = useNavigate();
  const [cameraPermission, setCameraPermission] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null); // Store captured photo

  useEffect(() => {
    // Show the "Allow Camera Access" screen first
    setTimeout(() => {
      // Request camera permission
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          setCameraPermission(false);
        });
    }, 1000);
  }, []);

  // Capture a photo
  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas size to match video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the video frame onto the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to an image URL
      const imageDataURL = canvas.toDataURL("image/png");
      setPhoto(imageDataURL); // Save the photo for preview or download
    }
  };

  return (
    <div className="camera-page">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/instructions")}>
        <img src={WhiteBackArrow} alt="Back" className="back-arrow" />
      </button>
  
      {/* UI when permission is still loading */}
      {cameraPermission === null && (
        <div className="camera-access-message">
          <img src={Camera} alt="Camera" className="camera-image" />
          <h2>Allow Camera Access</h2>
          <p>To take your photo, <strong>[app]</strong> needs to access your camera</p>
        </div>
      )}
  
      {/* UI when permission is denied */}
      {cameraPermission === false && (
        <div className="camera-access-message">
          <img src={CameraDisabled} alt="Camera Disabled" className="camera-image" />
          <h2>Camera Access Disabled</h2>
          <p>Please enable camera access in your browser settings.</p>
        </div>
      )}
  
      {/* UI when permission is granted */}
      {cameraPermission === true && (
        <>
          <h2 className="camera-instruction">Click to start taking photos</h2>
          
          <div className="camera-preview-container">
            <video ref={videoRef} autoPlay playsInline className="camera-preview"></video>
  
            {/* Shutter button */}
            <button className="shutter-button" onClick={takePhoto}>
              <img src={Shutter} alt="Shutter" className="shutter-icon" />
            </button>
  
            {/* Hidden canvas for capturing photo */}
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
  
            {/* Display captured photo */}
            {photo && (
              <div className="photo-preview">
                <h3>Captured Photo</h3>
                <img src={photo} alt="Captured" className="captured-image" />
                <a href={photo} download="photo.png" className="download-button">
                  Download Photo
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}; 

export default CameraAccess;
  