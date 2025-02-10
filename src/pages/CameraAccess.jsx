import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import WhiteBackArrow from "../assets/WhiteBackArrow.png"; 
import Camera from "../assets/Camera.png"; 
import CameraDisabled from "../assets/CameraDisabled.png"; 
import Shutter from "../assets/Shutter.png";
import "../pages/CameraAccess.css";

const CameraAccess = () => {
  const navigate = useNavigate();
  const [cameraPermission, setCameraPermission] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photos, setPhotos] = useState([]); // Store up to 8 photos
  const [countdown, setCountdown] = useState(null); // Countdown state
  const [isShooting, setIsShooting] = useState(false); // Track shooting state
  const [photoCount, setPhotoCount] = useState(0); // Tracks number of photos taken
  const [showPhotoCount, setShowPhotoCount] = useState(false); // Controls visibility of text

  useEffect(() => {
    setTimeout(() => {
      navigator.mediaDevices
        .getUserMedia({
          video: { 
            facingMode: "environment" // Ensures back camera (non-mirrored)
          } 
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
    }, 1000);
  }, []);
  

  // Function to capture a photo
  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas size to match video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Flip the image horizontally before drawing
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to an image URL
      const imageDataURL = canvas.toDataURL("image/png");

      // Update state with the new photo, keeping only the last 8
      setPhotos((prevPhotos) => {
        const updatedPhotos = [...prevPhotos, imageDataURL];
        return updatedPhotos.length > 8 ? updatedPhotos.slice(1) : updatedPhotos;
      });

      // Update photo count
      setPhotoCount((prevCount) => prevCount + 1);
    }
  };

  // Function to handle countdown before each photo
  const startCountdown = (count, callback) => {
    if (count === 0) {
      callback(); // Take the photo
      return;
    }
    setCountdown(count);
    setTimeout(() => startCountdown(count - 1, callback), 1000);
  };

  // Function to start taking 8 photos automatically
  const startPhotoSequence = () => {
    if (isShooting) return; // Prevent multiple starts
    setIsShooting(true);
    setPhotoCount(0); // Reset count when starting new sequence
    setShowPhotoCount(true); // Hide instruction text and show photo count
    let count = 8; // Total photos to take

    const takeNextPhoto = () => {
      if (count === 0) {
        setIsShooting(false);
        setCountdown(null); // Hide countdown
        return;
      }
      startCountdown(3, () => {
        takePhoto();
        count--;
        setTimeout(takeNextPhoto, 500); // Small delay before starting next countdown
      });
    };

    takeNextPhoto();
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
          {/* Conditional Rendering: Show either instruction or photo count */}
          {!showPhotoCount ? (
            <h2 className="camera-instruction">Click to start taking photos</h2>
          ) : (
            <div className="photo-count-display">
              {photoCount}/8
            </div>
          )}

          <div className="camera-container">
            {/* Display Thumbnails */}
            <div className="photo-gallery">
              {photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Captured ${index + 1}`} className="thumbnail" />
              ))}
            </div>

            {/* Camera Preview */}
            <div className="camera-preview-container">
              <video ref={videoRef} autoPlay playsInline className="camera-preview"></video>

              {/* Countdown Display */}
              {countdown !== null && (
                <div className="countdown-timer">
                  {countdown}
                </div>
              )}

              {/* Shutter button */}
              <button className="shutter-button" onClick={startPhotoSequence} disabled={isShooting}>
                <img src={Shutter} alt="Shutter" className="shutter-icon" />
              </button>

              {/* Hidden canvas for capturing photo */}
              <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CameraAccess;
