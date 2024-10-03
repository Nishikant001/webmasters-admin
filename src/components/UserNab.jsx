import React, { useState } from "react";
import {
  IoPersonCircle,
  IoCloseOutline,
  IoNotificationsSharp,
} from "react-icons/io5";
import { PiStudent, PiBooksLight } from "react-icons/pi";
import { FaBars } from "react-icons/fa"; // For a burger menu icon
import { Link } from "react-router-dom";

const User_Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    profile: false,
    notifications: false,
  });

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

          {/* Notifications */}

          {/* Profile */}
          <li className="relative group">
            <button
              className="text-white text-3xl hover:text-purple-300 transition duration-300"
              onClick={() => toggleDropdown("profile")}
            >
              <IoPersonCircle />
            </button>
            {/* Dropdown for Profile */}
            {dropdownOpen.profile && (
              <ul className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg backdrop-blur-lg bg-opacity-90">
                <Link to='/admin-login'>
                <li className="p-2 hover:bg-purple-500 hover:text-white transition rounded-lg">
                  Log In
                </li>
                </Link>
                <Link to='/admin-sign'>
                <li className="p-2 hover:bg-purple-500 hover:text-white transition rounded-lg">
                  Sign Up
                </li>
                </Link>
                <Link to='/stu-sign'>
                <li className="p-2 hover:bg-purple-500 hover:text-white transition rounded-lg">
                Student-SignUp
                </li>
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
              <button
                className="text-white text-3xl p-1 hover:text-gray-300 transition-all duration-300"
                onClick={toggleMenu}
              >
                <IoCloseOutline />
              </button>
            </div>

            {/* Menu Links */}
            <ul className="space-y-6">
              
             
             

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
                    dropdownOpen.profile
                      ? "max-h-60 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-white bg-white bg-opacity-10 hover:bg-purple-500 hover:bg-opacity-20 rounded-xl transition-all duration-300"
                    >
                      Log In
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-white bg-white bg-opacity-10 hover:bg-purple-500 hover:bg-opacity-20 rounded-xl transition-all duration-300"
                    >
                      Sign Up
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            {/* Footer or Bottom Section (Optional) */}
            <div className="mt-auto pt-6 border-t border-gray-200">
              <a
                href="#"
                className="text-sm text-gray-300 hover:text-purple-500 transition-all duration-300"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>

        {/* Background Blur Overlay */}
      </nav>
    </>
  );
};

export default User_Admin;
