import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
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
import { Cookies } from "react-cookie";
import InterestGroup from "./components/UserPanel/InterestGroup";
import Announcement from "./components/UserPanel/Announcement";
import UserManagement from "./components/AdminPanel/UserManagement";
import ContentModeration from "./components/AdminPanel/ContentModeration";
import EventForm from "./components/AdminPanel/EventForm";
import Container from "./components/Container";
import Footer from "./components/UserPanel/Footer";
import ForgotPassword from "./components/UserPanel/ForgetPassword";


const ProtectedRoute = ({ children, role }) => {
  console.log(role)
  const cookies = new Cookies();
  const user = cookies.get("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function AdminLayout({ children }) {
  return (
    <div className='d-flex'>
      <AdminSidebar></AdminSidebar>
      <div className='mainLayout-content'>
        {/* <AdminNavbar></AdminNavbar> */}
        <Navbar></Navbar>
        <div >
          {children}
        </div>
      </div>
    </div>
  )
}


const UserLayout = ({ children }) => {
  return (
      <div className="flex-grow-1">
        <Container>{children}</Container>
      </div>
  );
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/forgetpass" element={<ForgotPassword></ForgotPassword>} /> */}

        {/* Protected USer Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserLayout>
                <HeroCarousel />
                <EventsPage />
                <IndoreEvents />
                <TrendingEvents />
              </UserLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/event/:id"
          element={
            <ProtectedRoute role="user">
              <UserLayout>
                <EventDes />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute role="user">
              <UserLayout>
                <ProfilePage  />
              </UserLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile-management"
          element={
            <ProtectedRoute role="user">
              <UserLayout>
                <AccountSetting />
              </UserLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/interest-groups"
          element={
            <ProtectedRoute role="user">
              <UserLayout>
                <InterestGroup />
              </UserLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/events"
          element={
            <ProtectedRoute role="user">
              <UserLayout>
                <EventsPage />
              </UserLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/news-announcements"
          element={
            <ProtectedRoute role="user">
              <UserLayout>
                <Announcement />
              </UserLayout>
            </ProtectedRoute>
          }
        />


        {/* Protected Admin Dashboard */}
        <Route
          path="/AdminDashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdmainDashboard></AdmainDashboard>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-management"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <UserManagement />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/content-moderation"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <ContentModeration></ContentModeration>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/event-form"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <EventForm></EventForm>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
