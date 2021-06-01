import React from "react";

const parseDate = (dateAsString) => {
  const date = new Date(dateAsString);
  return {
    unixTime: date.getTime(),
    month: date.getMonth()
  }
};

// TODO: abstract point values
const calculatePoints = (purchaseTotal) => {
  if (purchaseTotal > 100) {
    return (2 * (purchaseTotal - 100)) + 50;
  } else {
    return purchaseTotal - 50;
  }
};

class CustomerRow extends React.Component {
  render() {
    const customer = this.props.customer;
    const dateRange = this.props.dateRange;

    /* This creates a dynamic object of monthPoints with an arbitrary
       range of months, so that the functionality of the app
       could be expanded to include any user-defined range of months.

       format:
       monthPoints = {
        monthAsNumber: pointTotal,
        ...
      }
    */
    const monthPoints = {};
    for (let month of dateRange.months) {
      monthPoints[month] = 0;
    }

    customer.transactions.forEach((transaction) => {
      const transactionDate = parseDate(transaction.date);
      const purchaseTotal = Math.floor(transaction.total);

      if (purchaseTotal > 50 && transactionDate.unixTime >= dateRange.startTime
        && transactionDate.unixTime <= dateRange.endTime) {
        // transaction is in correct date range, and qualifies for points
        let points = calculatePoints(purchaseTotal);
        monthPoints[transactionDate.month] += points;
      }
    });

    // calculate totalPoints from arbitrarily large monthPoints object
    let totalPoints = Object.values(monthPoints).reduce((a, b) => a + b);

    const monthCells = [];

    dateRange.months.forEach((month) => {
      monthCells.push(
        <td key={month}>{monthPoints[month]}</td>
      );
    });

    return (
      <tr>
        <td>{customer.ID}</td>
        <td>{customer.name}</td>
        {monthCells}
        <td>{totalPoints}</td>
      </tr>
    );
  }
}

export default CustomerRow;
