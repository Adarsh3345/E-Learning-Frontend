import React from 'react';

const WaitingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black px-4">
      <p className="text-xl text-black dark:text-white text-center mb-6">
        To verify your account, please fill out the form.
      </p>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSeZUVgMlO5VW-rUo72Z-EmipSbA4XjU48FUEOBhloMlmhIzjQ/viewform"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black dark:bg-white text-white dark:text-black font-semibold px-6 py-2 rounded-lg shadow-md hover:opacity-90 transition"
      >
        Go to Verification Form
      </a>
    </div>
  );
};

export default WaitingPage;
