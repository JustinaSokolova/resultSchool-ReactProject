import React from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

const SelectField = ({
  label,
  value,
  name,
  onChange,
  defaultOption,
  options,
  error,
}) => {
  const getInputClasses = () => {
    return "form-select rounded-left " + (error ? "is-invalid" : "");
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.values(options)
      : options;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option value={option.value} key={nanoid()}>
              {option.label}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  defaultOption: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default SelectField;
