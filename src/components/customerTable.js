import React, {useMemo} from "react";
import PropTypes from 'prop-types';
import CustomerRow from "./customerRow";

function createArrayFromRange(min, max, inclusive = true) {
  const length = inclusive ? max - min + 1 : max - min - 1;
  return Array.from(
    {length: length},
    (value, index) => inclusive ? min + index : min + index + 1
  );
}

function getMonthsFromDateRange(startDate, endDate) {
  if (startDate > endDate) return false;

  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endYear = startDate.getFullYear();
  const endMonth = endDate.getMonth();

  if (startYear === endYear) {
    const monthsInRange = createArrayFromRange(startMonth, endMonth);
    return monthsInRange.map(month => (
      new Date(startYear, month)
    ))
  }

  const startYearMonths = createArrayFromRange(startMonth, 11).map(month => new Date(startYear, month));

  const middleYears = createArrayFromRange(startYear, endYear, false);
  const middleYearsMonths = middleYears.map(middleYear => (
    [...Array(12).keys()].map(month => (
      new Date(middleYear, month)
    ))
  )).flat();

  const endYearMonths = createArrayFromRange(0, endMonth).map(month => new Date(endYear, month));

  return startYearMonths.concat(middleYearsMonths, endYearMonths);
}

function CustomerTable({
  customers,
  startDate,
  endDate,
  maximumMonths = 6,
  searchFilter = ""
}) {
  const months = useMemo(
    () => getMonthsFromDateRange(startDate, endDate).slice(0, maximumMonths - 1),
    [startDate, endDate, maximumMonths]
  );

  const filteredCustomers = useMemo(
    () => customers.filter(customer => (
      customer.name.toLowerCase().includes(searchFilter.toLowerCase())
      || customer.id.toLowerCase().includes(searchFilter.toLowerCase())
    )),
    [customers, searchFilter]
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
            <td key={month.toString()}>
              {month.toLocaleString("en-US", {month: "long"})}
            </td>
          ))}
          <th scope="col">Total</th>
        </tr>
      </thead>

      <tbody>
        {filteredCustomers.map(customer => (
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
  endDate: PropTypes.instanceOf(Date).isRequired,
  maximumMonths: PropTypes.number,
  searchFilter: PropTypes.string,
};

export default CustomerTable;
