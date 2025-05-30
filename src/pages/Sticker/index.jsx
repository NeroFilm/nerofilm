import { useFrame, useFrameUpdate } from "../../hooks/useFrame";
import Frame from "../../components/Frame/Frame";
import BackHeader from "../../components/BackHeader/BackHeader";
import * as fabric from "fabric";
import { useRef, useEffect, useCallback } from "react";
import { frameSize } from "../../constants/frames";
import { useNavigate } from "react-router-dom";
import useRefreshWarning from "../../hooks/useRefreshWarning";
import { useDropzone } from "react-dropzone";

import flower from "../../assets/stickers/flower.svg";
import diamond from "../../assets/stickers/diamond.svg";
import diamondWide from "../../assets/stickers/diamond-wide.svg";

import "./index.css";

// Predefined stickers
const stickers = [flower, diamond, diamondWide];

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
  // Initialize fabric canvas and update dimensions dynamically
  useEffect(() => {
    if (!canvasRef.current) return;

    if (!fabricCanvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current);
    }

    // Determine new dimensions based on the selected frame layout
    const newSize =
      frame.layout === "original"
        ? { width: 122, height: 362 } // 4 Cut Original
        : { width: 244, height: 362 }; // 4 Cut Wide

    // Update both the Fabric canvas and the HTML canvas dimensions
    fabricCanvasRef.current.setDimensions(newSize);
    canvasRef.current.width = newSize.width;
    canvasRef.current.height = newSize.height;

    // Ensure all objects fit within new size
    fabricCanvasRef.current.getObjects().forEach((obj) => {
      obj.left = Math.min(obj.left, newSize.width - 10);
      obj.top = Math.min(obj.top, newSize.height - 10);
    });

    fabricCanvasRef.current.renderAll();

    return () => {
      fabricCanvasRef.current.dispose();
    };
  }, [frame.layout]); // Runs whenever `frame.layout` changes

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

      const aspectRatio = image.height / image.width;
      const newWidth = 50;
      const scaleX = newWidth / image.width;
      const scaleY = scaleX * aspectRatio;

      image.set({
        left: 0,
        top: 0,
        scaleX: scaleX,
        scaleY: scaleY,
        hasBorders: true,
        hasControls: true,
        lockScalingFlip: true,
        cornerSize: 12,
        cornerColor: "transparent",
        cornerStyle: "circle",
        transparentCorners: true,
        borderColor: "rgba(255, 255, 255, 0.5)",
      });
      canvas.add(image);
      canvas.centerObject(image);
      canvas.setActiveObject(image);
    };
  };

  const handleSaveStickers = () => {
    const canvas = fabricCanvasRef.current;
    const scaleFactor = 8;

    const originalWidth = frame.layout === "original" ? 122 : 244;
    const originalHeight = 362;

    // set higher resolution
    canvas.setWidth(originalWidth * scaleFactor);
    canvas.setHeight(originalHeight * scaleFactor);

    // scale objects to match new resolution
    canvas.getObjects().forEach((object) => {
      object.set({
        scaleX: object.scaleX * scaleFactor,
        scaleY: object.scaleY * scaleFactor,
        left: object.left * scaleFactor,
        top: object.top * scaleFactor,
      });
      object.setCoords();
    });

    // generate the PNG with higher quality
    const dataUrl = canvas.toDataURL({ format: "png", quality: 1 });

    // reset the canvas resolution back to the original
    canvas.setWidth(originalWidth);
    canvas.setHeight(originalHeight);

    // set the sticker data in the frame and navigate
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
        <h1 className="options-heading">Add Stickers</h1>
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
              <p className="options-box-label">Gallery</p>
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
              <p className="options-box-label">Upload</p>
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
