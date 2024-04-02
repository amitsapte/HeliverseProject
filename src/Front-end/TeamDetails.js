
import React from 'react';

const TeamDetails = ({ selectedUsers }) => {
  return (
    <div className="border border-gray-400 rounded p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">Team Details</h2>
      <ul>
        {selectedUsers.map((user) => (
          <li key={user._id} className="mb-2">
            {`${user.first_name} ${user.last_name}`} - {user.domain} {user.available ? '(Available)' : '(Not Available)'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamDetails;
