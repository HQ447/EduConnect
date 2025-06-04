import React from "react";

function Features() {
  return (
    <div>
      <div className="w-full h-auto py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full opacity-20 -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-100 rounded-full opacity-20 translate-x-20 translate-y-20"></div>
        <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-blue-300 rounded-full opacity-30"></div>
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-indigo-300 rounded-full opacity-40"></div>

        <div className="relative z-10">
          <h1
            id="Features"
            className="text-4xl md:text-5xl font-bold py-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Key Features Section
          </h1>
          <h2 className="text-xl md:text-2xl py-6 font-medium text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Our mission is to provide high-quality education accessible to
            everyone, anywhere
          </h2>

          <div className="flex flex-1 flex-wrap justify-center items-center w-full h-auto gap-8 mt-12">
            {/* Qualified Teachers Card */}
            <div className="w-[280px] h-[320px] bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl flex flex-col justify-center items-center gap-6 px-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-orange-100">
              <div className="w-[110px] h-[110px] bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex justify-center items-center shadow-lg relative">
                <div className="absolute inset-2 bg-white rounded-full opacity-20"></div>
                <div className="w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-orange-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <h1 className="font-bold text-xl text-gray-800 mb-3">
                  Qualified Teachers
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  All educators go through background checks and profile
                  verification
                </p>
              </div>
            </div>

            {/* Customized Learning Card */}
            <div className="w-[280px] h-[320px] bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl flex flex-col justify-center items-center gap-6 px-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-red-100">
              <div className="w-[110px] h-[110px] bg-gradient-to-br from-red-400 to-pink-400 rounded-full flex justify-center items-center shadow-lg relative">
                <div className="absolute inset-2 bg-white rounded-full opacity-20"></div>
                <div className="w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <h1 className="font-bold text-xl text-gray-800 mb-3">
                  Customized Learning
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  Personalized learning paths tailored to each student's unique
                  needs
                </p>
              </div>
            </div>

            {/* Seamless Scheduling Card */}
            <div className="w-[280px] h-[320px] bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl flex flex-col justify-center items-center gap-6 px-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-100">
              <div className="w-[110px] h-[110px] bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex justify-center items-center shadow-lg relative">
                <div className="absolute inset-2 bg-white rounded-full opacity-20"></div>
                <div className="w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <h1 className="font-bold text-xl text-gray-800 mb-3">
                  Seamless Scheduling
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  Easy booking system with flexible timing options for students
                </p>
              </div>
            </div>

            {/* Location Matching Card */}
            <div className="w-[280px] h-[320px] bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl flex flex-col justify-center items-center gap-6 px-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-100">
              <div className="w-[110px] h-[110px] bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex justify-center items-center shadow-lg relative">
                <div className="absolute inset-2 bg-white rounded-full opacity-20"></div>
                <div className="w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-purple-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <h1 className="font-bold text-xl text-gray-800 mb-3">
                  Location Matching
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  Connect with nearby tutors or enjoy online sessions worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
