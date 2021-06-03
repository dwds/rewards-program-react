import React from "react";

function SearchField({
  id = "search",
  label = "Search",
  placeholder = "Search…",
  onChange,
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

export default SearchField;
