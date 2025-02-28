import PropTypes from "prop-types";
import "./options.css";
import { playClickSound } from "../../utils/soundUtils";

function Options({ options, onClick, selected }) {
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
          <img
            className={
              selected === option.name
                ? "option-img-selected option-img"
                : "option-img"
            }
            src={option.image}
            alt={option.name}
          />
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
};

export default Options;
