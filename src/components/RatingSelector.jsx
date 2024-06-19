import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const RatingSelector = ({
  start,
  end,
  label,
  colorType,
  onChange,
  error,
  selectedValue,
  name,
}) => {
  const [value, setValue] = useState(selectedValue);

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  const handleSelect = (rating) => {
    setValue(rating.toString());
    onChange(name, rating.toString());
  };

  const generateColors = (num, type) => {
    const colors = [];
    if (type === "default") {
      for (let i = 0; i < num; i++) {
        colors.push("rgba(255, 255, 255, 0.4)");
      }
    } else if (type === "gradient") {
      for (let i = 0; i < num; i++) {
        const red = Math.round((255 * (num - i - 1)) / (num - 1));
        const green = Math.round((255 * i) / (num - 1));
        colors.push(`rgba(${red}, ${green}, 0, 0.6)`);
      }
    } else if (type === "nps") {
      const greenCount = Math.round(num * 0.6);
      const yellowCount = Math.round(num * 0.2);
      const redCount = num - greenCount - yellowCount;
      for (let i = 0; i < greenCount; i++) {
        colors.push("rgba(255, 99, 71, 0.9)");
      }
      for (let i = 0; i < yellowCount; i++) {
        colors.push("rgba(255, 255, 102, 0.9)");
      }
      for (let i = 0; i < redCount; i++) {
        colors.push("rgba(144, 238, 144, 0.9)");
      }
    }
    return colors;
  };

  const count = end - start + 1;
  const colors = generateColors(count, colorType);

  return (
    <div className="mb-2 text-white">
      {label && (
        <label className="block mb-2 text-sm font-medium">{label}</label>
      )}
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
          (val, index) => (
            <div
              key={index}
              onClick={() => handleSelect(val)}
              style={{
                backgroundColor: colors[index],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border:
                  val.toString() === value
                    ? "3px solid white"
                    : "1px solid gray",
              }}
              className="rounded-lg w-12 h-12"
            >
              {val}
            </div>
          )
        )}
      </div>
      <input type="hidden" name={name} value={value} onChange={() => {}} />
      {error && <p className="text-red-500 text-[11px] px-2 pt-1">{error}</p>}
    </div>
  );
};

RatingSelector.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  label: PropTypes.string,
  colorType: PropTypes.oneOf(["default", "gradient", "nps"]).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  isOptional: PropTypes.bool,
  selectedValue: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default RatingSelector;
