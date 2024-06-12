import { useState } from "react";
import PropTypes from "prop-types";
import "./RadioGroup.css";

const RadioGroup = ({ label, options, name }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelectedItem(value);
  };

  return (
    <div className="text-white">
      {label && (
        <label className="block mb-2 text-sm font-medium">{label}</label>
      )}
      {options.map((option) => (
        <div
          key={option.value}
          className={`flex items-center ps-4 border border-white rounded-3xl mb-2 ${
            selectedItem === option.value ? "bg-black/40" : "bg-transparent"
          }`}
        >
          <input
            id={option.value}
            type="radio"
            name={name}
            value={option.value}
            checked={selectedItem === option.value}
            onChange={handleRadioChange}
            className="custom-radio w-4 h-4 text-blue-600 bg-transparent border-white rounded focus:ring-blue-500"
          />
          <label
            htmlFor={option.value}
            className="w-full py-2 ms-2 text-sm font-medium"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

RadioGroup.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
};

export default RadioGroup;
