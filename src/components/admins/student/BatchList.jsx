import React, { useState } from 'react';

const BatchList = ({ batches = [], onSelectBatch }) => {
  const [selectedBatchId, setSelectedBatchId] = useState(null);

  const handleBatchClick = (batchId) => {
    setSelectedBatchId(batchId); // Set the selected batch
    onSelectBatch(batchId); // Notify parent component
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      {batches && batches.length > 0 ? (
        <ul className='overflow-y-scroll h-52'>
          {batches.map((batch) => (
            <li
              key={batch._id}
              className={`py-2 border-b border-gray-700 cursor-pointer ${
                selectedBatchId === batch._id ? 'bg-gray-700' : ''
              }`}
              onClick={() => handleBatchClick(batch._id)} // Pass the batch ID on click
            >
              <div className="font-bold text-gray-100">{batch.name}</div>
              <div className="text-sm text-gray-400">Course: {batch.course}</div>
              <div className="text-sm text-gray-400">
                Students Enrolled:{' '}
                {batch.students.length > 0
                  ? batch.students.map((student) => student.name).join(', ')
                  : 'None'}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No batches available.</p>
      )}
    </div>
  );
};

export default BatchList;
