import React from "react";
import SearchableCustomerTable from "./components/searchableCustomerTable";
import {customers} from "./data/customerTransactions";

function App() {
  return <SearchableCustomerTable customers={customers} startDate={new Date(2019, 3)} endDate={new Date(2019, 5)} />;
}

export default App;
