import { useFrame, useFrameUpdate } from "../../hooks/FrameContext";
import Frame from "../../components/Frame/Frame";
import BackHeader from "../../components/BackHeader/BackHeader";
import { Link } from "react-router-dom";
import * as fabric from "fabric";
import { useRef, useEffect } from "react";

import test1 from "../../assets/stickers/1.png";
import test2 from "../../assets/stickers/2.webp";
import test3 from "../../assets/stickers/3.webp";

import "./index.css";

// Predefined stickers
const stickers = [test1, test2, test3];

function Sticker() {
  const frame = useFrame();
  const setFrame = useFrameUpdate();

  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

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

  // Add custom image to fabric canvas (from file input)
  const handleAddImage = (e) => {
    const canvas = fabricCanvasRef.current;
    const imgObj = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imgObj);

    reader.onload = (e) => {
      const imageElement = document.createElement("img");
      imageElement.src = e.target.result;
      imageElement.alt = imgObj.name;

      imageElement.onload = () => {
        const image = new fabric.Image(imageElement);
        image.set({ left: 0, top: 0, scaleY: 0.05, scaleX: 0.05 });
        canvas.add(image);
        canvas.centerObject(image);
        canvas.setActiveObject(image);
      };
    };
  };

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

  return (
    <div>
      <BackHeader />
      <section className="options-c">
        <h1>Add sticker</h1>
        <section className="options-r">
          <div className="frame-wrapper">
            <canvas
              width="120"
              height="360"
              style={{ border: "1px dotted black" }}
              ref={canvasRef}
            />
            <Frame
              layout={frame.layout}
              filter={frame.filter}
              images={frame.images}
              color={frame.color}
            />
          </div>

          {/* File input for custom stickers */}
          <input type="file" accept="image/*" onChange={handleAddImage} />

          <div>
            {/* Predefined stickers */}
            {stickers.map((sticker, idx) => (
              <img
                key={idx}
                className="sticker"
                src={sticker}
                alt={`Sticker ${idx + 1}`}
                onClick={() => handleAddSticker(sticker)}
              />
            ))}
          </div>
        </section>

        <Link className="btn" to="/download" role="button">
          Continue
        </Link>
      </section>
    </div>
  );
}

export default Sticker;
