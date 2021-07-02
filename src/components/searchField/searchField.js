import React from "react";
import PropTypes from 'prop-types';
import styles from './searchField.module.css';

function SearchField({
  id = "search",
  label = "Search",
  onChange = null,
  placeholder = "Search…",
  value = ""
}) {
  return (
    <div className={styles.root}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange} />
    </div>
  );
}

SearchField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string
};

export default SearchField;
