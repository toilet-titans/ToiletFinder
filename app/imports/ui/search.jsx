import React, { useState } from 'react';
import Input from '@mui/base/Input';

const data = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'Peter Jones' },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Input
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {filteredData.map((item) => (
        <div key={item.id}>
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Search;