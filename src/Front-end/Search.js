
import React from 'react';

const Search = ({ handleSearch }) => {
  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Search by name..."
        className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default Search;
