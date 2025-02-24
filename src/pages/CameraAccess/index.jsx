import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFrame, useFrameUpdate } from "../../hooks/FrameContext"; 
import WhiteBackArrow from "../../assets/WhiteBackArrow.png";
import Camera from "../../assets/Camera.png";
import CameraDisabled from "../../assets/CameraDisabled.png";
import Shutter from "../../assets/Shutter.png";
import ShutterSound from "../../assets/sounds/CamShutter.wav";  
import "./index.css";
import useRefreshWarning from "../../hooks/useRefreshWarning";

const CameraAccess = () => {
  useRefreshWarning();
  
  const navigate = useNavigate();
  const frame = useFrame();
  const setFrame = useFrameUpdate();
  
  const shutterAudio = useRef(new Audio(ShutterSound)); 

  const [cameraPermission, setCameraPermission] = useState(null);
  const [isShooting, setIsShooting] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);
  const [showPhotoCount, setShowPhotoCount] = useState(false);
  const [flash, setFlash] = useState(false); 
  const [countdown, setCountdown] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  /* Request camera access */
  useEffect(() => {
    let stream;
  
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: "user", aspectRatio: frame.layout === "wide" ? 9 / 16 : 16 / 9 },
      })
      .then((videoStream) => {
        stream = videoStream;
        setCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = videoStream;
        }
      })
      .catch(() => {
        setCameraPermission(false);
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop()); 
      }
    };
  }, [frame.layout]);
  
  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
  
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // mirror the image 
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
      const imageDataURL = canvas.toDataURL("image/png");

      // play the shutter sound
      shutterAudio.current.currentTime = 0;
      shutterAudio.current.play().catch(error => console.log("Audio play failed:", error));

      setFlash(true);
      setTimeout(() => setFlash(false), 200); 
  
      setFrame((prevFrame) => {
        const updatedPhotos = [...prevFrame.images, imageDataURL].slice(-8);
        return { ...prevFrame, images: updatedPhotos };
      });
  
      setPhotoCount((prevCount) => {
        const newCount = prevCount + 1;
  
        // Stop camera access if all photos have been taken
        if (newCount >= 8 && videoRef.current.srcObject) {
          videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
  
        return newCount;
      });
    }
  };
  
  /* 3-second countdown before capturing each photo */
  const startCountdown = (count, callback) => {
    if (count === 0) {
      callback();
      return;
    }
    setCountdown(count);
    setTimeout(() => startCountdown(count - 1, callback), 1000);
  };

  /* Takes 8 photos and saves them directly to FrameContext */
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
        navigate("/select-photos"); 
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
      <button className="back-button" onClick={() => navigate("/select-frame")}>
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
            {/* Camera preview */}
            <div className={`camera-preview-container ${frame.layout}`}>
              {flash && <div className="flash-overlay"></div>}
              <video ref={videoRef} autoPlay playsInline className={`camera-preview ${frame.layout}`} />
              <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            </div>
            
            {/* Shutter & countdown */}
            <div className="shutter-container">
              {countdown !== null && <div className="countdown-timer">{countdown}</div>}
              <button className="shutter-button" onClick={startPhotoSequence} disabled={isShooting}>
                <img src={Shutter} alt="Shutter" className="shutter-icon" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CameraAccess;
