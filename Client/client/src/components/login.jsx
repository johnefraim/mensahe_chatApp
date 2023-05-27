import React, { useState} from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/authSlice';

function Login() {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      toast.warning('Check email and password!');
      return;
    }

    try {
      // Make a POST request to the server's login endpoint
      //if you want to make .env file for production you can create
      const response = await axios.post('http://localhost:4200/api/login', credentials);
      const { token, user } = response.data;
      console.log(user);
      dispatch(login({user: user, token: token}));
      
    } catch (error) {
      
      console.error('Login failed:', error.message);
      toast.error('Login failed. Please check your credentials.');
    }

    setCredentials({ email: '', password: '' });

  };
  //setting value of email
  const handleEmailChange = (e) => {
    setCredentials({ ...credentials, email: e.target.value });
  };
  //setting password
  const handlePasswordChange = (e) => {
    setCredentials({ ...credentials, password: e.target.value });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container mx-auto max-w-xs">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={credentials.email}
              onChange={handleEmailChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-semibold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={handlePasswordChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full px-4 py-2"
            type="submit"
          >
            Login
          </button>
          <Link to="/registration" className="block text-center">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
