import React from "react";
import PropTypes from 'prop-types';
import {InputBase} from '../inputBase';

function SearchField({
  label = "Search",
  onChange = null,
  placeholder = "Search…",
  value = "",
  ...other
}) {
  return (
    <InputBase
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
