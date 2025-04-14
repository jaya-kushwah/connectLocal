import React, { useState } from "react";
import { FaBars, FaTimes, FaUserFriends, FaLayerGroup, FaCalendarAlt, FaBell, FaEnvelope, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../assets/Style/Sidebar.css"

const AdminSidebar = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`sidebar ${darkMode ? "dark" : ""} ${isCollapsed ? "collapsed" : ""}`}>

            <nav className="menu">
                <ul>
                    <li>
                        <Link to="/AdminDashboard" className="menu-item">
                            <FaHome className="menu-icon" /> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/user-management" className="menu-item">
                            <FaUserFriends className="menu-icon" /> User Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/content-moderation" className="menu-item">
                            <FaLayerGroup className="menu-icon" /> Content Moderation
                        </Link>
                    </li>
                    <li>
                        <Link to="/group-management" className="menu-item">
                            <FaCalendarAlt className="menu-icon" />Interest Group Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="menu-item">
                            <FaBell className="menu-icon" />  Event Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/News & Announcement" className="menu-item">
                            <FaEnvelope className="menu-icon" />News & Announcement
                        </Link>
                    </li>
                    <li>
                        <Link to="/Reporting" className="menu-item">
                            {/* <ReportSearch className="menu-icon" /> Analytics & Reporting */}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;

