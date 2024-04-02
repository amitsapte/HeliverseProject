import React, { useState, useEffect } from 'react';
import Search from './Front-end/Search';
import DomainFilter from './Front-end/DomainFilter';
import GenderFilter from './Front-end/GenderFilter';
import AvailabilityFilter from './Front-end/AvailabilityFilter';
import TeamManager from './Front-end/TeamManager';
import TeamDetails from './Front-end/TeamDetails';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    filterData();
  }, [searchQuery, selectedDomains, selectedGenders, availableOnly, data]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/data?page=${currentPage}&limit=20`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterData = () => {
    let filteredUsers = data.filter(user =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedDomains.length > 0) {
      filteredUsers = filteredUsers.filter(user => selectedDomains.includes(user.domain));
    }

    if (selectedGenders.length > 0) {
      filteredUsers = filteredUsers.filter(user => selectedGenders.includes(user.gender));
    }

    if (availableOnly) {
      filteredUsers = filteredUsers.filter(user => user.available);
    }

    setFilteredData(filteredUsers);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDomainChange = (e) => {
    const domain = e.target.value;
    setSelectedDomains(prevDomains => {
      if (prevDomains.includes(domain)) {
        return prevDomains.filter(item => item !== domain);
      } else {
        return [...prevDomains, domain];
      }
    });
  };

  const handleGenderChange = (e) => {
    const gender = e.target.value;
    setSelectedGenders(prevGenders => {
      if (prevGenders.includes(gender)) {
        return prevGenders.filter(item => item !== gender);
      } else {
        return [...prevGenders, gender];
      }
    });
  };

  const handleAvailabilityChange = (e) => {
    setAvailableOnly(e.target.checked);
  };

  const handleTeamUpdate = (users) => {
    setSelectedUsers(users);
  };

  const handleAddToTeam = (user) => {
    setSelectedUsers(prevUsers => [...prevUsers, user]);
  };

  return (
    <div className="container mx-auto px-4 lg:px-0">
      <h1 className="text-3xl font-bold my-8">Data from MongoDB</h1>
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-0">
        <div className="lg:col-span-1 ">
        <div className=' w-3 h-3 '>
          <Search handleSearch={handleSearch} />
          </div>
          <div className='mt-7 mr-0' >
          <DomainFilter
            domains={["Sales", "Marketing", "Finance", "IT"]}
            selectedDomains={selectedDomains}
            handleDomainChange={handleDomainChange}
          /></div>
          <GenderFilter
            genders={["Male", "Female", "Other"]}
            selectedGenders={selectedGenders}
            handleGenderChange={handleGenderChange}
          />
          <AvailabilityFilter handleAvailabilityChange={handleAvailabilityChange} />
          <TeamManager users={selectedUsers} onTeamUpdate={handleTeamUpdate} />
          {selectedUsers.length > 0 && <TeamDetails selectedUsers={selectedUsers} />}
        </div>
        <div className="lg:col-span-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              filteredData.map((user) => (
                <div key={user._id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img className="w-full h-48 object-cover" src={user.avatar} alt="User Avatar" />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{user.first_name} {user.last_name}</h2>
                    <p className="text-gray-700 mb-2">Email: {user.email}</p>
                    <p className="text-gray-700 mb-2">Gender: {user.gender}</p>
                    <p className="text-gray-700 mb-2">Domain: {user.domain}</p>
                    <p className="text-gray-700 mb-2">Status: {user.available ? 'Available' : 'Not Available'}</p>
                    <button onClick={() => handleAddToTeam(user)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Add
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
              disabled={currentPage === 1}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prevPage => prevPage + 1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

