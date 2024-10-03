import React, { useState } from "react";

// List of courses with detailed content and images
const courses = [
  {
    id: 1,
    title: "Web Technology",
    image: "https://via.placeholder.com/400x200.png?text=Web+Technology",
    content: [
      "HTML5, CSS3, and JavaScript fundamentals",
      "Responsive Web Design (Bootstrap, Flexbox, Grid)",
      "Introduction to Web APIs and AJAX",
      "Basic Version Control with Git",
      "Project Deployment (Netlify/Heroku)",
    ],
    fees: "3299 + 500 (registration fee)",
    projects: [
      "Build a responsive portfolio website",
      "Create a dynamic blog page with APIs",
    ],
    duration: "3 months",
    certification: "Web Technology Certificate",
  },
  {
    id: 2,
    title: "MERN Stack",
    image: "https://via.placeholder.com/400x200.png?text=MERN+Stack",
    content: [
      "MongoDB, Express.js, React.js, and Node.js",
      "RESTful API Development with Node.js",
      "Advanced React.js concepts (Hooks, State Management)",
      "Authentication and Authorization (JWT)",
      "Frontend-Backend Communication and Deployment",
    ],
    fees: "7299 + 500 (registration fee)",
    projects: [
      "Full-stack web application (e.g., To-do App, Social Media Clone)",
      "E-commerce website",
    ],
    duration: "6-7 months",
    certification: "MERN Stack Developer Certificate",
  },
  {
    id: 3,
    title: "React + Web Technology",
    image: "https://via.placeholder.com/400x200.png?text=React+Web+Tech",
    content: [
      "Combining React.js with core web technologies (HTML, CSS, JavaScript)",
      "Building responsive layouts with React",
      "Advanced State Management and API Integration",
    ],
    fees: "5999 + 500 (registration fee)",
    projects: [
      "Build a multipage React website",
      "Integrate third-party APIs into React applications",
    ],
    duration: "4-5 months",
    certification: "Full Stack React Developer Certificate",
  },
  {
    id: 4,
    title: "Animations Libraries",
    image: "https://via.placeholder.com/400x200.png?text=Animations+Libraries",
    content: [
      "CSS3 Animations and Transitions",
      "JavaScript animation libraries (e.g., GSAP, Anime.js)",
      "SVG animations and Canvas",
      "Web Performance Optimization with Animations",
    ],
    fees: "5299 + 500 (registration fee)",
    projects: [
      "Create an animated landing page",
      "Interactive animations for web elements",
    ],
    duration: "2-3 months",
    certification: "Animation Specialist Certificate",
  },
  {
    id: 5,
    title: "UI/UX Design",
    image: "https://via.placeholder.com/400x200.png?text=UI/UX+Design",
    content: [
      "UI/UX Design principles",
      "Wireframing and Prototyping (Figma, Adobe XD)",
      "User Research and Personas",
      "Usability Testing",
      "Responsive Design and Mobile-first Approach",
    ],
    fees: "3299 + 500 (registration fee)",
    projects: [
      "Design a complete web app interface (wireframe to prototype)",
      "Conduct usability testing and iterate designs",
    ],
    duration: "2-3 months",
    certification: "UI/UX Designer Certificate",
  },
  {
    id: 6,
    title: "Java + Data Structures & Algorithms (DSA)",
    image: "https://via.placeholder.com/400x200.png?text=Java+DSA",
    content: [
      "Core Java Concepts",
      "Data Structures (Arrays, Linked Lists, Stacks, Queues, Trees, Graphs)",
      "Algorithms (Sorting, Searching, Recursion, Dynamic Programming)",
      "Competitive programming",
    ],
    fees: "3299 + 500 (registration fee)",
    projects: [
      "Implement various algorithms in Java",
      "Solve coding problems with DSA",
    ],
    duration: "3 months",
    certification: "Java & DSA Specialist Certificate",
  },
  {
    id: 7,
    title: "Bootstrap",
    image: "https://via.placeholder.com/400x200.png?text=Bootstrap",
    content: [
      "Introduction to Bootstrap Grid System",
      "Responsive Design with Bootstrap components",
      "Customizing Bootstrap themes",
      "Integrating JavaScript plugins",
    ],
    fees: "1000 + 200 (registration fee)",
    projects: [
      "Build a responsive website using Bootstrap",
      "Customize and deploy Bootstrap themes",
    ],
    duration: "4-6 weeks",
    certification: "Bootstrap Developer Certificate",
  },
  {
    id: 8,
    title: "Tailwind CSS",
    image: "https://via.placeholder.com/400x200.png?text=Tailwind+CSS",
    content: [
      "Introduction to Tailwind CSS",
      "Utility-First CSS concepts",
      "Customizing Tailwind classes",
      "Responsive design with Tailwind",
    ],
    fees: "1000 + 200 (registration fee)",
    projects: [
      "Build responsive layouts using Tailwind CSS",
      "Design a landing page or dashboard",
    ],
    duration: "4-6 weeks",
    certification: "Tailwind CSS Specialist Certificate",
  },
  {
    id: 9,
    title: "Only React",
    image: "https://via.placeholder.com/400x200.png?text=Only+React",
    content: [
      "In-depth focus on React.js fundamentals",
      "Building complex component structures",
      "State management and routing",
      "Testing React components (Jest, React Testing Library)",
    ],
    fees: "2299 + 500 (registration fee)",
    projects: [
      "Develop a real-time web application",
      "Create a React-based PWA (Progressive Web App)",
    ],
    duration: "2 months",
    certification: "React.js Developer Certificate",
  },
];

// Batch data structure
const initialBatches = [
  {
    id: 1,
    name: "Batch A",
    topics: [
      { title: "HTML Fundamentals", completed: false },
      { title: "CSS Basics", completed: false },
      { title: "JavaScript Essentials", completed: false },
      { title: "Bootstrap Introduction", completed: false },
      { title: "Web APIs Overview", completed: false },
    ],
  },
  {
    id: 2,
    name: "Batch B",
    topics: [
      { title: "MongoDB Basics", completed: false },
      { title: "Express.js Introduction", completed: false },
      { title: "React.js Fundamentals", completed: false },
      { title: "Node.js Basics", completed: false },
      { title: "Project Deployment", completed: false },
    ],
  },
];

// Accordion Component
const CourseManagement = () => {
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const [batches, setBatches] = useState(initialBatches);

  // Function to toggle the accordion
  const toggleCourse = (id) => {
    setExpandedCourseId(expandedCourseId === id ? null : id);
  };

  // Function to mark topic as completed
  const markTopicAsCompleted = (batchId, topicIndex) => {
    const updatedBatches = batches.map((batch) => {
      if (batch.id === batchId) {
        const updatedTopics = [...batch.topics];
        updatedTopics[topicIndex].completed = true; // Mark the topic as completed
        return { ...batch, topics: updatedTopics };
      }
      return batch;
    });
    setBatches(updatedBatches);
  };

  // Calculate completion percentage for a batch
  const calculateCompletion = (topics) => {
    const completedCount = topics.filter((topic) => topic.completed).length;
    return ((completedCount / topics.length) * 100).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Course Management System
      </h1>

      {/* Accordion Section */}
      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border rounded-lg overflow-hidden shadow-md"
          >
            {/* Accordion Header */}
            <div
              className="bg-blue-500 text-white p-4 cursor-pointer flex justify-between items-center"
              onClick={() => toggleCourse(course.id)}
            >
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <span
                className={`transform transition-transform duration-300 ${
                  expandedCourseId === course.id ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </div>

            {/* Accordion Content */}
            {expandedCourseId === course.id && (
              <div className="bg-white p-6">
                {/* Course Image */}
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-32 object-cover mb-4"
                />

                {/* Course Details */}
                <h3 className="text-lg font-semibold">Content:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {course.content.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700 mt-2">Fees: {course.fees}</p>
                <p className="text-gray-700 mt-2">
                  Duration: {course.duration}
                </p>
                <p className="text-gray-700 mt-2">
                  Certification: {course.certification}
                </p>

                {/* Project Section */}
                <h3 className="text-lg font-semibold mt-4">Projects:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {course.projects.map((project, index) => (
                    <li key={index} className="text-gray-700">
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Batch Management Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Batch Management
        </h2>
        {batches.map((batch) => (
          <div
            key={batch.id}
            className="border rounded-lg overflow-hidden shadow-md mb-4"
          >
            <div className="bg-green-500 text-white p-4">
              <h3 className="text-xl font-semibold">{batch.name}</h3>
            </div>
            <div className="bg-white p-4">
              <h4 className="text-lg font-semibold mb-2">Topics:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {batch.topics.map((topic, index) => (
                  <li
                    key={index}
                    className="text-gray-700 cursor-pointer"
                    onClick={() => markTopicAsCompleted(batch.id, index)}
                  >
                    <span
                      className={
                        topic.completed ? "line-through text-gray-500" : ""
                      }
                    >
                      {topic.title}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 mt-2">
                Completion Percentage: {calculateCompletion(batch.topics)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseManagement;
