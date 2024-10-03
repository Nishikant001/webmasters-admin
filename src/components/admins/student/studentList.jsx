import React from 'react';

const StudentList = ({ students, setSelectedStudent }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-y-scroll h-52">
      {students && students.length > 0 ? (
        <ul>
          {students.map((student) => (
            <li
              key={student._id}
              className="py-2 border-b border-gray-700 hover:bg-gray-700 cursor-pointer transition duration-200"
              onClick={() => setSelectedStudent(student._id)} // Pass only the _id
            >
              {student.name} - {student.email}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No students available.</p>
      )}
    </div>
  );
};

export default StudentList;
