
import React from 'react';

const DomainFilter = ({ domains, selectedDomains, handleDomainChange }) => {
  return (
    <div className="mb-4">
      <label className="block font-bold mb-2">Domain:</label>
      {domains.map((domain) => (
        <div key={domain}>
          <label className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              value={domain}
              checked={selectedDomains.includes(domain)}
              onChange={handleDomainChange}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span className="ml-2 text-gray-700">{domain}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default DomainFilter;
