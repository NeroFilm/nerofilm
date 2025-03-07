import { useFrame, useFrameUpdate } from "../../hooks/FrameContext";
import Frame from "../../components/Frame/Frame";
import BackHeader from "../../components/BackHeader/BackHeader";
import * as fabric from "fabric";
import { useRef, useEffect, useCallback } from "react";
import { frameSize } from "../../constants/frames";
import { useNavigate } from "react-router-dom";
import useRefreshWarning from "../../hooks/useRefreshWarning";
import { useDropzone } from "react-dropzone";

import test1 from "../../assets/stickers/1.png";
import test2 from "../../assets/stickers/2.webp";
import test3 from "../../assets/stickers/3.webp";

import "./index.css";

// Predefined stickers
const stickers = [test1, test2, test3];

function Sticker() {
  useRefreshWarning();
  const navigate = useNavigate();

  const frame = useFrame();
  const setFrame = useFrameUpdate();

  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  // drop zone

  const onDrop = useCallback((acceptedFiles) => {
    for (const file of acceptedFiles) {
      handleAddSticker(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop,
  });

  // Initialize fabric canvas
  useEffect(() => {
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current);
    return () => fabricCanvasRef.current.dispose();
  }, []);

  // Handle delete object from canvas with backspace or delete key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["Delete", "Backspace"].includes(e.key)) {
        const canvas = fabricCanvasRef.current;
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          canvas.remove(activeObject);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Add sticker to canvas
  const handleAddSticker = (stickerUrl) => {
    const canvas = fabricCanvasRef.current;
    const imageElement = document.createElement("img");
    imageElement.src = stickerUrl;
    imageElement.alt = stickerUrl;

    imageElement.onload = () => {
      const image = new fabric.Image(imageElement);
      image.set({ left: 0, top: 0, scaleY: 0.05, scaleX: 0.05 });
      canvas.add(image);
      canvas.centerObject(image);
      canvas.setActiveObject(image);
    };
  };

  const handleSaveStickers = () => {
    console.log("saving stickers");
    const canvas = fabricCanvasRef.current;
    const dataUrl = canvas.toDataURL({ format: "png" });
    console.log("setting to" + dataUrl);
    setFrame((prevFrame) => ({
      ...prevFrame,
      stickers: dataUrl,
    }));
    navigate("/download");
  };

  return (
    <div>
      <BackHeader />
      <section className="options-c">
        <h1>Add sticker</h1>
        <section className="options-r">
          <div className="frame-wrapper">
            <canvas
              width={frameSize[frame.layout].width}
              height={frameSize[frame.layout].height}
              ref={canvasRef}
            />
            <Frame
              layout={frame.layout}
              filter={frame.filter}
              images={frame.images}
              design={frame.design}
            />
          </div>

          {/* File input for custom stickers */}
          <section className="options-box">
            <section>
              <p className="dropzone-label">Gallery</p>
              {stickers.map((sticker, idx) => (
                <img
                  key={idx}
                  className="sticker"
                  src={sticker}
                  alt={`Sticker ${idx + 1}`}
                  onClick={() => handleAddSticker(sticker)}
                />
              ))}
            </section>
            <section>
              <p className="dropzone-label">Upload</p>
              <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop your file here</p>
                ) : (
                  <p>
                    Drag and drop or{" "}
                    <span className="underline">click to upload</span>
                  </p>
                )}
              </div>
            </section>
          </section>
        </section>
        <button
          className="btn"
          onClick={() => {
            handleSaveStickers();
          }}
        >
          Continue
        </button>
      </section>
    </div>
  );
}

export default Sticker;
