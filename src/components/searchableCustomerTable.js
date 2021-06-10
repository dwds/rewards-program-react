import React, {useMemo, useState} from "react";
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

  const filteredCustomers = useMemo(
    () => customers.filter(customer => (
      customer.name.toLowerCase().includes(searchFilter.toLowerCase())
      || customer.id.toLowerCase().includes(searchFilter.toLowerCase())
    )),
    [customers, searchFilter]
  );

  return (
      <>
        <SearchField
          value={searchFilter}
          label="Search for Customer"
          placeholder="Customer name or ID…"
          onChange={handleSearchFilterChange} />
        <CustomerTable
          customers={filteredCustomers}
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
