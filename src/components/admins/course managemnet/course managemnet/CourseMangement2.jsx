import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement);

const CourseManagement2 = () => {
  const URL='https://webmasters-backend-2.onrender.com'
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [batchName, setBatchName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [createdBatch, setCreatedBatch] = useState(null); // Store created batch details

  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");
  const [newCourseDifficulty, setNewCourseDifficulty] = useState("Beginner");

  const [isEditing, setIsEditing] = useState(null);
  const [editedCourseName, setEditedCourseName] = useState("");
  const [editedCourseDescription, setEditedCourseDescription] = useState("");
  const [editedCourseDifficulty, setEditedCourseDifficulty] = useState("");

  useEffect(() => {
    fetchCourses();
    fetchStudents(); // Fetch students for batch creation
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${URL}/course/`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${URL}/students/students`); // Assuming this is your student API
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleAddNewCourse = async () => {
    const newCourse = {
      title: newCourseName,
      description: newCourseDescription,
      difficulty: newCourseDifficulty,
    };

    try {
      const response = await axios.post(`${URL}/course/create`, newCourse);
      setCourses([...courses, response.data]);
      setNewCourseName("");
      setNewCourseDescription("");
      setNewCourseDifficulty("Beginner");
    } catch (error) {
      console.error("Error adding new course:", error);
    }
  };

  const handleEditCourse = (course) => {
    setIsEditing(course._id);
    setEditedCourseName(course.title);
    setEditedCourseDescription(course.description);
    setEditedCourseDifficulty(course.difficulty);
  };

  const handleSaveCourse = async (courseId) => {
    const updatedCourse = {
      title: editedCourseName,
      description: editedCourseDescription,
      difficulty: editedCourseDifficulty,
    };

    try {
      const response = await axios.put(`${URL}/course/${courseId}`, updatedCourse);
      setCourses(courses.map((course) => (course._id === courseId ? response.data : course)));
      setIsEditing(null);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`${URL}/course/${courseId}`);
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleCreateBatch = async () => {
    const batchData = {
      name: batchName,
      course: selectedCourse,
      studentIds: selectedStudents,
    };

    try {
      const response = await axios.post(`${URL}/batch/batch`, batchData);
      setCreatedBatch(response.data.batch); // Store created batch details
      alert("Batch created successfully");
      setBatchName("");
      setSelectedCourse("");
      setSelectedStudents([]);
    } catch (error) {
      console.error("Error creating batch:", error);
    }
  };

  // Mock data for the line chart (student performance)
  const studentPerformanceData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Average Student Score",
        data: [70, 85, 90, 80], // Mock data
        fill: false,
        borderColor: "#4CAF50",
        tension: 0.1,
      },
    ],
  };

  // Mock data for the bar chart (enrollment statistics)
  const barData = {
    labels: courses.map((course) => course.title),
    datasets: [
      {
        label: "Enrollments",
        data: courses.map((course) => course.enrollments || 0), // Assuming 'enrollments' field exists, default to 0 if missing
        backgroundColor: "#FFA500",
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200 pt-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 shadow-md mb-6">
        <h1 className="text-white text-5xl font-bold text-center tracking-wide">
          Enhanced Course Dashboard
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Performance Chart */}
          <motion.div
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl p-6 transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Student Performance</h2>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Line data={studentPerformanceData} />
            </motion.div>
          </motion.div>

          {/* Enrollment Statistics */}
          <motion.div
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl p-6 transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Enrollment Statistics</h2>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Bar
                data={barData}
                options={{
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          const course = courses[context.dataIndex];
                          return `Enrollments: ${context.raw}, Popularity: ${course.popularityIndex || 'N/A'}/100, Difficulty: ${course.difficulty}`;
                        },
                      },
                    },
                  },
                }}
              />
            </motion.div>
          </motion.div>

          {/* Course Management */}
          <motion.div
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl p-6 transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Manage Courses</h2>

            <ul className="space-y-4">
              {courses.map((course) => (
                <li
                  key={course._id}
                  className="flex justify-between items-start bg-gray-800 p-4 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
                >
                  {isEditing === course._id ? (
                    <div className="flex flex-col w-full space-y-2">
                      <input
                        type="text"
                        value={editedCourseName}
                        onChange={(e) => setEditedCourseName(e.target.value)}
                        className="border border-gray-600 rounded-lg p-2 w-full bg-gray-900 text-gray-200 focus:ring focus:ring-green-500"
                        placeholder="Course Title"
                      />
                      <textarea
                        value={editedCourseDescription}
                        onChange={(e) => setEditedCourseDescription(e.target.value)}
                        className="border border-gray-600 rounded-lg p-2 w-full bg-gray-900 text-gray-200 focus:ring focus:ring-green-500"
                        placeholder="Course Description"
                      ></textarea>
                      <select
                        value={editedCourseDifficulty}
                        onChange={(e) => setEditedCourseDifficulty(e.target.value)}
                        className="border border-gray-600 rounded-lg p-2 bg-gray-900 text-gray-200 focus:ring focus:ring-green-500"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                      <div className="flex justify-end space-x-2 mt-2">
                        <button
                          onClick={() => setIsEditing(null)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveCourse(course._id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h3 className="text-xl font-bold text-white">{course.title}</h3>
                        <p className="text-gray-400 mt-1">{course.description}</p>
                        <span className="text-gray-400">Difficulty: {course.difficulty}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditCourse(course)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-white">Add New Course</h3>
            <div className="flex flex-col space-y-4 mt-4">
              <input
                type="text"
                placeholder="Course Name"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                className="border border-gray-600 rounded-lg p-2 bg-gray-900 text-gray-200 focus:ring focus:ring-blue-500"
              />
              <textarea
                placeholder="Course Description"
                value={newCourseDescription}
                onChange={(e) => setNewCourseDescription(e.target.value)}
                className="border border-gray-600 rounded-lg p-2 bg-gray-900 text-gray-200 focus:ring focus:ring-blue-500"
              ></textarea>
              <select
                value={newCourseDifficulty}
                onChange={(e) => setNewCourseDifficulty(e.target.value)}
                className="border border-gray-600 rounded-lg p-2 bg-gray-900 text-gray-200 focus:ring focus:ring-blue-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button
                onClick={handleAddNewCourse}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Add Course
              </button>
            </div>
          </motion.div>

          {/* Batch Creation */}
          <motion.div
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl p-6 transition-transform transform hover:scale-105 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Create Batch</h2>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Batch Name"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                className="border border-gray-600 rounded-lg p-2 bg-gray-900 text-gray-200 focus:ring focus:ring-blue-500"
              />
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="border border-gray-600 rounded-lg p-2 bg-gray-900 text-gray-200 focus:ring focus:ring-blue-500"
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>

              <div className="relative w-full">
  <label className="block text-sm font-medium text-gray-300 mb-2">Select Students</label>
  <div className="relative bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
    <div className="block w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 overflow-hidden">
      <div className="h-52 overflow-y-auto custom-scrollbar">
        {students.map((student) => (
          <div
            key={student._id}
            className="flex items-center px-4 py-2 transition-all duration-200 hover:bg-indigo-600 rounded-md cursor-pointer"
          >
            <input
              type="checkbox"
              value={student._id}
              checked={selectedStudents.includes(student._id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedStudents([...selectedStudents, e.target.value]);
                } else {
                  setSelectedStudents(selectedStudents.filter((id) => id !== e.target.value));
                }
              }}
              className="h-5 w-5 text-indigo-500 transition duration-150 ease-in-out focus:ring-2 focus:ring-indigo-500 border-gray-600 rounded"
            />
            <label
              htmlFor={student._id}
              className="ml-3 text-gray-300 text-md font-medium hover:text-white transition-colors duration-200"
            >
              {student.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
              <button
                onClick={handleCreateBatch}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Create Batch
              </button>
            </div>

            {createdBatch && (
              <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-white">Batch Details</h3>
                <p className="text-gray-300">Batch Name: {createdBatch.name}</p>
                <p className="text-gray-300">Course: {courses.find(course => course._id === createdBatch.course)?.title}</p>
                <p className="text-gray-300">Students:</p>
                <ul className="list-disc pl-6">
                  {createdBatch.students.map((studentId) => (
                    <li key={studentId} className="text-gray-300">
                      {students.find(student => student._id === studentId)?.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CourseManagement2;
