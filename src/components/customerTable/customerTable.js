import React, {useMemo} from "react";
import PropTypes from 'prop-types';
import {CustomerRow} from "../customerRow";

function getMonthsArray(startMonth, numberOfMonths) {
  let monthsArray = [];
  for(let monthIterator = 0; monthIterator < numberOfMonths; monthIterator++) {
    monthsArray.push(new Date(startMonth.getUTCFullYear(), startMonth.getUTCMonth() + monthIterator));
  }
  return monthsArray;
}

function CustomerTable({
  customers,
  startMonth,
  numberOfMonths = 3
}) {
  const months = useMemo(
    () => getMonthsArray(startMonth, numberOfMonths),
    [startMonth, numberOfMonths]
  );

  return (
    <table className="pure-table pure-table-horizontal">
      <colgroup span="2"></colgroup>
      <colgroup span={months.length + 1}></colgroup>

      <thead>
        <tr className="top-table-header">
          <th colSpan="2" scope="colgroup">Customer</th>
          <th colSpan={months.length + 1} scope="colgroup">Points Earned</th>
        </tr>
        <tr className="second-table-header">
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          {months.map((month) => (
            <th key={month.toString()}>
              {month.toLocaleString("en-US", {month: "long"})}
            </th>
          ))}
          <th scope="col">Total</th>
        </tr>
      </thead>

      <tbody>
        {customers.map(customer => (
          <CustomerRow
            customer={customer}
            months={months}
            key={customer.id} />
        ))}
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
  })).isRequired,
  startMonth: PropTypes.instanceOf(Date).isRequired,
  numberOfMonths: PropTypes.number
};

export default CustomerTable;
