import React from "react";
import PropTypes from 'prop-types';
import styles from './inputBase.module.css';

function InputBase({
  id,
  label,
  onChange = null,
  placeholder = null,
  type = "text",
  value = "",
  ...other
}) {
  return (
    <div className={styles.root}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...other} />
    </div>
  );
}

InputBase.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(["date", "datetime-local", "email", "file", "hidden", "month", "number", "password", "search", "tel", "text", "time", "url", "week"]),
  value: PropTypes.any
};

export default InputBase;
