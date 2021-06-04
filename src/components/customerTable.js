import React from "react";
import PropTypes from 'prop-types';
import CustomerRow from "./customerRow";

function CustomerTable({
  customers,
  dateRange,
  searchFilter = "",
  locale = "en-US"
}) {
  const lowercaseSearchFilter = searchFilter?.toLocaleLowerCase(locale);
  const rows = [];

  customers.forEach((customer) => {
    if (customer.name.toLocaleLowerCase(locale).indexOf(lowercaseSearchFilter) === -1 &&
        customer.ID.toLocaleLowerCase(locale).indexOf(lowercaseSearchFilter) === -1) {
      return;
    }
    rows.push(
      <CustomerRow
        customer={customer}
        dateRange={dateRange}
        key={customer.ID} />
    );
  });

  // TODO: Make month names dynamic
  return (
    <table className="pure-table pure-table-horizontal">
      <colgroup span="2"></colgroup>
      <colgroup span="4"></colgroup>

      <thead>
        <tr className="top-table-header">
          <th colSpan="2" scope="colgroup">Customer</th>
          <th colSpan="4" scope="colgroup">Points Earned</th>
        </tr>
        <tr className="second-table-header">
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">March</th>
          <th scope="col">April</th>
          <th scope="col">May</th>
          <th scope="col">Total</th>
        </tr>
      </thead>

      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

CustomerTable.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    transactions: PropTypes.arrayOf(PropTypes.shape({
      transactionNumber: PropTypes.string,
      date: PropTypes.string,
      total: PropTypes.number
    }))
  })),
  dateRange: PropTypes.object,
  searchFilter: PropTypes.string,
  locale: PropTypes.string,
};

export default CustomerTable;
