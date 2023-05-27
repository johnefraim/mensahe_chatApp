import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../reducers/authSlice';


const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const hasUnreadMessages = true; 
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log(user);
    dispatch(logout());
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      toast.success('logout!');
    }
  };
  

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white py-4 px-6">
      <div className="text-xl font-bold">Mensahe</div>
      <ul className="flex space-x-4">
        <li>
            {hasUnreadMessages && (
              <FontAwesomeIcon
                icon={faBell}
                className="text-white hover:text-gray-300 cursor-pointer"
              />
            )}
          </li>
          <li>
          {isAuthenticated && user && user.name && <span className="text-white">{user.name}</span>}
          </li>
          <button className="button-full" onClick={handleLogout}>
            Logout
          </button>
        </ul>
    </nav>
  );
};

export default Navbar;
