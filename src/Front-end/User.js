
import React from 'react';

const User = ({ user }) => {
  return (
   <div className="max-w-4xl rounded overflow-hidden shadow-lg">
      <img className="w-full h-auto" src={user.avatar} alt="User Avatar" />
      <div className="px-6 py-6">
        <div className="font-bold text-xl mb-2">{user.first_name} {user.last_name}</div>
        <p className="text-gray-700 text-base">Email: {user.email}</p>
        <p className="text-gray-700 text-base">Gender: {user.gender}</p>
        <p className="text-gray-700 text-base">Domain: {user.domain}</p>
        <p className="text-gray-700 text-base">Status: {user.available ? 'Available' : 'Not Available'}</p>
      </div>
    </div>
  );
};

export default User;
