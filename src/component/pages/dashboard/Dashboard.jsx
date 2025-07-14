import React from "react";
import { useOutletContext } from "react-router-dom";
import HeadBar from './sub-components/HeadBar';
import MiniCard from './sub-components/MiniCard';
import MainCard from './sub-components/MainCard';
import Calendar from './sub-components/Calendar';
import AboutCard from './sub-components/AboutCard';
import { FaLaptop, FaChalkboardTeacher } from "react-icons/fa";
import BarChartCard from "./sub-components/BarChartCard";
import useUserRole from "../../hook/useUserRole"; // Update this path as per your folder structure

function Dashboard() {
  const { sidebarOpen } = useOutletContext();
  const role = useUserRole();

  return (
    <div className="flex justify-evenly h-full w-full">
      <div className={`p-2 ${sidebarOpen ? "w-[53vw]" : "w-[63vw]"}`}>
        <HeadBar />

        {role === "student" && (
          <>
            <span className="block text-base font-semibold my-2 ">New Courses</span>
            <MiniCard />
            <span className="block text-lg font-semibold my-2 ">Top courses you may like</span>
            <MainCard />
          </>
        )}

        {role === "teacher" && (
          <>
            <span className="block text-lg font-semibold my-2 ">Your Active Batches</span>
            <MainCard />
          </>
        )}
      </div>

      <div className={`p-2 transition-all duration-300 ${sidebarOpen ? "w-[25vw]" : "w-[30vw]"}`}>
        <Calendar />
        {role === "student" ? (
          <>
        <AboutCard
          category="Course"
          title="Have more than 10+ courses"
          date="July 12"
          time="16:00–17:00"
          icon={<FaLaptop />}
        />
        <AboutCard
          category="Teachers"
          title="Have more than 50+ teachers"
          date="July 12"
          time="16:00–17:00"
          icon={<FaChalkboardTeacher />}
        />
        <AboutCard
          category="Events"
          title="Have more than 20+ events"
          date="July 12"
          time="16:00–17:00"
          icon={<FaLaptop />}
        />
        </>
        ):(
          <>
        <AboutCard
          category="Your Batches"
          title="You are managing 5 active batches"
          date="July 12"
          time="10:00–11:00"
          icon={<FaLaptop />}
        />

        <AboutCard
          category="Enrolled Students"
          title="Over 120 students enrolled in your courses"
          date="July 12"
          time="11:30–12:30"
          icon={<FaChalkboardTeacher />}
        />

        <AboutCard
          category="Upcoming Classes"
          title="Next class scheduled on July 14"
          date="July 14"
          time="14:00–15:00"
          icon={<FaLaptop />}
        />
        </>
        )}



        <BarChartCard />
      </div>
    </div>
  );
}

export default Dashboard;
