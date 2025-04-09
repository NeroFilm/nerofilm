import PropTypes from "prop-types";
import "./options.css";
import { playClickSound } from "../../utils/soundUtils";

function Options({ options, onClick, selected, isFilter }) {
  return (
    <ul className="options">
      {options.map((option, index) => (
        <li
          key={index}
          className="option"
          onClick={() => {
            onClick(option.name);
            playClickSound();
          }}
        >
          <div
            className={`option-img-wrapper
              ${selected === option.name ? "option-img-selected" : ""}`}
          >
            <img
              className={`option-img 
              ${isFilter ? `frame-${option.name}` : ""}`}
              src={option.image}
              alt={option.name}
            />
          </div>
          <p>{option.name}</p>
        </li>
      ))}
    </ul>
  );
}

Options.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  isFilter: PropTypes.bool,
};

export default Options;
