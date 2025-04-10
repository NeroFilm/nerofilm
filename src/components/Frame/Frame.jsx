import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import placeholder from "../../assets/default-image.png";
import "./frame.css";

function Frame({ layout, images = [], filter, design, stickers }) {
  const [imgArr, setImgArr] = useState([]);

  useEffect(() => {
    const newImages = [];
    for (let i = 0; i < 4; i++) {
      newImages.push(images[i] || placeholder);
    }
    setImgArr(newImages);
  }, [images]);

  return (
    <div className={`frame frame-${layout}`}>
      <img className="frame-design" src={design} alt="" />
      {imgArr.map((img, index) => (
        <div key={index} className="frame-img-wrapper">
          <img
            className={`frame-img filter-${filter}`}
            src={img}
            alt={`image ${index + 1}`}
          />
        </div>
      ))}
      {stickers && <img className="frame-stickers" src={stickers} />}
    </div>
  );
}

Frame.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  filter: PropTypes.string.isRequired,
  layout: PropTypes.oneOf(["original", "wide"]).isRequired,
  design: PropTypes.string.isRequired,
  stickers: PropTypes.string,
};

export default Frame;
