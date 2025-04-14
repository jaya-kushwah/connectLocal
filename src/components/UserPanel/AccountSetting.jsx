import React, { useState } from "react";

// Import the child components
import Profile from "./Profile";

const AccountSetting = () => {
  const [activeSection, setActiveSection] = useState("profile"); // default is profile

  const renderContent = () => {
    if (activeSection === "profile") {
      return <Profile />;
    }
    else {
      return <div>Select a section</div>;
    }
  };

  return (
    <div className="container py-4 ">
      <h3 style={{
        marginLeft: "14%", position: "fixed",
        marginTop: "-2%",
        zIndex: 1000,
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        width: "100%",
        height: "14%",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }} className="mb-4 border-bottom pb-2">Account Settings</h3>
      {/* <button style={{ marginLeft: "78%", position: "fixed", zIndex: 1000 }}
        className={`btn ${activeSection === "profile" ? "btn-primary" : "btn-outline-primary"}`}
        onClick={() => setActiveSection("profile")}
      >
        Profile
      </button> */}

      {/* Render Dynamic Section */}
      <div style={{ marginTop: "5%" }} className="bg-light p-4 rounded shadow-sm">
        {renderContent()}
      </div>
    </div>
  );
};

export default AccountSetting;
