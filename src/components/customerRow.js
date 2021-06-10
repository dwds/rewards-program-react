import React, {useMemo} from "react";
import PropTypes from 'prop-types';

function calculatePointsForPurchase(purchaseTotal, pointOptions = {}) {
  const {
    lowerPointValue = 1,
    minimumValueForLowerPointValue = 50,
    higherPointValue = 2,
    minimumTotalForHigherPointValue = 100
  } = pointOptions;

  const wholeDollarTotal = Math.floor(purchaseTotal);

  if (wholeDollarTotal > minimumTotalForHigherPointValue) {
    return (
      (higherPointValue *
        (wholeDollarTotal - minimumTotalForHigherPointValue)
      ) +
      (lowerPointValue *
        (minimumTotalForHigherPointValue - minimumValueForLowerPointValue)
      )
    );
  } else if (wholeDollarTotal > minimumValueForLowerPointValue) {
    return lowerPointValue * (wholeDollarTotal - minimumValueForLowerPointValue);
  }
  return 0;
}

function calculatePointTotal(transactions) {
  const purchaseTotals = transactions.map(transaction => transaction.total);
  const pointTotals = purchaseTotals.map(purchaseTotal => calculatePointsForPurchase(purchaseTotal));
  return pointTotals.reduce((accumulator, value) => accumulator + value, 0);
}

function getTransactionsWithinDateRange(minDate, maxDate, transactions) {
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= minDate && transactionDate <= maxDate;
  })
}

function getEndOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

function CustomerRow({
  customer,
  startDate,
  endDate,
  months
}) {
  const transactionsWithinStartAndEndDates = useMemo(
    () => getTransactionsWithinDateRange(startDate, endDate, customer.transactions),
    [customer.transactions]
  );

  const pointTotalForDateRange = useMemo(
    () => calculatePointTotal(transactionsWithinStartAndEndDates),
    [transactionsWithinStartAndEndDates]
  );

  return (
    <tr>
      <td>{customer.id}</td>
      <td>{customer.name}</td>
      {months.map(month => {
        const transactionsWithinMonth = getTransactionsWithinDateRange(month, getEndOfMonth(month), transactionsWithinStartAndEndDates);
        return (
          <td key={month.toString()}>
            {calculatePointTotal(transactionsWithinMonth)}
          </td>
        )
      })}
      <td>{pointTotalForDateRange}</td>
    </tr>
  );
}

CustomerRow.propTypes = {
  customer: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    transactions: PropTypes.arrayOf(PropTypes.shape({
      transactionNumber: PropTypes.string,
      date: PropTypes.string,
      total: PropTypes.number
    }))
  }).isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  months: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired
};

export default CustomerRow;
