import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPostResultsForm = () => {
  const URL='https://webmasters-backend-2.onrender.com'
  const [formData, setFormData] = useState({
    studentId: '',
    marksObtained: '',
    totalMarks: '',
    grade: '',
    status: '',
    comments: ''
  });
  
  const [batches, setBatches] = useState([]); // Store fetched batches
  const [students, setStudents] = useState([]); // Store students from the selected batch
  const [selectedBatch, setSelectedBatch] = useState(''); // Track the selected batch
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  // Fetch batches from API on component load
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get(`${URL}/batch/batches`);
        setBatches(response.data); // Store the batch list from API
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };
    fetchBatches();
  }, []);

  // Fetch students when a batch is selected
  const handleBatchChange = async (e) => {
    const batchId = e.target.value;
    setSelectedBatch(batchId);
    setFormData({ ...formData, studentId: '' }); // Reset studentId when batch changes
    try {
      // Find the selected batch and get its students
      const selectedBatch = batches.find((batch) => batch._id === batchId);
      setStudents(selectedBatch.students); // Update students dropdown based on the selected batch
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Corrected handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Submit the form data to the API
      const response = await axios.post(`${URL}/results/results`, formData);

      // Handle the response
      setResponseMessage(response.data.message);
    } catch (error) {
      // Display error message if submission fails
      setResponseMessage('Error posting result. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 pt-28 h-full">
      {/* Form Container */}
      <div className="relative z-10 w-full max-w-lg p-10 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl transition-transform transform hover:scale-105 hover:shadow-holo border border-gray-700 border-opacity-20">

        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 mb-8">
          Post Exam Results
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Select Batch Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-300">Select Batch</label>
            <select
              name="batch"
              value={selectedBatch}
              onChange={handleBatchChange}
              required
              className="mt-1 block w-full px-5 py-3 border-0 text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-inner focus:ring-4 focus:ring-pink-500 transition duration-300"
            >
              <option value="" className='bg-gray-900'>Select Batch</option>
              {batches.map((batch) => (
                <option key={batch._id} value={batch._id} className='bg-gray-900'>
                  {batch.name} - {batch.course}
                </option>
              ))}
            </select>
          </div>

          {/* Select Student Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-300">Select Student</label>
            <select
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-5 py-3 border-0 text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-inner focus:ring-4 focus:ring-pink-500 transition duration-300"
            >
              <option value="" className='bg-gray-900'>Select Student</option>
              {students.map((student) => (
                <option key={student._id} value={student._id} className='bg-gray-900'>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          {/* Marks Obtained and Total Marks */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300">Marks Obtained</label>
              <input
                type="number"
                name="marksObtained"
                value={formData.marksObtained}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-5 py-3 border-0 text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-inner focus:ring-4 focus:ring-pink-500 transition duration-300"
                placeholder="Marks"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300">Total Marks</label>
              <input
                type="number"
                name="totalMarks"
                value={formData.totalMarks}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-5 py-3 border-0 text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-inner focus:ring-4 focus:ring-pink-500 transition duration-300"
                placeholder="Total Marks"
              />
            </div>
          </div>

          {/* Grade and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300">Grade</label>
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-5 py-3 border-0 text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-inner focus:ring-4 focus:ring-pink-500 transition duration-300"
                placeholder="Grade"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-5 py-3 border-0 text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-inner focus:ring-4 focus:ring-pink-500 transition duration-300"
              >
                <option value="" className='bg-gray-900'>Select Status</option>
                <option value="Pass" className='bg-gray-900'>Pass</option>
                <option value="Fail" className='bg-gray-900'>Fail</option>
              </select>
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-semibold text-gray-300">Comments</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="mt-1 block w-full px-5 py-3 border-0 text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-inner focus:ring-4 focus:ring-pink-500 transition duration-300"
              placeholder="Add any comments"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-2xl hover:shadow-neon transition duration-300 transform hover:scale-105"
            >
              {loading ? 'Posting...' : 'Submit Result'}
            </button>
          </div>

          {responseMessage && (
            <p className="text-center text-sm mt-4 text-indigo-400">{responseMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminPostResultsForm;
