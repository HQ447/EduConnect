import React from "react";

function Work() {
  return (
    <div className="flex flex-col justify-center items-center w-full py-12 px-6 bg-gray-50 md:px-16 lg:px-24">
      <h1
        id="Work"
        className="text-4xl font-bold text-gray-800 text-center mb-10 md:text-5xl"
      >
        How It Works
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full max-w-5xl">
        <div className="p-6 max-w-sm bg-white rounded-2xl shadow-lg flex flex-col justify-center items-center gap-4 hover:shadow-xl transition-shadow">
          <img
            src="img"
            alt="Create Profile illustration"
            className="w-24 h-24"
          />
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            Create Profile
          </h2>
        </div>

        <div className="p-6 max-w-sm bg-white rounded-2xl shadow-lg flex flex-col justify-center items-center gap-4 hover:shadow-xl transition-shadow">
          <img src="img" alt="Sign Up illustration" className="w-24 h-24" />
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            Sign Up
          </h2>
        </div>

        <div className="p-6 max-w-sm bg-white rounded-2xl shadow-lg flex flex-col justify-center items-center gap-4 hover:shadow-xl transition-shadow">
          <img
            src="img"
            alt="Connect and Start Learning illustration"
            className="w-24 h-24"
          />
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            Connect & Start Learning
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Work;
