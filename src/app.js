// TODO: import JSON data
import React from "react";
import SearchableCustomerTable from "./components/searchableCustomerTable";
import customerData from "./fake-data";

const customers = customerData.customers;

class App extends React.Component {
  render(){
    return (<SearchableCustomerTable customers={customers} />);
  }
}

export default App;
