import React from "react";
import styles from "./InputField.module.css"
/**
 * InputField Component
 *
 * A reusable input field component designed for forms.
 * It supports standard input types, displays a label, and handles validation error messages.
 *
 * Props:
 * @param {string} label - The label text displayed above the input field.
 * @param {string} type - The type of input (e.g., "text", "email", "number", "password", etc.).
 * @param {string} name - The name and ID of the input field (used for form submission and accessibility).
 * @param {string|number} value - The current value of the input field (makes this a controlled component).
 * @param {function} onChange - Function called when the value of the input changes.
 * @param {string} placeholder - Placeholder text shown when the input is empty (optional).
 * @param {...any} rest - Additional props to pass down to the input element (e.g., `disabled`, `maxLength`, etc.).
 *
 * Usage:
 * <InputField
 *   label="Email"
 *   type="email"
 *   name="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   placeholder="Enter your email"
 *   error={emailError}
 * />
 */
const InputField = ({ label, type, name, value, onChange, placeholder, error=null, ...rest }) => {
  return (
    <div className={styles.inputFieldDiv}>
      {label && <label htmlFor={name} className={styles.label}>{label}</label>}
      <input
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
      {error && (
        <output className={styles.errorText}>
          {error}
        </output>
      )}
    </div>
  );
}

export default InputField;