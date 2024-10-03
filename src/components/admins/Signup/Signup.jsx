import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminSignupForm = () => {
  const URL='https://webmasters-backend-2.onrender.com'
  let navigate=useNavigate()
  // State to hold the form values
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State to handle success/error messages
  const [message, setMessage] = useState(null);

  // Handle change for form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${URL}/admin/admin/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: signupData.name,
          email: signupData.email,
          password: signupData.password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Admin signup successful!");
        
      } else {
        setMessage(result.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setMessage("Error connecting to the server.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-teal-500 flex justify-center items-center p-6 pt-24">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Signup</h2>
        <form onSubmit={handleSubmit}>
          {/* Display message */}
          {message && <div className="mb-4 text-center text-red-500">{message}</div>}

          {/* Name Input */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={signupData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={signupData.email}
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
              value={signupData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={signupData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out font-semibold shadow-lg"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSignupForm;
