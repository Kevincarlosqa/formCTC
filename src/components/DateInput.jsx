import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const generateOptions = (start, end) => {
  const options = [];
  for (let i = start; i <= end; i++) {
    options.push(i.toString().padStart(2, "0"));
  }
  return options;
};

const days = generateOptions(1, 31);
const months = generateOptions(1, 12);
const years = generateOptions(1995, 2020);

const formatDate = (day, month, year) => {
  return `${day}/${month}/${year}`;
};

const parseDate = (dateString) => {
  if (!dateString) return { day: "", month: "", year: "" };
  const [day, month, year] = dateString.split("/").map(Number);
  return {
    day: day.toString().padStart(2, "0"),
    month: month.toString().padStart(2, "0"),
    year: year.toString(),
  };
};

const DateInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  example,
  error,
  isOptional,
}) => {
  const initialDate = parseDate(value);
  const [day, setDay] = useState(initialDate.day);
  const [month, setMonth] = useState(initialDate.month);
  const [year, setYear] = useState(initialDate.year);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (day && month && year) {
      const formattedDate = formatDate(day, month, year);
      onChange(name, formattedDate);
      setShowError(false);
    } else if (day || month || year) {
      setShowError(true);
    }
  }, [day, month, year]);

  return (
    <div className="mb-1 text-white">
      <label htmlFor={name} className="block mb-2 text-sm font-medium">
        {label}
        {isOptional && <span className="text-gray-500"> (Opcional)</span>}
      </label>
      <div className="grid grid-cols-3 gap-2">
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="bg-black/40 text-white p-2 rounded w-full"
        >
          <option value="" disabled>
            Día
          </option>
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="bg-black/40 text-white p-2 rounded w-full"
        >
          <option value="" disabled>
            Mes
          </option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="bg-black/40 text-white p-2 rounded w-full"
        >
          <option value="" disabled>
            Año
          </option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <input type="hidden" name={name} value={formatDate(day, month, year)} />
      {example && <p className="text-[11px] px-2 pt-1">{example}</p>}
      {(error || showError) && (
        <p className="text-red-500 text-[11px] px-2 pt-1">
          {error || "Por favor, selecciona el día, mes y año."}
        </p>
      )}
    </div>
  );
};

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  example: PropTypes.string,
  error: PropTypes.string,
  isOptional: PropTypes.bool,
};

export default DateInput;
