import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useFrame, useFrameUpdate } from "../../hooks/useFrame";
import BackHeader from "../../components/BackHeader/BackHeader";
import {
  VideoCameraIcon,
  VideoCameraSlashIcon,
} from "@heroicons/react/24/outline";
import Shutter from "../../assets/shutter.svg";
import ShutterSound from "../../assets/sounds/CamShutter.wav";
import "./index.css";
import useRefreshWarning from "../../hooks/useRefreshWarning";

const Camera = () => {
  useRefreshWarning();

  const navigate = useNavigate();
  const frame = useFrame();
  const setFrame = useFrameUpdate();

  const shutterAudio = useRef(new Audio(ShutterSound));
  const webcamRef = useRef(null);

  const [cameraPermission, setCameraPermission] = useState(null);
  const [isShooting, setIsShooting] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);
  const [flash, setFlash] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    setCameraPermission(true);
  }, []);

  const takePhoto = (silent = false) => {
    const video = webcamRef.current.video;
    const canvas = document.createElement("canvas");

    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageSrc = canvas.toDataURL("image/png");

    if (!silent) {
      shutterAudio.current.currentTime = 0;
      shutterAudio.current
        .play()
        .catch((error) => console.log("Audio play failed:", error));
      setFlash(true);
      setTimeout(() => setFlash(false), 200);
    }

    setFrame((prevFrame) => {
      const updatedPhotos = [...prevFrame.allImages, imageSrc].slice(-32);
      return { ...prevFrame, allImages: updatedPhotos };
    });
  };

  const startCountdown = (count, callback) => {
    if (count > 0) {
      setCountdown(count);
      setTimeout(() => startCountdown(count - 1, callback), 1000); // DONT MODIFY.
    } else {
      setCountdown(null);
      callback();
    }
  };

  const startPhotoSequence = () => {
    if (isShooting) return;
    setIsShooting(true);
    setPhotoCount(0);
    let count = 8;

    const takeNextPhoto = () => {
      if (count === 0) {
        setIsShooting(false);
        setCountdown(null);
        navigate("/photo-selection");
        return;
      }

      // Start countdown for this round
      startCountdown(3, () => {
        takePhoto(); // visible photo
        setPhotoCount((prevCount) => prevCount + 1);
        count--;
        setTimeout(takeNextPhoto, 500);
      });

      // Take 3 hidden photos immediately when countdown starts
      takePhoto(true);
      setTimeout(() => {
        takePhoto(true);
        setTimeout(() => {
          takePhoto(true);
        }, 500);
      }, 500);
    };

    takeNextPhoto();
  };

  return (
    <div>
      <BackHeader isBlack />
      <div
        className={`camera-page ${
          frame.layout === "wide" ? "wide-mode" : "original-mode"
        }`}
      >
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
                  Click shutter to start taking photos
                </h2>
              ) : (
                <h2 className="count-display">{photoCount}/8</h2>
              )}

              <div className={`camera-preview-screen ${frame.layout}`}>
                <Webcam
                  className="webcam"
                  ref={webcamRef}
                  audio={false}
                  mirrored={true}
                  screenshotFormat="image/png"
                  videoConstraints={{
                    width: { ideal: 1920 },
                    height: { ideal: 1080 },
                    facingMode: "user",
                  }}
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
                      <p
                        className={`countdown-timer ${
                          countdown === null ? "hidden" : ""
                        }`}
                      >
                        {countdown !== null ? countdown : <span>&nbsp;</span>}
                      </p>
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
