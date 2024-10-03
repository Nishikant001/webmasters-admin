import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDetails = ({ studentId, onDeleteStudent }) => {
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    enrolledCourses: [],
    totalFees: 0,
    paidFees: 0,
    remainingFees: 0,
    role: ''
  });

  // Fetch student details when component loads
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/students/student/${studentId}`);
        setStudent(response.data);
        setUpdatedStudent(response.data);  // Populate the form with student data
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudentDetails();
  }, [studentId]);

  // Toggle between editing and non-editing mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission for updating student details
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/students/student/${studentId}`, updatedStudent);
      setStudent(updatedStudent);  // Update the state with the new data
      setIsEditing(false);  // Disable editing mode
    } catch (error) {
      console.error('Error updating student details:', error);
    }
  };

  // Handle student deletion
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      try {
        await axios.delete(`http://localhost:5000/students/student/${studentId}`);
        onDeleteStudent(studentId);  // Call parent component method to update UI
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  // Render loading state while student details are being fetched
  if (!student) {
    return <p>Loading student details...</p>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-200 mb-4">
        {isEditing ? `Edit Details for ${student.name}` : `Details for ${student.name}`}
      </h3>

      {isEditing ? (
        <div>
          {/* Render the form with fields */}
          <div className="mb-4">
            <label className="block text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={updatedStudent.name}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 rounded-md bg-gray-700 text-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={updatedStudent.email}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 rounded-md bg-gray-700 text-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300">Age</label>
            <input
              type="number"
              name="age"
              value={updatedStudent.age}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 rounded-md bg-gray-700 text-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300">Gender</label>
            <select
              name="gender"
              value={updatedStudent.gender}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 rounded-md bg-gray-700 text-gray-100"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300">Total Fees</label>
            <input
              type="number"
              name="totalFees"
              value={updatedStudent.totalFees}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 rounded-md bg-gray-700 text-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300">Paid Fees</label>
            <input
              type="number"
              name="paidFees"
              value={updatedStudent.paidFees}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 rounded-md bg-gray-700 text-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300">Remaining Fees</label>
            <input
              type="number"
              name="remainingFees"
              value={updatedStudent.remainingFees}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 rounded-md bg-gray-700 text-gray-100"
            />
          </div>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition duration-200"
            onClick={handleUpdate}
          >
            Save Changes
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 ml-4 rounded-md hover:bg-red-500 transition duration-200"
            onClick={handleEditToggle}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          {/* Render student details */}
          <p>Email: {student.email}</p>
          <p>Age: {student.age}</p>
          <p>Gender: {student.gender}</p>
          <p>Total Fees: ₹{student.totalFees}</p>
          <p>Paid Fees: ₹{student.paidFees}</p>
          <p>Remaining Fees: ₹{student.remainingFees}</p>

          <div className="mt-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-200"
              onClick={handleEditToggle}
            >
              Edit
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 ml-4 rounded-md hover:bg-red-500 transition duration-200"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
