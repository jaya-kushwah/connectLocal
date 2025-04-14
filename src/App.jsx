import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import Events from "./components/UserPanel/Events";
import Navbar from "./components/UserPanel/Navbar";
import HeroCarousel from "./components/UserPanel/HeroCrousel";
import IndoreEvents from "./components/UserPanel/IndoreEvents";
import TrendingEvents from "./components/UserPanel/TrendingEvents";
import Sidebar from "./components//UserPanel/Sidebar";
import EventDes from "./components/UserPanel/EventDes";
import AccountSetting from "./components/UserPanel/AccountSetting";
import ProfilePage from "./components/UserPanel/Profile";
import EventsPage from "./components/UserPanel/EventPage";
import AdminNavbar from "./components/AdminPanel/AdminNavbar";
import AdminSidebar from "./components/AdminPanel/AdminSidebar";
import AdmainDashboard from "./components/AdminPanel/AdminDashboard";
import Interest from "./components/UserPanel/Interest";
import { Cookies } from "react-cookie";


// ✅ ProtectedRoute Component
const ProtectedRoute = ({ children, role }) => {
  const cookies = new Cookies();
  const user = cookies.get("user");
  const auth = cookies.get("auth");

  if (!user || !auth) {
    return <Navigate to="/login" replace />;
  }

  // Optional: Check for role-based access
  if (role && auth !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// ✅ Role-Based Dashboard
const DashboardPage = ({ role }) => {
  return (
    <>
      {role === "user" ? (
        <>
          <Sidebar />
          <Navbar />
          <HeroCarousel />
          <EventsPage></EventsPage>
          {/* <Events /> */}
          <IndoreEvents />
          <TrendingEvents />
        </>
      ) : role === "admin" ? (
        <>
          <AdminNavbar />
          <AdminSidebar />
          <AdmainDashboard />
        </>
      ) : null}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/event/:id" element={<EventDes />} />
        <Route path="/profile-management" element={<AccountSetting />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/interest-groups" element={<Interest />} />
        <Route path="/events" element={<EventsPage />} />

         {/* Protected User Dashboard  */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="user">
              <DashboardPage role="user" />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Dashboard */}
        <Route
          path="/AdminDashboard"
          element={
            <ProtectedRoute role="admin">
              <DashboardPage role="admin" />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
