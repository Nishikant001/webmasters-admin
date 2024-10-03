import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
      <div className="bg-purple-500 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <p className="text-gray-300 mt-5 text-lg text-center max-w-md">
        Oops! The page you're looking for doesn't exist. You might have the wrong address, or the page may have moved.
      </p>
      <Link
        to="/"
        className="mt-10 px-6 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
      >
        Go Back Home
      </Link>

      <div className="mt-10 flex space-x-4">
       
      </div>

      {/* Decorative elements for modern touch */}
      <div className="absolute w-32 h-32 bg-purple-500 rounded-full opacity-20 bottom-32 right-20 blur-2xl"></div>
      <div className="absolute w-24 h-24 bg-purple-700 rounded-full opacity-30 top-16 left-16 blur-xl"></div>
    </div>
  );
};

export default NotFoundPage;
