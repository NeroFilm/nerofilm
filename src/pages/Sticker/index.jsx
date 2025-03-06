import { useFrame, useFrameUpdate } from "../../hooks/FrameContext";
import Frame from "../../components/Frame/Frame";
import BackHeader from "../../components/BackHeader/BackHeader";
import { Link } from "react-router-dom";
import * as fabric from "fabric";
import { useRef, useEffect } from "react";

import test1 from "../../assets/stickers/1.png";
import test2 from "../../assets/stickers/2.webp";
import test3 from "../../assets/stickers/3.webp";

// TODO -> make image scale to specified width x auto height
// TODO -> save canvas image in state (to be overlayed onto final frame)

import "./index.css";

function Sticker() {
  const frame = useFrame();
  const setFrame = useFrameUpdate();

  const test = [test1, test2, test3];

  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  // Make sure fabric canvas is only created once
  useEffect(() => {
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current);

    return () => fabricCanvasRef.current.dispose();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        const canvas = fabricCanvasRef.current;
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          canvas.remove(activeObject);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown); // Clean up the event listener
    };
  }, []);

  // Add custom image to fabric canvas (from file input)
  const handleAddImage = (e) => {
    const canvas = fabricCanvasRef.current;

    // Read inputted image as URL
    let imgObj = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(imgObj);

    reader.onload = (e) => {
      // Create image element
      let imageUrl = e.target.result;
      let imageElement = document.createElement("img");
      imageElement.src = imageUrl;
      imageElement.alt = imgObj.name;

      // Create fabric image and add to canvas
      imageElement.onload = function () {
        let image = new fabric.Image(imageElement);
        image.set({
          left: 0,
          top: 0,
          scaleY: 0.05,
          scaleX: 0.05,
        });
        canvas.add(image);
        canvas.centerObject(image);
        canvas.setActiveObject(image);
      };
    };
  };

  // Add sticker image (from predefined stickers) to fabric canvas
  const handleAddSticker = (stickerUrl) => {
    const canvas = fabricCanvasRef.current;

    // Create image element for the sticker
    let imageElement = document.createElement("img");
    imageElement.src = stickerUrl;
    imageElement.alt = stickerUrl;

    // Create fabric image and add to canvas
    imageElement.onload = function () {
      let image = new fabric.Image(imageElement);
      image.set({
        left: 0,
        top: 0,
        scaleY: 0.05,
        scaleX: 0.05,
      });
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
              style={{
                border: "1px dotted black",
              }}
              ref={canvasRef}
            />
            <Frame
              layout={frame.layout}
              filter={frame.filter}
              images={frame.images}
              color={frame.color}
            />
          </div>

          {/* File input for adding custom stickers */}
          <input
            type="file"
            accept="image/*"
            label="Add Sticker"
            onChange={handleAddImage}
          />

          <div>
            {/* Display predefined stickers and allow clicking to add them */}
            {test.map((sticker, idx) => (
              <img
                className="sticker"
                key={idx}
                src={sticker}
                onClick={() => handleAddSticker(sticker)} // Add sticker on click
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
