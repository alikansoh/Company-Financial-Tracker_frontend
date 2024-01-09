import React,{ useState } from 'react';
import './NavBar.css';
import { jwtDecode } from 'jwt-decode';
import Calendar from './Calendar/Calendar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';``

const Navbar = () => {
  const token = localStorage.getItem('token');
  var decodedHeader = {};

  if (token) { 
    decodedHeader = jwtDecode(token);
    console.log(decodedHeader);
  }

  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownItemClick = (action) => {
    // Close the dropdown after clicking an item
    setIsDropdownOpen(false);

    // Perform specific actions for each dropdown item
    if (action === 'Logout') {
      // Perform any logout logic if needed
      // For example, clear the token from localStorage
      localStorage.removeItem('token');

      // Navigate to the login page
      navigate('/');
    } else {
      // Add logic for other dropdown items
      console.log(`Dropdown item clicked: ${action}`);
    }
  };

import React,{ useState } from 'react';
import './NavBar.css';
import { jwtDecode } from 'jwt-decode';
import Calendar from './Calendar/Calendar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';``

const Navbar = () => {
  const token = localStorage.getItem('token');
  var decodedHeader = {};

  if (token) { 
    decodedHeader = jwtDecode(token);
    console.log(decodedHeader);
  }

  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownItemClick = (action) => {
    // Close the dropdown after clicking an item
    setIsDropdownOpen(false);

    // Perform specific actions for each dropdown item
    if (action === 'Logout') {
      // Perform any logout logic if needed
      // For example, clear the token from localStorage
      localStorage.removeItem('token');

      // Navigate to the login page
      navigate('/');
    } else {
      // Add logic for other dropdown items
      console.log(`Dropdown item clicked: ${action}`);
    }
  };

  return (
    <div className="mainNav">
      <div className="welcome">
        <div className="welcomeUsername">
          <p>Hi, {decodedHeader.username},</p>
        </div>
        <div className="welcomeBack">
          <p>Welcome Back!</p>
        </div>
      </div>

      <Calendar className="time" />

      <div className="profile">
        <div className="bi bi-bell-fill"></div>
        <div className="bi bi-person-circle"></div>
        <div className="profileName">
          <h1>{decodedHeader.username}</h1>
        </div>
          <button className="bi bi-caret-down-fill" onClick={handleDropdownToggle}></button>
          {isDropdownOpen && (
            <ul className="dropdown-list">
              <li className="option1" onClick={() => handleDropdownItemClick('Profile')}>Profile</li>
              <li className="option3" onClick={() => handleDropdownItemClick('Logout')}>Logout</li>
            </ul>
          )}
      </div>
    </div>
  );
};
  );
};

export default Navbar;
export default Navbar;