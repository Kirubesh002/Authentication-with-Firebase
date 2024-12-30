import React from 'react';
import PropTypes from 'prop-types';

const SideBar = ({ logoutUser }) => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav className="navbar navbar-dark bg-dark flex-column vh-100 p-3" style={{ width: '250px', justifyContent: 'flex-start' }}>
        <h3 className="navbar-brand mb-4" href="#">
          Home
        </h3>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link text-light" href="#">Profile</a>
          </li>
          
          <li className="nav-item">
            <a className="nav-link text-light" href="#">Task</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="#">Settings</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="#" onClick={logoutUser}>
              Logout
            </a>
          </li>
        </ul>
      </nav>

    
    </div>
  );
};

SideBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

export default SideBar;
