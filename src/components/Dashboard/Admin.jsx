import React, { useState, useEffect } from 'react';
import axios from 'axios';
import admin from "../../images/admin.jpg";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminProfile = () => {
  const URL='https://webmasters-backend-2.onrender.com'
  // Admin data stored in state
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    role: "",
    joinedDate: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const adminId = localStorage.getItem("adminId"); // Assuming the admin ID is stored in localStorage
  const token = localStorage.getItem("token"); // Get token from localStorage for authentication

  // Fetch Admin Data on component mount
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${URL}/admin/admin/${adminId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        });

        const result = response.data;
        setAdminData({
          name: result.name,
          email: result.email,
          role: result.role,
          joinedDate: result.createdAt.split("T")[0] || "N/A",
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching admin data:", error);
        toast.error("Failed to fetch admin data.");
      }
    };

    fetchAdminData();
  }, [adminId, token]);

  // Handler for updating input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save the changes and send to the server
  const handleSaveClick = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`${URL}/admin/admin/${adminId}`, adminData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Admin updated:", response.data);
      setIsEditing(false);
      setLoading(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      setLoading(false);
      console.error("Error updating admin profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex justify-center items-center p-12">
      <ToastContainer /> {/* Toast notification container */}
      
      {/* Ambient Background Lighting */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-800 to-black opacity-60 blur-2xl"></div> */}

      {/* Holographic Rings */}
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-cyan-400 to-blue-500 opacity-30 rounded-full blur-3xl top-10 left-10 transform scale-75 animate-spin-slow"></div>
      <div className="absolute w-[700px] h-[700px] bg-gradient-to-r from-pink-500 to-purple-500 opacity-40 rounded-full blur-[160px] bottom-20 right-10"></div>

      {/* Main Profile Container */}
      <div className="relative z-10 max-w-4xl w-full bg-black bg-opacity-40 rounded-3xl shadow-2xl p-12 ring-4 ring-purple-800 backdrop-blur-3xl border border-gray-900 hover:scale-105 transform transition-all duration-1000 ease-out">
        
        {/* Floating Holographic Avatar */}
        <div className="relative mx-auto w-44 h-44 rounded-full p-2 bg-gradient-to-r from-purple-500 to-pink-500 shadow-avatar">
          <div className="w-full h-full rounded-full overflow-hidden transform hover:scale-110 transition-transform duration-1000">
            <img
              className="w-full h-full object-cover rounded-full"
              src={admin}
              alt="Admin Avatar"
            />
          </div>
        </div>

        {/* Profile Information */}
        <div className="mt-16 text-center">
          <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 animate-hologram-text">
            Admin Profile
          </h1>
          <p className="mt-4 text-xl text-gray-300 tracking-wide glow-text">Welcome to the future of administration</p>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          {/* Name */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-400 mb-2 tracking-wider uppercase">Name</label>
            <input
              type="text"
              name="name"
              value={adminData.name}
              onChange={handleInputChange}
              className={`py-4 px-6 w-full bg-black bg-opacity-30 border-none rounded-lg text-white shadow-2xl neon-input transform group-hover:scale-105 group-hover:shadow-holo focus:outline-none transition-transform duration-500 ease-out ${isEditing ? "border-purple-500" : "disabled:opacity-50"}`}
              disabled={!isEditing}
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-400 mb-2 tracking-wider uppercase">Email</label>
            <input
              type="email"
              name="email"
              value={adminData.email}
              onChange={handleInputChange}
              className={`py-4 px-6 w-full bg-black bg-opacity-30 border-none rounded-lg text-white shadow-2xl neon-input transform group-hover:scale-105 group-hover:shadow-holo focus:outline-none transition-transform duration-500 ease-out ${isEditing ? "border-purple-500" : "disabled:opacity-50"}`}
              disabled={!isEditing}
            />
          </div>

          {/* Role */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-400 mb-2 tracking-wider uppercase">Role</label>
            <input
              type="text"
              name="role"
              value={adminData.role}
              onChange={handleInputChange}
              className={`py-4 px-6 w-full bg-black bg-opacity-30 border-none rounded-lg text-white shadow-2xl neon-input transform group-hover:scale-105 group-hover:shadow-holo focus:outline-none transition-transform duration-500 ease-out ${isEditing ? "border-purple-500" : "disabled:opacity-50"}`}
              disabled={!isEditing}
            />
          </div>

          {/* Joined Date */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-400 mb-2 tracking-wider uppercase">Joined Date</label>
            <input
              type="text"
              name="joinedDate"
              value={adminData.joinedDate}
              onChange={handleInputChange}
              className={`py-4 px-6 w-full bg-black bg-opacity-30 border-none rounded-lg text-white shadow-2xl neon-input transform group-hover:scale-105 group-hover:shadow-holo focus:outline-none transition-transform duration-500 ease-out ${isEditing ? "border-purple-500" : "disabled:opacity-50"}`}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-16 flex justify-center space-x-10">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="relative inline-block px-12 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-lg font-bold uppercase text-white tracking-wide rounded-full shadow-neon hover:scale-110 transform transition-transform duration-700"
            >
              Update Profile
            </button>
          ) : (
            <button
              onClick={handleSaveClick}
              className="relative inline-block px-12 py-4 bg-gradient-to-r from-green-600 to-teal-500 text-lg font-bold uppercase text-white tracking-wide rounded-full shadow-neon hover:scale-110 transform transition-transform duration-700"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
