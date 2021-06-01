import React, {useState} from "react";
import CustomerTable from "./customerTable";
import Search from "./search";

function SearchableCustomerTable({
  customers,
  onChange,
}) {
  const [filterText, setFilterText] = useState(null);

  function handleFilterTextChange(event){
    setFilterText(event.target.value);
  }
  const dateRange = {
    startDate: new Date(2019, 2),
    endDate: new Date(2019, 4 + 1, 0, 23, 59, 59, 999),
    // TODO: Create months array based on date range
    months: [2, 3, 4], // months are 0 indexed (0 = Jan)
    // get UNIX times for date comparison
    get startTime() { return this.startDate.getTime() },
    get endTime() { return this.endDate.getTime() }
  }

  return (
      <React.Fragment>
        <Search
          filterText={filterText}
          onChange={handleFilterTextChange} />
        <CustomerTable
          filterText={filterText}
          customers={customers}
          dateRange={dateRange} />
      </React.Fragment>
  );
}

export default SearchableCustomerTable;
