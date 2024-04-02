
import React from 'react';

const AvailabilityFilter = ({ handleAvailabilityChange }) => {
  return (
    <div className="mb-4">
      <label className="block font-bold mb-2">Availability:</label>
      <label className="inline-flex items-center mr-4">
        <input
          type="checkbox"
          value="true"
          onChange={handleAvailabilityChange}
          className="form-checkbox h-5 w-5 text-blue-500"
        />
        <span className="ml-2 text-gray-700">Available</span>
      </label>
    </div>
  );
};

export default AvailabilityFilter;
