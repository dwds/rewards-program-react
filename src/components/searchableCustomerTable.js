import React, {useState} from "react";
import PropTypes from 'prop-types';
import CustomerTable from "./customerTable";
import SearchField from "./searchField";

function SearchableCustomerTable({customers}) {
  const [searchFilter, setSearchFilter] = useState("");

  function handleSearchFilterChange(event){
    setSearchFilter(event.target.value);
  }
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
        <SearchField
          value={searchFilter}
          label="Search for Customer"
          placeholder="Customer name or ID…"
          onChange={handleSearchFilterChange} />
        <CustomerTable
          searchFilter={searchFilter}
          customers={customers}
          dateRange={dateRange} />
      </React.Fragment>
  );
}

SearchableCustomerTable.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    transactions: PropTypes.arrayOf(PropTypes.shape({
      transactionNumber: PropTypes.string,
      date: PropTypes.string,
      total: PropTypes.number
    }))
  }))
};

export default SearchableCustomerTable;
