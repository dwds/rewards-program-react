import React, {useMemo, useState} from "react";
import PropTypes from 'prop-types';
import styles from './searchableCustomerTable.module.css';
import {CustomerTable} from "../customerTable";
import {InputBase} from "../inputBase";
import {SearchField} from "../searchField";

// TODO: "No results" display

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
      <div className={styles.root}>
        <div className={styles.inputContainer}>
          <InputBase
            className={styles.startMonth}
            id="start-month"
            label="Start Month"
            max={inputValues.endDate}
            type="date"
            value={inputValues.startDate}
            onChange={handleChange("startDate")} />

          <InputBase
            className={styles.numberOfMonthsInput}
            id="number-of-months"
            label="Number of Months"
            min={1}
            max={maximumMonths}
            type="number"
            value={inputValues.numberOfMonths}
            onChange={handleChange("numberOfMonths")} />
        </div>

        <SearchField
          className={styles.searchInput}
          value={inputValues.searchFilter}
          label="Search for Customer"
          placeholder="Customer name or ID"
          onChange={handleChange("searchFilter")} />

        <CustomerTable
          customers={filteredCustomers}
          startMonth={new Date(inputValues.startDate)}
          numberOfMonths={inputValues.numberOfMonths} />
      </div>
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
