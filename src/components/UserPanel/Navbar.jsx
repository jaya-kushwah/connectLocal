import React from "react";
import "../../assets/Style/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "../../assets/logon.jpg.png";
import userIcon from "../../assets/imeg.png";
import { Link } from "react-router-dom";
import { Cookies } from 'react-cookie';
import { FaSignOutAlt } from 'react-icons/fa';  // Importing the logout icon from react-icons

const Navbar = () => {
  const cookies = new Cookies();

  return (
    <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/dashboard">
          <img src={image} alt="Logo" className="me-2" style={{ height: "50px" }} />
          <div>
            <h1 className="h5 m-0 fw-bold">
              Connecting <span className="fw-light">Local</span>
            </h1>
            <p className="large m-0">Building a Better Future, Together</p>
          </div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item d-flex align-items-center ms-3">
              {/* User icon doesn't trigger logout, only the logout icon does */}
              <img
                src={userIcon}
                alt="User"
                className="rounded-circle user-icon me-2"
                style={{ height: "50px", width: "50px" }}
              />
              {/* Logout Icon on the left side, clickable for logout */}
              <Link
                to="/"
                onClick={() => {
                  cookies.remove('user');
                  window.location.href = '/';
                }}
                className="d-flex align-items-center text-decoration-none"
                style={{ color: "inherit" }}
              >
                <FaSignOutAlt size={24} className="me-2" style={{ color: '#333' }} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
