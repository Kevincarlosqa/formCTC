import { useState } from "react";
import PropTypes from "prop-types";
import "./CheckboxGroup.css";

const CheckboxGroup = ({ label, options }) => {
  const [checkedItems, setCheckedItems] = useState(
    options.reduce((acc, option) => {
      acc[option.value] = option.checked || false;
      return acc;
    }, {})
  );

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
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
            checkedItems[option.value] ? "bg-black/40" : "bg-transparent"
          }`}
        >
          <input
            id={option.value}
            type="checkbox"
            name={option.value}
            checked={checkedItems[option.value]}
            onChange={handleCheckboxChange}
            className="custom-checkbox w-4 h-4 text-blue-600 bg-transparent border-white rounded focus:ring-blue-500"
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

CheckboxGroup.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      checked: PropTypes.bool,
    })
  ).isRequired,
};

export default CheckboxGroup;
