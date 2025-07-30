import React, { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./component/sub-component/Navbar";
import Sidebar from "./component/sub-component/Sidebar";
import Login from "./component/authorization/Login";
import Register from "./component/authorization/Register";
import ForgetPassword from "./component/authorization/Forget-password";
import Dashboard from "./component/pages/dashboard/Dashboard";
import WaitingPage from "./component/authorization/Waiting";
import CreateCoursePage from "./component/pages/Teacher/CreateCourse/CreateCoursePage";
import CreateWeekContent from "./component/pages/Teacher/WeekContent/CreateWeekContent";
import CreateQuizPage from "./component/pages/Teacher/CreateQuiz/CreateQuizPage";
import CoursePage from "./component/pages/Student/Course_dashboard/CoursePage";
import CourseWeekPage from "./component/pages/Student/CourseWeek/CourseWeekPage";
import CourseQuizPage from "./component/pages/Student/CourseQuiz/CourseQuizPage";
import { CourseProvider } from "./component/context/CourseContext";
import QuizResult from "./component/pages/Student/CourseQuiz/sub-components/QuizResult";
// Layout Component
const BlankLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Toggle sidebar open/close
  const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-white dark:bg-black overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleSidebarToggle}
      />

      <div className="flex-1 flex flex-col relative">
        {/* Navbar, pass sidebarOpen as prop */}
        <Navbar sidebarOpen={sidebarOpen} />

        {/* Main page content */}
        <main
          className={`flex-1 w-auto h-auto overflow-y-auto scrollbar-hide bg-white dark:bg-black text-black dark:text-white transition-all duration-300 ${sidebarOpen ? "ml-[20vw]" : "ml-[5rem]"
            }`}
        >
          <Outlet context={{ sidebarOpen }} />
        </main>
      </div>
    </div>
  );
};

// Set up routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgetPassword />,
      },
      {
        path: "/waitlist",
        element: <WaitingPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/my-create-course",
        element: <CreateCoursePage />,
      },
      {
        path: "/course/:course_id",
        element: <CoursePage />,
      },
      {
        path: "/week/:sectionIndex",
        element: <CreateWeekContent />,
      },
      {
        path: "/quiz/:sectionIndex/:componentIndex/:quizIndex",
        element: <CreateQuizPage />,
      },
      {
        path: "/course/:course_id/content/:course_content_id",
        element: <CourseWeekPage />,
      },
      {
        path:"/quiz/:quizId",
        element: <CourseQuizPage />,
      },
      {
        path:"/quiz-result/:email/:course_name/:quiz_title", 
        element:<QuizResult />
      },
      {
        path: "/messages",
        element: <div>Messages Page</div>,
      },
      {
        path: "/payment",
        element: <div>Payment Page</div>,
      },
    ],
  },
]);

function App() {
  return (
    <CourseProvider>
      <RouterProvider router={router} />
    </CourseProvider>
  );
}

export default App;