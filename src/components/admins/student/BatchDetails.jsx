import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BatchDetails = ({ batchId }) => {
  const [batchDetails, setBatchDetails] = useState(null);
  const URL='https://webmasters-backend-2.onrender.com'

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await axios.get(`${URL}/batch/batch/${batchId}`);
        setBatchDetails(response.data); // Set the batch details
      } catch (error) {
        console.error('Error fetching batch details:', error);
      }
    };

    if (batchId) {
      fetchBatchDetails(); // Fetch batch details when batchId changes
    }
  }, [batchId]);

  if (!batchDetails) {
    return <p>Loading batch details...</p>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-10">
      <h3 className="text-xl font-bold text-gray-200 mb-4">Batch Details</h3>
      <p className="text-gray-300 mb-2">Name: {batchDetails.name}</p>
      <p className="text-gray-300 mb-2">Course: {batchDetails.course}</p>
      <p className="text-gray-300 mb-2">Created At: {new Date(batchDetails.createdAt).toLocaleString()}</p>
      <div className="text-gray-300">
        <h4 className="font-semibold mb-2">Enrolled Students:</h4>
        {batchDetails.students.length > 0 ? (
          <ul>
            {batchDetails.students.map((student) => (
              <li key={student._id}>{student.name} - {student.email}</li>
            ))}
          </ul>
        ) : (
          <p>No students enrolled.</p>
        )}
      </div>
    </div>
  );
};

export default BatchDetails;
