import React from "react";
import {SearchableCustomerTable} from "../searchableCustomerTable";
import styles from './app.module.css';
import {customers} from "../../data/customerTransactions";

function App() {
  return (
    <div className={styles.root}>
      <SearchableCustomerTable customers={customers} startDate={new Date(2019, 3)} endDate={new Date(2019, 5)} />
    </div>
  )
}

export default App;
