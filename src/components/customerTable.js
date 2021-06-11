import React, {useMemo} from "react";
import PropTypes from 'prop-types';
import CustomerRow from "./customerRow";

function createArrayOfNumbersFromRange(min, max, inclusive = true) {
  const length = inclusive ? max - min + 1 : max - min - 1;
  return Array.from(
    {length: length},
    (value, index) => inclusive ? min + index : min + index + 1
  );
}

function getMonthsFromDateRange(startDate, endDate) {
  if ((startDate > endDate) || (isNaN(startDate) && isNaN(endDate))) return [];

  const startYear = startDate.getUTCFullYear();
  const startMonth = startDate.getUTCMonth();
  const endYear = endDate.getUTCFullYear();
  const endMonth = endDate.getUTCMonth();

  if (isNaN(startDate)) return [new Date(endYear, endMonth)];
  if (isNaN(endDate)) return [new Date(startYear, startMonth)];

  if (startYear === endYear) {
    const monthsInRange = createArrayOfNumbersFromRange(startMonth, endMonth);
    return monthsInRange.map(month => (
      new Date(startYear, month)
    ))
  }

  const startYearMonths = createArrayOfNumbersFromRange(startMonth, 11).map(month => new Date(startYear, month));

  const middleYears = createArrayOfNumbersFromRange(startYear, endYear, false);
  const middleYearsMonths = middleYears.map(middleYear => (
    [...Array(12).keys()].map(month => (
      new Date(middleYear, month)
    ))
  )).flat();

  const endYearMonths = createArrayOfNumbersFromRange(0, endMonth).map(month => new Date(endYear, month));

  return startYearMonths.concat(middleYearsMonths, endYearMonths);
}

function CustomerTable({
  customers,
  startDate,
  endDate
}) {
  const months = useMemo(
    () => getMonthsFromDateRange(startDate, endDate).slice(0, 4),
    [startDate, endDate]
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
            startDate={startDate}
            endDate={endDate}
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
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired
};

export default CustomerTable;
