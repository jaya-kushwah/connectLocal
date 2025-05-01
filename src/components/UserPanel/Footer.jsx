import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import '../../assets/Style/Footer.css';
import image from "../../assets/logon.jpg.png";
// import image1 from "../../assets/imeg.png";

const Footer = () => {
  // State for Dark Mode
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"; // Check from local storage
  });

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode); // Store in local storage
  }, [darkMode]);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & Contact */}
        <div className="footer-section footer-contact">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img src={image} alt="Logo" className="me-2" style={{ height: "150px" }} />
          </a>
          <p style={{ fontSize: "22px" }}>Hyperlocal content is targeted at or consumed by people or entities that are located within a well-defined area, generally on the scale of a street, neighborhood, community, or city.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h5>Quick Links</h5>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div className="footer-section1">
          <h5>Get in Touch</h5>
          <ul>
            <li>📞 9399299125</li>
            <li>📧 Sonali@gmail.com</li>
          </ul>
          <div className="footer-social">
            <FaFacebook />
            <FaInstagram />
            <FaXTwitter />
            <FaLinkedin />
            <FaYoutube />
          </div>
        </div>

        {/* Footer Image */}
        <div className="footer-image">
          <img src={""} alt="AI Image" />
        </div>
      </div>

      {/* Dark Mode Toggle Button */}
      <div className="toggle-container">
        <button className="toggle-button" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode ☀" : "Dark Mode 🌙"}
        </button>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        &copy; 2023 Placement Adda. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;