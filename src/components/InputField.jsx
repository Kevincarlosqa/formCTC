import PropTypes from "prop-types";

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  example,
  type,
  error,
  isOptional,
}) => {
  const handleChange = (event) => {
    const { value } = event.target;
    if (type === "number" && isNaN(value)) {
      return; // Si no es un número, no actualiza el estado
    }
    onChange(name, value);
  };

  return (
    <div className="mb-1 text-white">
      <label htmlFor={name} className="block mb-2 text-sm font-medium">
        {label}
        {isOptional && <span className="text-gray-500"> (Opcional)</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="shadow-sm bg-black/40 border border-gray-600 text-sm rounded-lg block w-full p-2.5"
      />
      {example && <p className="text-[11px] px-2 pt-1">{example}</p>}
      {!isOptional && !value && (
        <p className="text-red-500 text-[11px] px-2 pt-1">
          Este campo es requerido
        </p>
      )}
      {error && <p className="text-red-500 text-[11px] px-2 pt-1">{error}</p>}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  example: PropTypes.string,
  type: PropTypes.oneOf(["text", "number", "email"]).isRequired,
  error: PropTypes.string,
  isOptional: PropTypes.bool,
};

export default InputField;
