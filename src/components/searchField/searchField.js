import React from "react";
import PropTypes from 'prop-types';
// import styles from './searchField.module.css';
import {InputBase} from '../inputBase';

function SearchField({
  id = "search",
  label = "Search",
  onChange = null,
  placeholder = "Search…",
  value = "",
  ...other
}) {
  return (
    <InputBase
      id={id}
      label={label}
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...other}
    />
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
