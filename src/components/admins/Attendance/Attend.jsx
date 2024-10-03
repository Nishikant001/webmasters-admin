import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making API requests
import { jsPDF } from "jspdf";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Colors for the pie chart segments
const COLORS = ["#34D399", "#F87171"]; // Green for Present, Red for Absent

const StudentAttendance = () => {
  const URL='https://webmasters-backend-2.onrender.com'
  const [batches, setBatches] = useState([]); // To store fetched batches data
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [date, setDate] = useState("");
  const [attendance, setAttendance] = useState({});
  const [attendanceRecords, setAttendanceRecords] = useState({}); // This is for storing submitted attendance data

  // Fetch batches when the component mounts
  useEffect(() => {
    axios
      .get(`${URL}/batch/batches`)
      .then((response) => {
        setBatches(response.data); // Store the fetched batches
      })
      .catch((error) => {
        console.error("Error fetching batches:", error);
      });
  }, []);

  // Handle attendance status for each student
  const handleAttendance = (student, status) => {
    setAttendance((prevState) => ({
      ...prevState,
      [student]: status,
    }));
  };

  // Submit Attendance
  const submitAttendance = () => {
    if (!selectedBatch || !date) {
      alert("Please select a batch and date.");
      return;
    }

    const attendanceData = {
      batchId: selectedBatch._id, // Send the selected batch ID
      date,
      attendance, // Attendance object with student names and status
    };

    axios
      .post(`${URL}/attendance/attendance`, attendanceData)
      .then((response) => {
        // Update attendance records after submission
        const newRecords = { ...attendanceRecords };
        selectedBatch.students.forEach((student) => {
          if (!newRecords[student.name]) {
            newRecords[student.name] = [];
          }
          newRecords[student.name].push({
            date,
            status: attendance[student.name] || "Absent",
            batch: selectedBatch.name,
            course: selectedBatch.course,
          });
        });
        setAttendanceRecords(newRecords);
        alert("Attendance submitted successfully");
      })
      .catch((error) => {
        console.error("Error submitting attendance:", error);
      });
  };

  // Generate PDF for student attendance
  const generatePdf = (student) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Attendance Record for ${student}`, 20, 20);

    const studentRecords = attendanceRecords[student] || [];
    if (studentRecords.length === 0) {
      doc.text("No attendance records found.", 20, 40);
    } else {
      let y = 40;
      doc.setFontSize(12);
      doc.text(`Date`, 20, y);
      doc.text(`Status`, 60, y);
      doc.text(`Batch`, 100, y);
      doc.text(`Course`, 140, y);

      y += 10;
      studentRecords.forEach((record) => {
        doc.text(record.date, 20, y);
        doc.text(record.status, 60, y);
        doc.text(record.batch, 100, y);
        doc.text(record.course, 140, y);
        y += 10;
      });
    }

    doc.save(`${student}_attendance.pdf`);
  };

  // Calculate Attendance Statistics for Pie Chart
  const attendanceStats = selectedBatch
    ? selectedBatch.students.reduce(
        (acc, student) => {
          const status = attendance[student.name];
          if (status === "Present") {
            acc.present++;
          } else {
            acc.absent++;
          }
          return acc;
        },
        { present: 0, absent: 0 }
      )
    : { present: 0, absent: 0 };

  // Data for pie chart
  const pieData = [
    { name: "Present", value: attendanceStats.present },
    { name: "Absent", value: attendanceStats.absent },
  ];

  // Data for bar chart
  const barData = selectedBatch
    ? selectedBatch.students.map((student) => ({
        name: student.name, // Dynamically updating student name
        status: attendance[student.name] === "Present" ? 1 : 0,
      }))
    : [];

  return (
    <div className=" mx-auto py-16 px-6 bg-gray-900 pt-28">
      <h1 className="text-5xl font-extrabold text-center text-gray-100 mb-10 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">
        Student Attendance System
      </h1>

      {/* Date and Batch Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div>
          <label className="block  text-lg font-semibold text-gray-300 mb-2">
            Select Date:
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 text-white py-3 border-none bg-gray-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-300 mb-2">
            Select Batch:
          </label>
          <select
            value={selectedBatch?.id || ""}
            onChange={(e) => {
              const batchId = e.target.value;
              const batch = batches.find((b) => b._id === batchId);
              setSelectedBatch(batch);
              setAttendance({});
            }}
            className="w-full px-4 py-3 text-white border-none bg-gray-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">-- Select Batch --</option>
            {batches.map((batch) => (
              <option key={batch._id} value={batch._id}>
                {batch.name} - {batch.course}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Student Attendance */}
      {selectedBatch && (
        <div>
          <h2 className="text-3xl font-semibold text-gray-200 mb-6">
            Mark Attendance for {selectedBatch.course}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {selectedBatch.students.map((student) => (
              <div
                key={student._id}
                className="p-6 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 border-none"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-green-300">
                      {student.name}
                    </h3>
                    <p className="text-gray-500">Student</p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleAttendance(student.name, "Present")}
                      className={`px-4 py-2 rounded-full font-semibold ${
                        attendance[student.name] === "Present"
                          ? "bg-green-600 text-white"
                          : "bg-gray-600 text-gray-300 hover:bg-green-600 hover:text-white"
                      } transition-all duration-300`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleAttendance(student.name, "Absent")}
                      className={`px-4 py-2 rounded-full font-semibold ${
                        attendance[student.name] === "Absent"
                          ? "bg-red-600 text-white"
                          : "bg-gray-600 text-gray-300 hover:bg-red-600 hover:text-white"
                      } transition-all duration-300`}
                    >
                      Absent
                    </button>
                  </div>
                </div>

                {/* Attendance Status */}
                {attendance[student.name] && (
                  <p
                    className={`mt-4 font-semibold ${
                      attendance[student.name] === "Present"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {student.name} is marked as {attendance[student.name]}.
                  </p>
                )}

                {/* Download PDF button */}
                <button
                  onClick={() => generatePdf(student.name)}
                  className="mt-4 px-4 py-2 bg-indigo-500 text-white text-sm font-semibold rounded-full hover:bg-indigo-600 transition-all duration-300 shadow-lg"
                >
                  Download PDF
                </button>
              </div>
            ))}
          </div>

          {/* Charts to visualize attendance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pie Chart */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-2xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-green-300 mb-4">
                Attendance Overview
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                    dataKey="value"
                    stroke="#FFF"
                    strokeWidth={2}
                    paddingAngle={5}
                    animationDuration={500}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-2xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-green-300 mb-4">
                Individual Attendance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="status"
                    fill="#34D399"
                    radius={[10, 10, 0, 0]}
                    animationDuration={500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10 text-center">
            <button
              onClick={submitAttendance}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white text-lg font-bold rounded-full hover:bg-green-600 transition-all duration-300 shadow-md"
            >
              Submit Attendance
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;
