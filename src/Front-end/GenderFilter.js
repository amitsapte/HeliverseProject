
import React from 'react';

const GenderFilter = ({ genders, selectedGenders, handleGenderChange }) => {
  return (
    <div className="mb-4">
      <label className="block font-bold mb-2">Gender:</label>
      {genders.map((gender) => (
        <div key={gender}>
          <label className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              value={gender}
              checked={selectedGenders.includes(gender)}
              onChange={handleGenderChange}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span className="ml-2 text-gray-700">{gender}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default GenderFilter;
