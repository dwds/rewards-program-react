import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  render() {
    const filterText = this.props.filterText;
    return (
      <form>
        <label htmlFor="customer-search">Search for customer</label>
        <input
          id="customer-search"
          type="search"
          placeholder="Customer name or ID…"
          value={filterText}
          onChange={this.handleFilterTextChange} />
      </form>
    );
  }
}

export default Search;
