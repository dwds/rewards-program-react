import React from "react";
import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid';
import styles from './inputBase.module.css';

function InputBase({
  label,
  id = uuidv4(),
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
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(["date", "datetime-local", "email", "file", "hidden", "month", "number", "password", "search", "tel", "text", "time", "url", "week"]),
  value: PropTypes.any
};

export default InputBase;
