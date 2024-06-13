import { useState } from "react";
import PropTypes from "prop-types";

const RatingSelector = ({ start, end, label, colorType }) => {
  const [selectedRating, setSelectedRating] = useState(null);

  const handleSelect = (rating) => {
    setSelectedRating(rating);
    // Aquí puedes hacer el POST a tu backend
    console.log(`Selected rating: ${rating}`);
  };

  const generateColors = (num, type) => {
    const colors = [];
    if (type === "default") {
      for (let i = 0; i < num; i++) {
        colors.push("rgba(255, 255, 255, 0.8)"); // Color blanco pastel
      }
    } else if (type === "gradient") {
      for (let i = 0; i < num; i++) {
        const red = Math.round((255 * (num - i - 1)) / (num - 1));
        const green = Math.round((255 * i) / (num - 1));
        colors.push(`rgba(${red}, ${green}, 0, 0.6)`); // Color pastel
      }
    } else if (type === "nps") {
      const greenCount = Math.round(num * 0.6);
      const yellowCount = Math.round(num * 0.2);
      const redCount = num - greenCount - yellowCount;
      for (let i = 0; i < greenCount; i++) {
        colors.push("rgba(144, 238, 144, 0.6)"); // Pastel green
      }
      for (let i = 0; i < yellowCount; i++) {
        colors.push("rgba(255, 255, 102, 0.6)"); // Pastel yellow
      }
      for (let i = 0; i < redCount; i++) {
        colors.push("rgba(255, 99, 71, 0.6)"); // Pastel red
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
        {Array.from({ length: count }, (_, i) => start + i).map(
          (value, index) => (
            <div
              key={index}
              onClick={() => handleSelect(value)}
              style={{
                backgroundColor: colors[index],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border:
                  selectedRating === value
                    ? "3px solid blue"
                    : "1px solid gray",
              }}
              className="rounded-lg w-12 h-12"
            >
              {value}
            </div>
          )
        )}
      </div>
    </div>
  );
};

RatingSelector.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  label: PropTypes.string,
  colorType: PropTypes.oneOf(["default", "gradient", "nps"]).isRequired,
};

export default RatingSelector;
