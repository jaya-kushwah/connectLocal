// import React, { useState } from "react";
// import { FaBars, FaTimes, FaUserFriends, FaLayerGroup, FaCalendarAlt, FaBell, FaEnvelope, FaHome } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   const [darkMode, setDarkMode] = useState(true);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   return (
//     <div  className={`sidebar ${darkMode ? "dark" : ""} ${isCollapsed ? "collapsed" : ""}`}>

//       <nav className="menu">
//         <ul>
//           <li>
//             <Link to="/dashboard" className="menu-item">
//               <FaHome className="menu-icon" /> Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link to="/profile-management" className="menu-item">
//               <FaUserFriends className="menu-icon" /> Profile Management
//             </Link>
//           </li>
//           <li>
//             <Link to="/interest-groups" className="menu-item">
//               <FaLayerGroup className="menu-icon" /> Interest Groups
//             </Link>
//           </li>
//           <li>
//             <Link to="/events" className="menu-item">
//               <FaCalendarAlt className="menu-icon" />Event Management
//             </Link>
//           </li>
//           {/* <li>
//             <Link to="/local-resources" className="menu-item">
//               <FaBell className="menu-icon" /> Local Resources
//             </Link>
//           </li> */}
//           {/* <li>
//             <Link to="/community-forums" className="menu-item">
//               <FaEnvelope className="menu-icon" />Community Forums
//             </Link>
//           </li> */}
//           {/* <li>
//             <Link to="/classifieds" className="menu-item">
//               <FaEnvelope className="menu-icon" /> Classifieds
//             </Link>
//           </li> */}
//           <li>
//             <Link to="/news-announcements" className="menu-item">
//               <FaEnvelope className="menu-icon" /> News & Announcements
//             </Link>
//           </li>
//           {/* <li>
//             <Link to="/card" className="menu-item">
//               <FaEnvelope className="menu-icon" />Add Card
//             </Link>
//           </li> */}
//           {/* <li>
//             <Link to="/messaging-notification" className="menu-item">
//               <FaBell className="menu-icon" /> Messaging & Notification
//             </Link>
//           </li> */}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaUserFriends,
  FaLayerGroup,
  FaCalendarAlt,
  FaBell,
  FaEnvelope,
  FaHome,
  FaPlus,
  FaEye,
} from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showEventSubmenu, setShowEventSubmenu] = useState(false);

  const toggleEventSubmenu = () => {
    setShowEventSubmenu(!showEventSubmenu);
  };

  return (
    <div className={`sidebar ${darkMode ? "dark" : ""} ${isCollapsed ? "collapsed" : ""}`}>
      <nav className="menu">
        <ul>
          <li>
            <Link to="/dashboard" className="menu-item">
              <FaHome className="menu-icon" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/profile-management" className="menu-item">
              <FaUserFriends className="menu-icon" /> Profile Management
            </Link>
          </li>
          {/* <li>
            <Link to="/interest-groups" className="menu-item">
              <FaLayerGroup className="menu-icon" /> Interest Groups
            </Link>
          </li> */}


          <li>
            <div className="menu-item" onClick={toggleEventSubmenu} style={{ cursor: "pointer" }}>
              <FaCalendarAlt className="menu-icon" /> Interest Groups
            </div>
            {showEventSubmenu && (
              <ul className="submenu">
                <li>
                  <Link to="/interest-groups/add" className="submenu-item">
                    <FaPlus className="submenu-icon" /> Add Group
                  </Link>
                </li>
                <li>
                  <Link to="/interest-groups/view" className="submenu-item">
                    <FaEye className="submenu-icon" /> View Group
                  </Link>
                </li>
              </ul>
            )}
          </li>


          {/* Event Management with Submenu */}
          <li>
            <div className="menu-item" onClick={toggleEventSubmenu} style={{ cursor: "pointer" }}>
              <FaCalendarAlt className="menu-icon" /> Event Management
            </div>
            {showEventSubmenu && (
              <ul className="submenu">
                <li>
                  <Link to="/card/add" className="submenu-item">
                    <FaPlus className="submenu-icon" /> Add Event
                  </Link>
                </li>
                <li>
                  <Link to="/card/view" className="submenu-item">
                    <FaEye className="submenu-icon" /> View Events
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* <li>
            <Link to="/news-announcements" className="menu-item">
              <FaEnvelope className="menu-icon" /> News & Announcements
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;


