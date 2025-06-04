import React from "react";

function Home() {
  return (
    <div>
      <div className="flex pt-12 pb-16 min-h-screen items-center px-4 relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-indigo-900/10"></div>

        {/* Floating Elements with Animation - Reduced sizes */}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 right-24 rounded-full absolute top-24 shadow-xl animate-pulse opacity-80"></div>
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full absolute top-28 left-80 shadow-lg animate-bounce opacity-90"></div>
        <div className="w-6 h-6 rounded-full border-orange-500 border-2 bg-transparent absolute right-28 top-48 shadow-md animate-spin"></div>
        <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded-full absolute top-40 left-96 shadow-lg animate-pulse opacity-85"></div>

        {/* Additional decorative elements - Smaller */}
        <div className="w-4 h-4 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full absolute top-16 left-72 shadow-sm animate-bounce delay-1000"></div>
        <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full absolute bottom-24 right-48 shadow-md animate-pulse delay-500"></div>
        <div className="w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full absolute top-64 left-24 shadow-sm animate-ping"></div>

        {/* Content Section */}
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 relative z-10">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start space-y-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold leading-tight">
                  <span className="text-white">Find Qualified </span>
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                    Teachers
                  </span>
                </h1>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  for Every Subject
                </h1>
              </div>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
                Easily connect with expert educators for personalized learning
                solutions tailored to your needs
              </p>

              {/* Enhanced Search Section - More compact */}
              <div className="mt-8 w-full max-w-xl">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur opacity-20"></div>
                  <div className="relative flex items-center bg-white/95 backdrop-blur-md rounded-full shadow-xl border border-white/20 overflow-hidden">
                    <div className="flex-1 flex items-center">
                      <div className="pl-4 pr-3">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <input
                        className="flex-1 py-3 pr-3 text-base text-gray-700 placeholder-gray-500 bg-transparent outline-none"
                        type="text"
                        placeholder="Search for subjects, topics, or tutors..."
                      />
                    </div>
                    <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 shadow-lg">
                      Search
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats or Features - More compact */}
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-sm">1k+</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      Expert Tutors
                    </p>
                    <p className="text-gray-400 text-xs">
                      Verified & Qualified
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-sm">50+</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Subjects</p>
                    <p className="text-gray-400 text-xs">
                      All Levels Available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image/Illustration - Smaller */}
          <div className="w-full lg:w-1/2 flex justify-center items-center relative">
            <div className="relative w-full max-w-md">
              {/* Placeholder for main image with modern design - Reduced height */}
              <div className="w-full h-80 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 rounded-2xl shadow-xl flex items-center justify-center relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-600/20"></div>

                {/* Central illustration placeholder */}
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto flex items-center justify-center shadow-xl">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-gray-700">
                      Interactive Learning
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Connect with qualified educators worldwide
                    </p>
                  </div>
                </div>

                {/* Floating academic icons - Smaller */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-white/80 rounded-xl shadow-md flex items-center justify-center">
                  <span className="text-lg">📚</span>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/80 rounded-xl shadow-md flex items-center justify-center">
                  <span className="text-lg">🎓</span>
                </div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/80 rounded-xl shadow-md flex items-center justify-center">
                  <span className="text-lg">💡</span>
                </div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/80 rounded-xl shadow-md flex items-center justify-center">
                  <span className="text-lg">🔬</span>
                </div>
              </div>

              {/* Floating cards around the main image - Smaller */}
              <div className="absolute -top-3 -left-3 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">
                      Verified Tutors
                    </p>
                    <p className="text-xs text-gray-500">Background Checked</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-3 -right-3 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">24/7</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">
                      Available
                    </p>
                    <p className="text-xs text-gray-500">Learn Anytime</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
