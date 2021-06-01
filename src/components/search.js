import React from "react";

function Search({
  onChange,
  filterText
}) {
  return (
    <form>
      <label htmlFor="customer-search">Search for customer</label>
      <input
        id="customer-search"
        type="search"
        placeholder="Customer name or ID…"
        value={filterText}
        onChange={onChange} />
    </form>
  );
}

export default Search;
