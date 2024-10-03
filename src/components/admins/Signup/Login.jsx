import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AdminLoginForm = ({onLogin}) => {
  const URL='https://webmasters-backend-2.onrender.com'
  let navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // New state for managing loading

  // Handle change for form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      // Log the request start
      console.log("Attempting login with", loginData);

      // Send the POST request using Axios
      const response = await axios.post(`${URL}/admin/admin/login`, {
        email: loginData.email,
        password: loginData.password,
      });

      // Log the API response for debugging
      console.log("API Response:", response.data);

      const result = response.data; // Get the data from the response

      // Store the token, admin ID, and role in localStorage
      localStorage.setItem("token", result.token);
      localStorage.setItem("adminId", result.admin.id);
      localStorage.setItem("role", result.admin.role);
      onLogin(result.token,result.admin.role);

      // Show success toast
      toast.success("Login successful!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      if (result.admin.role === "admin") {
        navigate('/admin-dashboard'); // Redirect to student dashboard
      } else {
        navigate('/'); // Redirect to home page for other roles
      }
      // Immediately navigate to the admin dashboard
      

    } catch (error) {
      console.error("Error during login:", error); // Log the error

      if (error.response) {
        // If error is related to the response, show the response message
        toast.error(error.response.data.message || "Login failed.", {
          
        });
      } else {
        // If error is not related to the response (e.g., network issues)
        toast.error("Error connecting to the server.", {
        
        });
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-teal-500 flex justify-center items-center p-6 pt-24">
      <ToastContainer />  {/* Add ToastContainer to enable toast notifications */}
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Admin Email Input */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}  // Disable button while loading
              className={`w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out font-semibold shadow-lg ${loading ? "opacity-50" : ""}`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        {/* Forgot Password */}
        <div className="text-center mt-4">
          <a href="/forgot-password" className="text-sm text-green-600 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginForm;
