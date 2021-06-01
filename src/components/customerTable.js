import React from "react";
import CustomerRow from "./customerRow";

class CustomerTable extends React.Component {
  render() {
    const locale = this.props.locale || "en-US";
    const filterText = this.props.filterText.toLocaleLowerCase(locale);
    const rows = [];

    this.props.customers.forEach((customer) => {
      if (customer.name.toLocaleLowerCase(locale).indexOf(filterText) === -1 &&
          customer.ID.toLocaleLowerCase(locale).indexOf(filterText) === -1) {
        return;
      }
      rows.push(
        <CustomerRow
          customer={customer}
          dateRange={this.props.dateRange}
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
}

export default CustomerTable;
