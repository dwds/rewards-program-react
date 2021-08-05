import React from "react";
import {SearchableCustomerTable} from "../searchableCustomerTable";
import styles from './app.module.css';
import {customers} from "../../data/customerTransactions";

function App() {
  return (
    <div className={styles.root}>
      <h1>Searchable Point Calculation Table in React</h1>
      <p>This is a searchable table of customer data that takes customer transaction data and calculates the points earned from purchases within a selectable range of months.</p>
      <p>See the source code on <a href="https://github.com/dwds/rewards-program-react">GitHub</a>.</p>
      <SearchableCustomerTable customers={customers} startDate={new Date(2019, 3)} endDate={new Date(2019, 5)} />
    </div>
  )
}

export default App;
