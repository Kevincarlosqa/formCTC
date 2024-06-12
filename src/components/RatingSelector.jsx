import { useState } from "react";
import PropTypes from "prop-types";

const RatingSelector = ({ count, label }) => {
  const [selectedRating, setSelectedRating] = useState(null);

  const handleSelect = (rating) => {
    setSelectedRating(rating);
    // Aquí puedes hacer el POST a tu backend
    console.log(`Selected rating: ${rating}`);
    // Ejemplo de un POST usando fetch (ajusta la URL y los datos según sea necesario)
    // fetch('https://tu-backend-api.com/ratings', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ rating }),
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch(error => console.error('Error:', error));
  };

  const generateColors = (num) => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      const red = Math.round((255 * (num - i - 1)) / (num - 1));
      const green = Math.round((255 * i) / (num - 1));
      colors.push(`rgb(${red}, ${green}, 0)`);
    }
    return colors;
  };

  const colors = generateColors(count);

  return (
    <div className="mb-5 text-white">
      {label && (
        <label className="block mb-2 text-sm font-medium">{label}</label>
      )}
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {colors.map((color, index) => (
          <div
            key={index}
            onClick={() => handleSelect(index + 1)}
            style={{
              backgroundColor: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border:
                selectedRating === index + 1
                  ? "3px solid blue"
                  : "1px solid gray",
            }}
            className="rounded-lg w-12 h-12"
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

RatingSelector.propTypes = {
  count: PropTypes.number.isRequired,
  label: PropTypes.string,
};

export default RatingSelector;
