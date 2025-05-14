import React from "react";

export default function SelectField({ label, options = [], value = "", onChange, required = false }) {
  return (
    <div className="form-group mb-3">
      {label ? <label htmlFor={label} className="form-label">{label}</label> : null}
      <select
        id={label}
        className="form-select"
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Select</option>
        {Array.isArray(options) && options.map((item, index) => {
          return (
            <option key={index} value={item.value || ""}>
              {item.title || ""}
            </option>
          );
        })}
      </select>
    </div>
  );
}
