// TURN OFF CAMERA HERE
import { useFrame, useFrameUpdate } from "../../hooks/FrameContext";
import Frame from "../../components/Frame/Frame";
import { useState } from "react";
import "./index.css"
import { useNavigate } from "react-router-dom";
import BackHeader from "../../components/BackHeader/BackHeader";
import useRefreshWarning from "../../hooks/useRefreshWarning";

// add validation -> four images selected

function SelectPhotos() {
  useRefreshWarning();

  const navigate = useNavigate();
  const frame = useFrame();
  const setFrame = useFrameUpdate();

  const [selected, setSelected] = useState([]);

  function toggleSelect(image){
    if (selected.includes(image)){
      setSelected(selected.filter(selectedImages => selectedImages != image));
    }
    else if (selected.length < 4) {
      setSelected([...selected, image])
    }
  }

  function onClick(){
    if (selected.length == 4){
      setFrame({ ...frame, images: selected });
      navigate("/choose-frame");
    }
  }

  return (
    <div>
      <BackHeader />
      <section className="options-c">
        <h1>Select photos</h1>
        <div className="options-r">
          <ul className="image-options">
            {frame.images.map((image, key) => {
              return (
                <li
                  key={key}
                  className={`${
                    selected.includes(image)
                      ? "image-option image-selected"
                      : "image-option"
                  }`}
                  onClick={() => toggleSelect(image)}
                >
                  <p
                    className={
                      selected.includes(image) ? "selected-num num" : "num"
                    }
                  >
                    {selected.indexOf(image) + 1}
                  </p>
                  <img src={image} alt={`image ${key}`} />
                </li>
              );
            })}
          </ul>
          <Frame
            filter={frame.filter}
            images={selected}
            layout={frame.layout}
            color={frame.color}
          />
        </div>
        <button className="btn" onClick={() => onClick()}>
          Continue
        </button>
      </section>
    </div>
  );
}

export default SelectPhotos;
