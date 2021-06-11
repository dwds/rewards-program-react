import React, {useMemo, useState} from "react";
import PropTypes from 'prop-types';
import CustomerTable from "./customerTable";
import SearchField from "./searchField";

function getEarliestTransactionDate(customers) {
  return customers.flatMap(customer => (
    customer.transactions.map(transaction => (
      transaction.date
    ))
  )).reduce((earliestDateSoFar, date) => date < earliestDateSoFar ? date : earliestDateSoFar);
}

function SearchableCustomerTable({customers}) {
  const [inputValues, setInputValues] = useState({
    searchFilter: "",
    startDate: getEarliestTransactionDate(customers).slice(0, 10),
    endDate: ""
  });
  
  const filteredCustomers = useMemo(
    () => customers.filter(customer => (
      customer.name.toLowerCase().includes(inputValues.searchFilter.toLowerCase())
      || customer.id.toLowerCase().includes(inputValues.searchFilter.toLowerCase())
    )),
    [customers, inputValues.searchFilter]
  );

  const handleChange = inputName => event => {
    setInputValues({
      ...inputValues,
      [inputName]: event.target.value
    })
  }

  return (
      <>
        <SearchField
          value={inputValues.searchFilter}
          label="Search for Customer"
          placeholder="Customer name or ID…"
          onChange={handleChange("searchFilter")} />
        <div>
          <label>
            Start Date:
            <input
              type="date"
              max={inputValues.endDate}
              value={inputValues.startDate}
              onChange={handleChange("startDate")}
            />
          </label>
        </div>
        <div>
          <label>
            End Date:
            <input
              type="date"
              min={inputValues.startDate}
              value={inputValues.endDate}
              onChange={handleChange("endDate")}
            />
          </label>
        </div>
        <CustomerTable
          customers={filteredCustomers}
          startDate={new Date(inputValues.startDate)}
          endDate={new Date(inputValues.endDate)} />
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
  }))
};

export default SearchableCustomerTable;
