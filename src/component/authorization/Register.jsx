import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("Student");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      ...form,
      role: role.toLowerCase(), 
    };

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful!");
        console.log(data);
        if(data.role === "student") { 
        navigate("/login"); 
        }else {
        navigate("/waitlist");
        }
      } else {
        alert(data.error || "Registration failed!");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
      <div className="w-full max-w-md">
        <div className="w-full">
          <h2 className="w-full text-2xl font-bold mb-0 text-center text-white bg-black dark:bg-white dark:text-black rounded-t-2xl py-4">
            Sign in
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-black p-8 pt-6 rounded-b-xl shadow-md w-full border-0 dark:border dark:border-white"
        >
          <div className="mb-4">
            <label className="block mb-1 text-black dark:text-white">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-black dark:text-white">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-black dark:text-white">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-black dark:text-white">Role</label>
            <select
              value={role}
              onChange={handleRoleChange}
              className="w-full px-4 py-2 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 font-semibold py-2 rounded-2xl transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;