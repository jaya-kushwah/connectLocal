import React from "react";
import "../../assets/Style/Navbar.css"
import "bootstrap/dist/css/bootstrap.min.css";
import image from "../../assets/logon.jpg.png";
import userIcon from "../../assets/imeg.png";
import { Link } from "react-router-dom";
import { Cookies } from 'react-cookie';

const AdminNavbar = () => {
  const cookies = new Cookies();
  return (
    <nav className="navbar navbar-expand-lg custom-navbar fixed-top">

      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={image} alt="Logo" className="me-2" style={{ height: "50px" }} />
          <div>
            <h1 className="h5 m-0 fw-bold">
              Connecting <span className="fw-light">Local</span>
            </h1>
            <p className="large m-0">Building a Better Future, Together</p>
          </div>
        </a>

        {/* <div style={{ marginLeft: "67%" }} className="relative">
          <span className="absolute right-0 top-0 w-2 h-2 bg-red-500 rounded-full"></span>
          <span  >🔔</span>
        </div> */}



        <li className="nav-item d-flex align-items-center ms-3">
          <Link
            to="/"
            onClick={() => {
              cookies.remove('user');
              window.location.href = '/';
            }}
            className="d-flex align-items-center text-decoration-none"
            style={{ color: "inherit" }}
          >
            <img
              src={userIcon}
              alt="User"
              className="rounded-circle user-icon me-2"
              style={{ height: "50px", width: "50px" }}
            />
            {/* <span>Logout</span> */}
          </Link>
        </li>

        {/* <li style={{ marginTop: "-3%" }} className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle d-flex align-items-center"
            href="#"
            id="userDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={userIcon}
              alt="User"
              className="rounded-circle user-icon"
            />
          </a>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><Link className="dropdown-item" to="/setting">Settings</Link></li>
            <li><Link to='/' type="button" className="dropdown-item" onClick={() => {
              cookies.remove('user')
              window.location.href = '/'
            }}>Logout</Link></li>
          </ul>
        </li> */}
      </div>
    </nav>
  );
};

export default AdminNavbar;