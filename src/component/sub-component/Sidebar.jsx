import React from "react";
import { Link } from "react-router-dom";
import { X, Menu } from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed left-0 top-1/2 -translate-y-1/2 bg-black dark:bg-white text-white dark:text-black p-6 transition-all duration-300 z-40 flex flex-col
        ${isOpen ? "w-64" : "w-12"}
        h-[95vh]  ml-4 rounded-2xl
      `}
      style={{ top: "50%", transform: "translateY(-50%)" }}
    >
      <div className={`flex ${isOpen ? "justify-end" : "justify-center"} mb-4`}>
        <button onClick={onClose} className="focus:outline-none">
          {isOpen ? (
            <X className="w-6 h-6 text-white dark:text-black" />
          ) : (
            <Menu className="w-6 h-6 text-white dark:text-black" />
          )}
        </button>
      </div>

      <ul className={`space-y-4 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <li>
          <Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/create-course" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
            Courses
          </Link>
        </li>
        <li>
          <Link to="/teacher" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
            Teacher
          </Link>
        </li>
        <li>
          <Link to="/messages" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
            Messages
          </Link>
        </li>
        <li>
          <Link to="/payment" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
            Payment
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
