import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchResults([]);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearchTermChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    try {
      const response = await axios.get('http://localhost:4200/api/contacts');
      const results = response.data.filter((user) =>
        user.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    dispatch({ type: 'auth/setSelectedUser', payload: user._id });
    setSearchTerm('');
    setSearchResults([]);
  };
  
  return (
    <div className="relative" ref={searchRef}>
      <input
        type="text"
        placeholder="Search for a user..."
        value={searchTerm}
        onChange={handleSearchTermChange}
        className='w-full py-2 pl-4 pr-10 text-gray-800 bg-gray-200 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500'
      />
      {searchResults.length > 0 && (
        <ul className='absolute z-10 w-full mt-2 bg-white rounded shadow-md'>
          {searchResults.map((user) => (
            <li key={user.id} onClick={() => handleUserSelect(user)} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
              {user.name}
            </li>
          ))}
        </ul>
      )}
      {selectedUser && (
        <div>
          <h3>Selected User: {selectedUser.name}</h3>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
