import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import placeholder from "../../assets/default-image.png";
import "./frame.css";

function Frame({ layout, images = [], filter, color, stickers }) {
  const [imgArr, setImgArr] = useState([]);

  useEffect(() => {
    const newImages = [];
    for (let i = 0; i < 4; i++) {
      newImages.push(images[i] || placeholder);
    }
    setImgArr(newImages);
  }, [images]);

  return (
    <div
      className={`frame frame-${layout} frame-${color}`}
      style={{
        backgroundImage: `url(${color})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {imgArr.map((img, index) => (
        <div key={index} className="img-wrapper">
          <img
            className={`img frame-${filter}`}
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
  color: PropTypes.string.isRequired,
  stickers: PropTypes.string,
};

export default Frame;
