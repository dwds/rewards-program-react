import React, {useState} from "react";
import PropTypes from 'prop-types';
import CustomerTable from "./customerTable";
import SearchField from "./searchField";

function SearchableCustomerTable({
  customers,
  startDate,
  endDate
}) {
  const [searchFilter, setSearchFilter] = useState("");

  function handleSearchFilterChange(event){
    setSearchFilter(event.target.value);
  }

  return (
      <>
        <SearchField
          value={searchFilter}
          label="Search for Customer"
          placeholder="Customer name or ID…"
          onChange={handleSearchFilterChange} />
        <CustomerTable
          searchFilter={searchFilter}
          customers={customers}
          startDate={startDate}
          endDate={endDate} />
      </>
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
  })),
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date)
};

export default SearchableCustomerTable;
