import React from "react";
import CustomerTable from "./customerTable";
import Search from "./search";

class SearchableCustomerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ''
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    // TODO: Make date range user defined and set default values
    const dateRange = {
      startDate: new Date(2019, 2),
      endDate: new Date(2019, 4 + 1, 0, 23, 59, 59, 999),
      // TODO: Create months array based on date range
      months: [2, 3, 4], // months are 0 indexed (0 = Jan)
      // get UNIX times for date comparison
      get startTime() { return this.startDate.getTime() },
      get endTime() { return this.endDate.getTime() }
    }

    return (
        <React.Fragment>
          <Search
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange} />
          <CustomerTable
            filterText={this.state.filterText}
            customers={this.props.customers}
            dateRange={dateRange} />
        </React.Fragment>
    );
  }
}

export default SearchableCustomerTable;
