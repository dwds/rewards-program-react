import React from "react";
import PropTypes from 'prop-types';

function SearchField({
  id = "search",
  label = "Search",
  onChange = null,
  placeholder = "Search…",
  value = ""
}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange} />
    </>
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
