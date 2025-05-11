import React from "react";

function InputField({ label, type, name, value, onChange, placeholder, className = "", ...rest }) {
  return (
    <div className={`${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="default-input-styles"
        {...rest}
      />
    </div>
  );
}

export default InputField;