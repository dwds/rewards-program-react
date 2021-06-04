import React, {useMemo} from "react";
import PropTypes from 'prop-types';
import CustomerRow from "./customerRow";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function createArrayFromInclusiveRange(min, max) {
  return Array.from(
    {length: max - min + 1},
    (value, index) => min + index
  )
}

function getMonthsFromDateRange(startDate, endDate) {
  if (startDate > endDate) return false;

  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endYear = startDate.getFullYear();
  const endMonth = endDate.getMonth();

  if (startYear === endYear) {
    return createArrayFromInclusiveRange(startMonth, endMonth);
  }

  const startYearMonths = createArrayFromInclusiveRange(startMonth, 11);
  const endYearMonths = createArrayFromInclusiveRange(0, endMonth);
  const fullYearMonths = [...Array(12).keys()];
  const middleYearsMonths = Array(endYear - startYear - 1).fill(fullYearMonths).flat();

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
    [customers]
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
          {months.map((month, index) => (
            <td key={index}>{monthNames[month]}</td>
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
