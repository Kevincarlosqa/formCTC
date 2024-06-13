// eslint-disable-next-line react/prop-types
const Select = ({ label, options, placeholder }) => {
  return (
    <div>
      <label
        htmlFor="countries"
        className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
      >
        {label}
      </label>
      <select
        id="countries"
        name="pais"
        // value={formData.pais}
        // onChange={handleChange}
        className="border border-white text-sm rounded-lg block w-full p-2.5 bg-[#1E2E3F] placeholder-blue-800 text-white"
      >
        <option value="" selected disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
