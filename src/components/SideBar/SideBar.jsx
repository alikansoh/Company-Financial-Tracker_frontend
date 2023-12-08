import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../SideBar/logo.png';
import iconD from '../SideBar/iconD.png';
import iconT from '../SideBar/iconT.png';
import iconG from '../SideBar/iconG.png';
import iconR from '../SideBar/iconR.png';
import iconU from '../SideBar/iconU.png';
import './SideBar.css';

const SideBar = () => {
  const [selectedLink, setSelectedLink] = useState(null);

  const handleLinkClick = (index) => {
    setSelectedLink(index);
  };

  return (
    <div className='main'>
      <img className="sidebar-logo" src={logo} alt="" />
      <div className="sidebar">
        <div className="sidebar-buttons">
          <Link
            to={"/"}
            onClick={() => handleLinkClick(0)}
            className={selectedLink === 0 ? 'selected' : ''}
          >
            <div className="dashboard">
            <img className="icon" src={iconD} alt="" />
              <span className='dash'>|</span><span className='sidebar-label'>Dashboard</span>
            </div>
          </Link>
          <Link
            to={"/Transactions"}
            onClick={() => handleLinkClick(1)}
            className={selectedLink === 1 ? 'selected' : ''}
          >
            <div className="transactions">
            <img className="icon" src={iconT} alt="" />
              <span className='dash'>|</span><span className='sidebar-label'>Transactions</span>
            </div>
          </Link>
          <Link
            to={"/Goals"}
            onClick={() => handleLinkClick(2)}
            className={selectedLink === 2 ? 'selected' : ''}
          >
            <div className="Goals">
            <img className="icon" src={iconG} alt="" />
              <span className='dash'>|</span><span className='sidebar-label'>Goals</span>
            </div>
          </Link>
          <Link
            to={"/Reports"}
            onClick={() => handleLinkClick(3)}
            className={selectedLink === 3 ? 'selected' : ''}
          >
            <div className="Reports">
            <img className="icon" src={iconR} alt="" />
              <span className='dash'>|</span><span className='sidebar-label'>Reports</span>
            </div>
          </Link>
          <Link
            to={"/Users"}
            onClick={() => handleLinkClick(4)}
            className={selectedLink === 4 ? 'selected' : ''}
          >
            <div className="Users">
            <img className="icon" src={iconU} alt="" />
              <span className='dash'>|</span> <span className='sidebar-label'>Users</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
