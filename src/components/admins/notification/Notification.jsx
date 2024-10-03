import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoNotificationsOutline } from "react-icons/io5";
import axios from "axios";

// Register GSAP's ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Modal Component
const Modal = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-11/12 md:w-1/2 lg:w-1/3 backdrop-blur-lg bg-opacity-10">
        <h2 className="text-3xl font-bold mb-4 text-indigo-600">{notification.title}</h2>
        <p className="text-gray-600 mb-4">{notification.message}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">Date: {notification.date}</span>
          <span className="text-sm text-gray-500">From: {notification.name}</span>
        </div>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-2 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const NotificationsPage = () => {
  const URL='https://webmasters-backend-2.onrender.com'
  const notificationRefs = useRef([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const notificationsPerPage = 5;

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${URL}/admin/notifications`);
        const fetchedNotifications = response.data;

        setNotifications(fetchedNotifications);
        setTotalPages(Math.ceil(fetchedNotifications.length / notificationsPerPage));
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Get the notifications for the current page
  const paginatedNotifications = notifications.slice(
    (currentPage - 1) * notificationsPerPage,
    currentPage * notificationsPerPage
  );

  // GSAP ScrollTrigger animation for cards
  useEffect(() => {
    notificationRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, [paginatedNotifications]);

  // Function to open modal with the clicked notification
  const handleViewDetails = (notification) => {
    setSelectedNotification(notification);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <section className="relative  mx-auto py-16 px-6 bg-gray-900">
      {/* Ambient Background Lighting */}
      <div className="absolute inset-0  "></div>

     

      <h1 className="relative z-10 text-5xl font-extrabold text-center text-gray-100 mb-12 pt-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-500">
        Notifications
      </h1>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
  {paginatedNotifications.map((notification, index) => (
    <div 
      key={notification._id}
      ref={(el) => (notificationRefs.current[index] = el)}
      className={`relative bg-gradient-to-br from-blue-800 to-purple-900 bg-opacity-20 backdrop-blur-md p-8 rounded-3xl shadow-2xl hover:shadow-holo transform transition-all duration-700 hover:-translate-y-3 hover:scale-105 ${
        notification.unread ? "border-l-4 border-indigo-500" : ""
      }`}
    >
      {/* Notification Badge for Unread Notifications */}
      {notification.unread && (
        <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          New
        </span>
      )}

      {/* Sender's Name */}
      <div className="text-sm text-gray-400 mb-2 font-medium">
        Sent by: <span className="text-white font-bold">
          {notification.studentId ? notification.studentId.name : "Unknown"}
        </span>
      </div>

      <div className="flex justify-between items-center mb-3">
        <IoNotificationsOutline className="text-indigo-300 text-4xl" />
        <span className="text-sm text-gray-400">{notification.createdAt.split("T")[0]}</span>
      </div>

      <h4 className="text-2xl font-semibold text-white mb-2">{notification.title}</h4>

      <p className="text-gray-300 mb-6">{notification.message}</p>

      <div className="flex justify-between items-center">
        <button
          onClick={() => handleViewDetails(notification)}
          className="bg-gradient-to-r from-indigo-500 to-blue-400 text-white px-5 py-3 rounded-full font-semibold hover:scale-110 transform transition-transform duration-500"
        >
          View Details
        </button>
        <span className="text-sm text-gray-400">
          {notification.unread ? "Unread" : "Read"}
        </span>
      </div>
    </div>
  ))}
</div>


      {/* Pagination Controls */}
      <div className="relative z-10 flex justify-center items-center mt-10 space-x-4">
        <button
          onClick={handlePreviousPage}
          className={`px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:scale-105 transform transition-all duration-300 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-white text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className={`px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:scale-105 transform transition-all duration-300 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal for notification details */}
      <Modal notification={selectedNotification} onClose={handleCloseModal} />
    </section>
  );
};

export default NotificationsPage;
