import React, { useState } from "react";

const ForgetPassword = () => {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("OTP sent to your email");
        setStep(2);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Server error");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("OTP verified");
        setStep(3);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Server error");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Password reset successfully!");
        window.location.href = "/login";
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="w-full">
          <h2 className="w-full text-2xl font-bold mb-0 text-center text-white bg-black rounded-2xl py-3">
            Forgot Password
          </h2>
        </div>

        <form
          onSubmit={
            step === 1
              ? handleEmailSubmit
              : step === 2
              ? handleOtpSubmit
              : handlePasswordSubmit
          }
          className="bg-white dark:bg-gray-800 p-8 pt-6 rounded-xl shadow-md w-full"
        >
          {step === 1 && (
            <div className="mb-6">
              <label className="block mb-1 text-gray-700 dark:text-gray-200">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-2xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          {step === 2 && (
            <div className="mb-6">
              <label className="block mb-1 text-gray-700 dark:text-gray-200">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-2xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          {step === 3 && (
            <div className="mb-6">
              <label className="block mb-1 text-gray-700 dark:text-gray-200">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-2xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-2 rounded-2xl transition"
          >
            {step === 1
              ? "Send OTP"
              : step === 2
              ? "Verify OTP"
              : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
