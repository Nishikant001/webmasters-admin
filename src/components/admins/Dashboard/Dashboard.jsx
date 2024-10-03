import React from "react";

const AdminDashboard = () => {
  // Sample admin data
  const admin = {
    id: "ADM-67890",
    name: "Jane Smith",
    role: "Administrator",
    photo: "https://randomuser.me/api/portraits/women/85.jpg",
    stats: {
      totalStudents: 120,
      totalCourses: 15,
      pendingApprovals: 3,
    },
  };

  const students = [
    { id: "STU-12345", name: "John Doe", course: "React Basics", progress: 70 },
    { id: "STU-67890", name: "Jane Doe", course: "JavaScript Advanced", progress: 90 },
  ];

  const courses = [
    { id: "COURSE-001", title: "React Basics", status: "Published" },
    { id: "COURSE-002", title: "TailwindCSS Mastery", status: "Pending Approval" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center p-8">
          {/* Admin Photo */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden">
            <img
              src={admin.photo}
              alt={`${admin.name}'s profile`}
              className="object-cover w-full h-full"
            />
          </div>
          {/* Admin Info */}
          <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">{admin.name}</h2>
            <p className="text-gray-600 text-lg mt-2">ID: {admin.id}</p>
            <p className="text-gray-600 text-lg mt-1">Role: {admin.role}</p>
          </div>
        </div>

        {/* Admin Stats */}
        <div className="bg-gray-50 p-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">Admin Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stat Cards */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-800">Total Students</h4>
              <p className="text-gray-600 text-lg mt-2">{admin.stats.totalStudents}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-800">Total Courses</h4>
              <p className="text-gray-600 text-lg mt-2">{admin.stats.totalCourses}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-800">Pending Approvals</h4>
              <p className="text-gray-600 text-lg mt-2">{admin.stats.pendingApprovals}</p>
            </div>
          </div>
        </div>

        {/* Students Management Section */}
        <div className="bg-gray-50 p-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">Manage Students</h3>
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-6 text-left">Student ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Course</th>
                <th className="py-3 px-6 text-left">Progress</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="py-3 px-6">{student.id}</td>
                  <td className="py-3 px-6">{student.name}</td>
                  <td className="py-3 px-6">{student.course}</td>
                  <td className="py-3 px-6">{student.progress}%</td>
                  <td className="py-3 px-6">
                    <button className="bg-indigo-600 text-white py-1 px-3 rounded hover:bg-indigo-700 transition">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Courses Management Section */}
        <div className="bg-gray-50 p-8 mt-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">Manage Courses</h3>
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-6 text-left">Course ID</th>
                <th className="py-3 px-6 text-left">Course Title</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="py-3 px-6">{course.id}</td>
                  <td className="py-3 px-6">{course.title}</td>
                  <td className={`py-3 px-6 ${course.status === "Pending Approval" ? "text-yellow-500" : "text-green-500"}`}>
                    {course.status}
                  </td>
                  <td className="py-3 px-6">
                    <button className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition">
                      {course.status === "Pending Approval" ? "Approve" : "View"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-gray-50 p-8 mt-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">Recent Admin Activity</h3>
          <ul className="space-y-4">
            <li className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-600">
                <span className="font-semibold">Jane Smith</span> approved the course{" "}
                <span className="font-semibold">TailwindCSS Mastery</span>.
              </p>
              <p className="text-sm text-gray-500 mt-1">3 hours ago</p>
            </li>
            <li className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-600">
                <span className="font-semibold">Jane Smith</span> viewed progress of{" "}
                <span className="font-semibold">John Doe</span> in <span className="font-semibold">React Basics</span>.
              </p>
              <p className="text-sm text-gray-500 mt-1">1 day ago</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
