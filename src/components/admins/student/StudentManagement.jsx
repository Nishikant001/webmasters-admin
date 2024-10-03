import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentList from './studentList';
import StudentDetails from './StudentDetails';
import BatchList from './BatchList';
import BatchDetails from './BatchDetails';

const StudentManagement = () => {
   const URL='https://webmasters-backend-2.onrender.com'
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedBatchId, setSelectedBatchId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch students when the component loads
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${URL}/students/students`);
        setStudents(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to fetch students');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Fetch batches when the component loads
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get(`${URL}/batch/batches`);
        setBatches(response.data);
      } catch (err) {
        console.error('Error fetching batches:', err);
        setError('Failed to fetch batches');
      }
    };

    fetchBatches();
  }, []);

  // Update a student
  const handleUpdateStudent = (updatedStudent) => {
    const updatedStudents = students.map((student) =>
      student._id === updatedStudent._id ? updatedStudent : student
    );
    setStudents(updatedStudents);
  };

  // Delete a student
  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`${URL}/students/student/${studentId}`);
      const remainingStudents = students.filter((student) => student._id !== studentId);
      setStudents(remainingStudents);
      setSelectedStudentId(null); // Clear the selection
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  };

  // Handle student selection
  const handleSelectStudent = (studentId) => {
    setSelectedStudentId(studentId); // Ensure only the studentId is passed
  };

  // Handle batch selection
  const handleSelectBatch = (batchId) => {
    setSelectedBatchId(batchId); // Ensure only the batchId is passed
  };

  if (loading) {
    return <p>Loading students and batches...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-5 pt-28">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-100 mb-8">Student Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-300 mb-4">Student List</h2>
            <StudentList students={students} setSelectedStudent={handleSelectStudent} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-300 mb-4">Batch List</h2>
            <BatchList batches={batches} onSelectBatch={handleSelectBatch} />
          </div>
        </div>

        {selectedStudentId && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-300 mb-4">Student Details</h2>
            <StudentDetails
              studentId={selectedStudentId}  // Ensure studentId is passed correctly
              onUpdateStudent={handleUpdateStudent}
              onDeleteStudent={handleDeleteStudent}
            />
          </div>
        )}

        {selectedBatchId && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-300 mb-4">Batch Details</h2>
            <BatchDetails batchId={selectedBatchId} />  {/* Pass selected batchId to BatchDetails */}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentManagement;
