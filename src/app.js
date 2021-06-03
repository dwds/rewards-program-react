import React from "react";
import SearchableCustomerTable from "./components/searchableCustomerTable";
import {customers} from "./data/customerTransactions";

function App() {
  return <SearchableCustomerTable customers={customers} />;
}

export default App;
