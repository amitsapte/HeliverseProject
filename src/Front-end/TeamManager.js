import React, { useState } from 'react';

const TeamManager = ({ users }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleUserSelect = (user) => {
    
    const isUnique = selectedUsers.every((selectedUser) => {
      return selectedUser.domain !== user.domain || selectedUser.available !== user.available;
    });

   
    if (isUnique) {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
    } else {
      alert('Only users with unique domains and availability can be added to the team.');
    }
  };

  const handleRemoveUser = (userToRemove) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.filter((user) => user !== userToRemove)
    );
  };

  return (
    <div className="border border-gray-400 rounded p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">Team Manager</h2>
      <ul>
        {selectedUsers.map((user) => (
          <li key={user._id} className="mb-2">
            {`${user.first_name} ${user.last_name}`} - {user.domain} {user.available ? '(Available)' : '(Not Available)'}
            <button className="ml-2 text-red-500" onClick={() => handleRemoveUser(user)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h3 className="text-sm mt-4">Available Users:</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="mb-2">
            <button onClick={() => handleUserSelect(user)} disabled={!user.available}>
              {`${user.first_name} ${user.last_name}`} - {user.domain} {user.available ? '(Available)' : '(Not Available)'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamManager;
