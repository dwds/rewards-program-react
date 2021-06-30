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

function SearchableCustomerTable({
  customers,
  maximumMonths = 6
}) {
  const [inputValues, setInputValues] = useState({
    searchFilter: "",
    startDate: getEarliestTransactionDate(customers).slice(0, 10),
    numberOfMonths: Math.round(maximumMonths / 2)
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
          onChange={handleChange("searchFilter")}
        />
        <div>
          <label>
            Number of Months:
            <input
              type="number"
              min={1}
              max={maximumMonths}
              value={inputValues.numberOfMonths}
              onChange={handleChange("numberOfMonths")}
            />
          </label>
        </div>
        <div>
          <label>
            Start Month:
            <input
              type="date"
              max={inputValues.endDate}
              value={inputValues.startDate}
              onChange={handleChange("startDate")}
            />
          </label>
        </div>

        <CustomerTable
          customers={filteredCustomers}
          startMonth={new Date(inputValues.startDate)}
          numberOfMonths={inputValues.numberOfMonths} />
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
  })).isRequired,
  maximumMonths: PropTypes.number
};

export default SearchableCustomerTable;
