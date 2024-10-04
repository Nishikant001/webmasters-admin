import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import './App.css'

// Import components
import Navbar from "./components/UserNab.jsx"; 
import Navbar_Admin from "./components/admins/Navbar_Admin/Navbar_Admin.jsx"; // Admin Navbar

import AdminDashboard from "./components/Dashboard/Admin.jsx"; // Admin Dashboard
import AdminLogin from "./components/admins/Signup/Login.jsx"; // Admin login component
import NotFoundPage from "./components/admins/404/Notfound.jsx";
import AdminSignupForm from "./components/admins/Signup/Signup.jsx";
import NotificationsPage from "./components/admins/notification/Notification.jsx";
import StudentAttendance from "./components/admins/Attendance/Attend.jsx";
import StudentManagement from "./components/admins/student/StudentManagement.jsx";
import AdminPostResultsForm from "./components/admins/Results/AdminPostResultsForm.jsx";
import CourseManagement from "./components/admins/course managemnet/course managemnet/CourseMangement1.jsx";
import CourseManagement1 from "./components/admins/course managemnet/course managemnet/CourseMangement1.jsx";
import CourseManagement2 from "./components/admins/course managemnet/course managemnet/CourseMangement2.jsx";
import StudentRegistrationForm from "./components/student/Signup.jsx";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  // Load authentication state from local storage
  const loadAuthStateFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (token && storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole);
    } else {
      setIsAuthenticated(false);
      setRole(null);
    }
  };

  useEffect(() => {
    loadAuthStateFromLocalStorage();
  }, []);

  // Handle login and save token and role in local storage
  const handleLogin = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setIsAuthenticated(true);
    setRole(role);
  };

  // Handle logout and remove token and role from local storage
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
  };

  const renderNavbar = () => {
    if (!isAuthenticated) {
      return <Navbar />; // Regular Navbar for guests
    } else if (role === "admin") {
      return <Navbar_Admin onLogout={handleLogout} />; // Admin-specific Navbar
    }
  };

  return (
    <div className="App">
      {renderNavbar()}

      <Routes>
        {!isAuthenticated ? (
          <>
            {/* Admin login route */}
            <Route path="/admin-login" element={<AdminLogin onLogin={handleLogin} />} />
            <Route path="/admin-sign" element={<AdminSignupForm />} />
            <Route path="/stu-sign" element={<StudentRegistrationForm />} />
           
            
           
            
            {/* Redirect to login if not authenticated */}
            <Route path="*" element={<Navigate to='admin-login' />} />
          </>
        ) : (
          <>
            {role === "admin" && (
              <>
                {/* Admin Dashboard */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/attendance" element={<StudentAttendance />} />
                <Route path="/student-manage" element={<StudentManagement />} />
                <Route path="/resultsPost" element={<AdminPostResultsForm  />} />
                <Route path="/course" element={<CourseManagement  />} />
                <Route path="/course1" element={<CourseManagement1  />} />
                <Route path="/course2" element={<CourseManagement2  />} />
                
                {/* Catch-all route for admins */}
                <Route path="*" element={<AdminDashboard />} />
              </>
            )}
          </>
        )}

        {/* Fallback to NotFound page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

     
    </div>
  );
}

export default App;
