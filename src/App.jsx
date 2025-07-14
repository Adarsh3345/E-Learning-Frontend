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
        path: "/create-course",
        element: <CreateCoursePage/>, 
      },
      {
        path:"/create-week",
        element:<CreateWeekContent/>
      },
      {
        path: "/courses",
        element: <div>Courses Page</div>,
      },
      {
        path: "/teacher",
        element: <div>Teacher Page</div>,
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

// App Component
function App() {
  return <RouterProvider router={router} />;
}

export default App;
