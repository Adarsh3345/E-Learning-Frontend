import React from "react";
import { FaLaptop, FaCalendarAlt, FaClock, FaChevronRight } from "react-icons/fa";

const AboutCard = ({
  category = "Course",
  title = "Business Prospect Analysis",
  date = "April 25",
  time = "11:00–12:00",
  icon = <FaLaptop />,
  onClick = () => {},
}) => {
  return (
    <div
      className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md cursor-pointer hover:bg-gray-50 transition mt-4"
      onClick={onClick}
    >
      {/* Left: Icon + Text Info */}
      <div className="flex items-start gap-4">
        {/* Icon Circle */}
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white text-lg">
          {icon}
        </div>

        {/* Info */}
        <div>
          <p className="text-xs text-gray-500">{category}</p>
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-xs" /> {date}
            </span>
            <span className="flex items-center gap-1">
              <FaClock className="text-xs" /> {time}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Arrow */}
      <FaChevronRight className="text-gray-400 text-sm" />
    </div>
  );
};

export default AboutCard;
