import { useFrame, useFrameUpdate } from "../../hooks/FrameContext";
import Frame from "../../components/Frame/Frame";
import BackHeader from "../../components/BackHeader/BackHeader";
import { Link } from "react-router-dom";
import * as fabric from "fabric";
import { useRef, useEffect, useState } from "react";

// TODO -> make image scale to specified width x auto height
// TODO -> save canvas image in state (to be overlayed onto final frame)

import "./index.css";

function AddSticker() {
  const frame = useFrame();
  const setFrame = useFrameUpdate();

  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  // make sure fabric canvas is only created once
  useEffect(() => {
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current);

    return () => fabricCanvasRef.current.dispose();
  }, []);

  // add image to fabric canvas
  const handleAddImage = (e) => {
    const canvas = fabricCanvasRef.current;

    // read inputted image as url
    let imgObj = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(imgObj);

    reader.onload = (e) => {
      // create image element
      let imageUrl = e.target.result;
      let imageElement = document.createElement("img");
      imageElement.src = imageUrl;
      imageElement.alt = imgObj.name;

      // create fabric image and add to canvas
      imageElement.onload = function () {
        let image = new fabric.FabricImage(imageElement);
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

  return (
    <div>
      <BackHeader />
      <input
        type="file"
        accept="image/*"
        label="Add Sticker"
        onChange={handleAddImage}
      />
      <section>
        <h1>Add sticker</h1>
        <section>
          <div className="options-r frame-wrapper">
            {/* update this -> don't hard code */}
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
        </section>
        <Link className="btn" to="/download" role="button">
          Continue
        </Link>
      </section>
    </div>
  );
}

export default AddSticker;
