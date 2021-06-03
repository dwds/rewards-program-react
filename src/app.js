import React from "react";
import SearchableCustomerTable from "./components/searchableCustomerTable";
import {customers} from "./data/customerTransactions";

class App extends React.Component {
  render(){
    return (<SearchableCustomerTable customers={customers} />);
  }
}

export default App;
