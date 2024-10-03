import React, { useState } from 'react';

const demoStudents = [
  { _id: '1', name: 'John Doe' },
  { _id: '2', name: 'Jane Smith' },
  { _id: '3', name: 'Samuel Green' }
];

const AdminCreateBatch = ({ onCreateBatch }) => {
  const [batchName, setBatchName] = useState('');
  const [course, setCourse] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleStudentSelection = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleCreateBatch = () => {
    if (!batchName || !course || selectedStudents.length === 0) {
      alert('Please fill in all fields and select at least one student.');
      return;
    }

    const newBatch = {
      name: batchName,
      course,
      students: selectedStudents
    };

    // Trigger callback to add the new batch
    onCreateBatch(newBatch);

    // Reset form
    setBatchName('');
    setCourse('');
    setSelectedStudents([]);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">Create New Batch</h2>

      <div className="mb-4">
        <label className="block text-gray-300">Batch Name</label>
        <input
          type="text"
          className="w-full p-2 mt-1 rounded-md bg-gray-700 text-gray-100"
          value={batchName}
          onChange={(e) => setBatchName(e.target.value)}
          placeholder="Enter batch name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300">Course</label>
        <input
          type="text"
          className="w-full p-2 mt-1 rounded-md bg-gray-700 text-gray-100"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="Enter course name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300">Select Students</label>
        <div className="flex flex-col space-y-2 mt-2">
          {demoStudents.map((student) => (
            <label key={student._id} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedStudents.includes(student._id)}
                onChange={() => handleStudentSelection(student._id)}
              />
              {student.name}
            </label>
          ))}
        </div>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-200"
        onClick={handleCreateBatch}
      >
        Create Batch
      </button>
    </div>
  );
};

export default AdminCreateBatch;
