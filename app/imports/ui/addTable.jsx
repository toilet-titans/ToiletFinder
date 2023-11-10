import React from 'react';
import MUIDataTable from "mui-datatables";

const AddTable = () => {
  const columns = ["Building", "# of Bathrooms", "Average Rating"];

  const data = [
    ["Moore", 2 , 2],
    ["Paradise Palms", 14, 2.3],
    ["Library", 3, 1],
    ["Other Library", 22, 5],
  ];

  const options = {
    filterType: 'textField',
  };

  return (
    <MUIDataTable
      title={"Your Buildings"}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default AddTable;