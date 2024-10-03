// CourseManagement.js
import React, { useState } from "react";

const CourseManagement = () => {
  // State for courses and new course input
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: "", description: "" });
  const [editCourse, setEditCourse] = useState(null);
  const [announcement, setAnnouncement] = useState("");

  // Handle input change for new courses
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  // Add or edit a course
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editCourse) {
      // Edit existing course
      setCourses((prev) =>
        prev.map((course) =>
          course.id === editCourse.id ? { ...course, ...newCourse } : course
        )
      );
      setEditCourse(null);
    } else {
      // Add new course
      setCourses((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: newCourse.title,
          description: newCourse.description,
        },
      ]);
    }
    setNewCourse({ title: "", description: "" });
  };

  // Edit course functionality
  const handleEdit = (course) => {
    setNewCourse({ title: course.title, description: course.description });
    setEditCourse(course);
  };

  // Delete course functionality
  const handleDelete = (id) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  // Post an announcement
  const handlePostAnnouncement = () => {
    if (announcement.trim()) {
      alert(`Announcement posted: ${announcement}`);
      setAnnouncement("");
    } else {
      alert("Please enter an announcement.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 p-5 shadow-md">
        <h1 className="text-white text-3xl font-bold">
          Course Management Dashboard
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Dashboard Overview */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-xl font-semibold mb-3">Dashboard Overview</h2>
            <div className="space-y-2">
              <p>
                Total Courses:{" "}
                <span className="font-bold">{courses.length}</span>
              </p>
              <p>
                Active Users: <span className="font-bold">150</span>
              </p>
              <p>
                Enrollments Today: <span className="font-bold">5</span>
              </p>
            </div>
          </div>

          {/* Course Management */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-xl font-semibold mb-3">Course Management</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={newCourse.title}
                onChange={handleInputChange}
                placeholder="Course Title"
                className="border p-2 w-full mb-2 rounded-md"
                required
              />
              <input
                type="text"
                name="description"
                value={newCourse.description}
                onChange={handleInputChange}
                placeholder="Course Description"
                className="border p-2 w-full mb-2 rounded-md"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                {editCourse ? "Update Course" : "Add New Course"}
              </button>
            </form>
            <ul className="mt-4 space-y-2">
              {courses.map((course) => (
                <li
                  key={course.id}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                >
                  <span>{course.title}</span>
                  <div>
                    <button
                      onClick={() => handleEdit(course)}
                      className="text-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* User Management */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-xl font-semibold mb-3">User Management</h2>
            <ul className="space-y-2">
              <li className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                <span>John Doe</span>
                <span className="text-green-600">Enrolled</span>
              </li>
              <li className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                <span>Jane Smith</span>
                <span className="text-red-600">Not Enrolled</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Reports */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-xl font-semibold mb-3">
              Reports and Analytics
            </h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Generate Report
            </button>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-xl font-semibold mb-3">Settings</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Configure Platform
            </button>
          </div>
        </div>

        {/* Communication Tools */}
        <div className="mt-5 bg-white rounded-lg shadow-md p-5">
          <h2 className="text-xl font-semibold mb-3">Communication Tools</h2>
          <textarea
            className="w-full h-24 border rounded-md p-2"
            placeholder="Post an announcement..."
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
          ></textarea>
          <button
            onClick={handlePostAnnouncement}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Post Announcement
          </button>
        </div>
      </main>
    </div>
  );
};

export default CourseManagement;
