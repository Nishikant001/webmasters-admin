import React, { useState } from "react";
import { IoPersonCircle, IoCloseOutline, IoNotificationsSharp } from "react-icons/io5";
import { PiStudent, PiBooksLight } from "react-icons/pi";
import { AiFillBook } from "react-icons/ai";
import { FaBars,FaHandSparkles } from "react-icons/fa"; // For a burger menu icon
import { Link, useNavigate } from "react-router-dom";

const Navbar_Admin = ({ onLogout }) => {
  const navigate=useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    profile: false,
    notifications: false,
  });

   // Function to handle logout and clear authentication state
   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Call onLogout to update parent state and redirect to login or home
    onLogout();

    // Redirect to login or home page
    navigate("/admin-login");
  };

  // Toggle Off-canvas Menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggle Dropdown for Profile & Notifications
  const toggleDropdown = (dropdown) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  return (
    <>
      {/* Navbar for Desktop */}
      <nav className="hidden lg:flex justify-between items-center fixed w-full p-6 z-50 bg-opacity-20 backdrop-blur-lg bg-white shadow-xl">
        <a href="#" className="text-2xl font-bold tracking-wider text-white">
          WebMasters Learning
        </a>
        <ul className="flex space-x-10 items-center">
          {/* Student Management */}
          <li className="group">
            <Link to="/student-manage" className="text-white text-lg hover:text-purple-300 transition duration-300">
              <PiStudent className="text-2xl inline mr-2" />
              Student Management
            </Link>
          </li>

          {/* Course Management */}
          <li className="group">
            <Link to="/course2" className="text-white text-lg hover:text-purple-300 transition duration-300">
              <PiBooksLight className="text-2xl inline mr-2" />
              Course Management
            </Link>
          </li>
          <li className="group">
            <Link to="/attendance" className="text-white text-lg hover:text-purple-300 transition duration-300">
              <FaHandSparkles  className="text-2xl inline mr-2" />
             Attendance
            </Link>
          </li>
          <li className="group">
            <Link to="/resultsPost" className="text-white text-lg hover:text-purple-300 transition duration-300">
              <AiFillBook  className="text-2xl inline mr-2" />
              Results 
            </Link>
          </li>

          {/* Notifications */}
          <li className="relative group">
            <Link to='/notifications'>
            <button
              className="text-white text-3xl hover:text-purple-300 transition duration-300"
            
            >
              <IoNotificationsSharp />
              <span className="absolute top-0 right-0 block h-4 w-4 bg-red-600 text-xs text-white font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                
              </span>
            </button>
            </Link>
            {/* Dropdown for Notifications */}
           
          </li>

          {/* Profile */}
          <li className="relative group">
            <button className="text-white text-3xl hover:text-purple-300 transition duration-300" onClick={() => toggleDropdown("profile")}>
              <IoPersonCircle />
            </button>
            {/* Dropdown for Profile */}
            {dropdownOpen.profile && (
              <ul className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg backdrop-blur-lg bg-opacity-90">
                <Link to='/admin-dashboard'>
                <li className="p-2 hover:bg-purple-500 hover:text-white transition rounded-lg">Profile</li>
                </Link>
                <Link>
                <li className="p-2 hover:bg-purple-500 hover:text-white transition rounded-lg" onClick={handleLogout}>Logout</li>
                </Link>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Navbar for Mobile */}
      <nav className="lg:hidden flex justify-between items-center fixed w-full p-6 z-50 bg-opacity-20 backdrop-blur-lg bg-black shadow-xl">
        <a href="#" className="text-2xl font-bold tracking-wider text-white">
          WebMasters Learning
        </a>

        {/* Burger Menu Icon */}
        <button className="text-white text-3xl" onClick={toggleMenu}>
          <FaBars />
        </button>

        {/* Off-canvas Mobile Menu */}
        <div
  className={`fixed inset-y-0 right-0 w-64 bg-white bg-opacity-20 backdrop-blur-lg shadow-2xl transform ${
    isOpen ? "translate-x-0" : "translate-x-full"
  } transition-transform duration-500 ease-in-out z-50`}
>
  <div className="p-6 h-screen bg-black bg-opacity-50 backdrop-blur-lg shadow-xl flex flex-col justify-between">
    {/* Close Button */}
    <div className="flex justify-end mb-6">
      <button className="text-white text-3xl p-1 hover:text-gray-300 transition-all duration-300" onClick={toggleMenu}>
        <IoCloseOutline />
      </button>
    </div>

    {/* Menu Links */}
    <ul className="space-y-6">
      <li>
        <Link
          to="/student-manage"
          className="text-white flex items-center text-lg bg-white bg-opacity-10 backdrop-blur-md hover:bg-purple-500 hover:bg-opacity-20 p-3 rounded-xl shadow-lg transition-all duration-300"
        >
          <PiStudent className="text-2xl mr-2" />
          Student Management
        </Link>
      </li>
      <li>
        <Link
          to="/course2"
          className="text-white flex items-center text-lg bg-white bg-opacity-10 backdrop-blur-md hover:bg-purple-500 hover:bg-opacity-20 p-3 rounded-xl shadow-lg transition-all duration-300"
        >
          <PiBooksLight className="text-2xl mr-2" />
          Course Management
        </Link>
      </li>
      
      <li>
        <Link
          to="/resultsPost"
          className="text-white flex items-center text-lg bg-white bg-opacity-10 backdrop-blur-md hover:bg-purple-500 hover:bg-opacity-20 p-3 rounded-xl shadow-lg transition-all duration-300"
        >
          <AiFillBook  className="text-2xl mr-2" />
          Results 
        </Link>
        </li>
      <li>
        <Link
          to="/attendance"
          className="text-white flex items-center text-lg bg-white bg-opacity-10 backdrop-blur-md hover:bg-purple-500 hover:bg-opacity-20 p-3 rounded-xl shadow-lg transition-all duration-300"
        >
          <FaHandSparkles  className="text-2xl mr-2" />
          Attendance
        </Link>
      </li>
      <li>
        <Link
          to="/notifications"
          className="text-white text-lg bg-white bg-opacity-10 backdrop-blur-md hover:bg-purple-500 hover:bg-opacity-20 p-3 rounded-xl shadow-lg transition-all duration-300"
        >
          Notifications
        </Link>
      </li>

      {/* Profile Dropdown */}
      <li className="relative">
        <button
          className="text-white text-3xl flex justify-center items-center w-full hover:text-purple-300 transition-all duration-300"
          onClick={() => toggleDropdown("profile")}
        >
          <IoPersonCircle />
        </button>

        {/* Profile Dropdown in Mobile */}
        <ul
          className={`mt-2 space-y-2 overflow-hidden transition-all duration-500 ease-in-out ${
            dropdownOpen.profile ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <li>
            <a
              href="/admin-dashboard"
              
              className="block px-4 py-2 text-white bg-white bg-opacity-10 hover:bg-purple-500 hover:bg-opacity-20 rounded-xl transition-all duration-300"
            >
              Profile
            </a>
          </li>
          <li>
            <a
              onClick={handleLogout}
              href="#"
              className="block px-4 py-2 text-white bg-white bg-opacity-10 hover:bg-purple-500 hover:bg-opacity-20 rounded-xl transition-all duration-300"
            >
              Logout
            </a>
          </li>
        </ul>
      </li>
    </ul>

    {/* Footer or Bottom Section (Optional) */}
    
  </div>
</div>



        {/* Background Blur Overlay */}
       
      </nav>
    </>
  );
};

export default Navbar_Admin;
