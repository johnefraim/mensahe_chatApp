import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if(name === '' || email === '' || password === '')
    {
      toast.warning('Missing fields!');
    }
    else{
      // Create an object with the user's registration details
    const registrationDetails = {
      name,
      email,
      password,
    };

    try {
      // Make a POST request to the registration endpoint on server
      await axios.post('http://localhost:4200/api/register', registrationDetails)
      .then(response =>{
         const data = response.data;
        if(data === 'OK'){
          toast.success('Registered!');
        }
        else{
          toast.warning('failed to Register');
        }
        console.log(data);
      });
      
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
    
      console.error('Registration failed:', error.message);
    }
    }
  };

  return (
    <div>
    
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-semibold mb-1">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold mb-1">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Registration;
