import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useFrame, useFrameUpdate } from "../../hooks/FrameContext";
import BlackBackHeader from "../../components/BlackBackHeader/BlackBackHeader";
import { VideoCameraIcon, VideoCameraSlashIcon } from "@heroicons/react/24/outline";
import Shutter from "../../assets/Shutter.png";
import ShutterSound from "../../assets/sounds/CamShutter.wav";
import "./index.css";
import useRefreshWarning from "../../hooks/useRefreshWarning";

const Camera = () => {
  useRefreshWarning();

  const navigate = useNavigate();
  const frame = useFrame();
  const setFrame = useFrameUpdate();

  const shutterAudio = useRef(new Audio(ShutterSound));

  const [cameraPermission, setCameraPermission] = useState(null);
  const [isShooting, setIsShooting] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);
  const [flash, setFlash] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const webcamRef = useRef(null);

  useEffect(() => {
    setCameraPermission(true);
  }, []);

  const takePhoto = (silent = false) => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      if (!silent) {
        shutterAudio.current.currentTime = 0;
        shutterAudio.current
          .play()
          .catch((error) => console.log("Audio play failed:", error));

        setFlash(true);
        setTimeout(() => setFlash(false), 200);
      }

      setFrame((prevFrame) => {
        const updatedPhotos = [...prevFrame.allImages, imageSrc].slice(-16);
        return { ...prevFrame, allImages: updatedPhotos };
      });
    }
  };

  const startCountdown = (count, callback) => {
    if (count > 0) {
      setCountdown(count);
      setTimeout(() => startCountdown(count - 1, callback), 1000);
    } else {
      setCountdown(null);
      callback();
    }
  };

  const startPhotoSequence = () => {
    if (isShooting) return;
    setIsShooting(true);
    setPhotoCount(0);
    let count = 8; // User thinks only 8 photos are taken

    const takeNextPhoto = () => {
      if (count === 0) {
        setIsShooting(false);
        setCountdown(null);
        navigate("/photo-selection");
        return;
      }

      startCountdown(3, () => {
        takePhoto(); // visible photo (with sound/flash)
        setPhotoCount((prevCount) => prevCount + 1);

        setTimeout(() => {
          takePhoto(true); // hidden photo (silent)
          count--;
          setTimeout(takeNextPhoto, 500);
        }, 500);
      });
    };

    takeNextPhoto();
  };

  return (
    <div>
      <BlackBackHeader />
      <div
        className={`camera-page ${
          frame.layout === "wide" ? "wide-mode" : "original-mode"
        }`}
      >
        {/* camera permissions */}
        {cameraPermission === null && (
          <div className="camera-access-message">
            <VideoCameraIcon className="camera-image" />
            <h2>Allow Camera Access</h2>
            <p>To take your photo, allow camera access.</p>
          </div>
        )}

        {cameraPermission === false && (
          <div className="camera-access-message">
            <VideoCameraSlashIcon className="camera-image" />
            <h2>Camera Access Disabled</h2>
            <p>Please enable camera access in your browser settings.</p>
          </div>
        )}

        {cameraPermission === true && (
          <>
            <div className="all-together">
              {!isShooting ? (
                <h2 className="camera-instructions">
                  Click to start taking photos
                </h2>
              ) : (
                <h2 className="count-display">{photoCount}/8</h2>
              )}

              <div className={`camera-preview-screen ${frame.layout}`}>
                <Webcam
                  className="webcam"
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/png"
                  mirrored={true}
                />
                {flash && <div className="flash-overlay"></div>}

                <div className="camera-layer">
                  <button
                    className="shutter-button"
                    onClick={startPhotoSequence}
                    disabled={isShooting}
                  >
                    <img src={Shutter} alt="Shutter" className="shutter-icon" />
                    {isShooting && (
                      <div
                        className={`countdown-timer ${
                          countdown === null ? "hidden" : ""
                        }`}
                      >
                        {countdown !== null ? countdown : <span>&nbsp;</span>}
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Camera;
