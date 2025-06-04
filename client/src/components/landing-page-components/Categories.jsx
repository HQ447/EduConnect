import React from "react";

function Categories() {
  return (
    <div>
      <div className="w-full h-auto flex flex-col items-center gap-12 py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-20 translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full opacity-20 -translate-x-24 translate-y-24"></div>
        <div className="absolute top-1/3 left-1/5 w-8 h-8 bg-blue-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-indigo-200 rounded-full opacity-40"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold py-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Popular Categories
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover our most sought-after subjects and connect with expert
            tutors
          </p>
        </div>

        <div className="h-auto flex flex-1 flex-wrap justify-center items-center gap-8 relative z-10">
          {/* Placeholder cards with enhanced design */}
          <div className="flex flex-col items-center shadow-xl hover:shadow-2xl transition-all duration-300 gap-6 w-[380px] rounded-3xl px-8 h-[420px] py-8 bg-white border border-gray-100 hover:-translate-y-3 group overflow-hidden relative">
            {/* Card background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 w-full">
              <div className="rounded-2xl w-full h-52 bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-10"></div>
                <div className="text-white text-6xl font-bold opacity-80">
                  📚
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold py-4 text-gray-800 group-hover:text-indigo-600 transition-colors">
                Mathematics
              </h1>
              <p className="text-center text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                Master mathematical concepts from basic arithmetic to advanced
                calculus with our expert tutors
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center shadow-xl hover:shadow-2xl transition-all duration-300 gap-6 w-[380px] rounded-3xl px-8 h-[420px] py-8 bg-white border border-gray-100 hover:-translate-y-3 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-transparent to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 w-full">
              <div className="rounded-2xl w-full h-52 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-10"></div>
                <div className="text-white text-6xl font-bold opacity-80">
                  🧪
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold py-4 text-gray-800 group-hover:text-emerald-600 transition-colors">
                Science
              </h1>
              <p className="text-center text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                Explore the wonders of physics, chemistry, and biology with
                hands-on learning experiences
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center shadow-xl hover:shadow-2xl transition-all duration-300 gap-6 w-[380px] rounded-3xl px-8 h-[420px] py-8 bg-white border border-gray-100 hover:-translate-y-3 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-transparent to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 w-full">
              <div className="rounded-2xl w-full h-52 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-10"></div>
                <div className="text-white text-6xl font-bold opacity-80">
                  📖
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold py-4 text-gray-800 group-hover:text-purple-600 transition-colors">
                Language Arts
              </h1>
              <p className="text-center text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                Improve reading comprehension, writing skills, and communication
                abilities
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center shadow-xl hover:shadow-2xl transition-all duration-300 gap-6 w-[380px] rounded-3xl px-8 h-[420px] py-8 bg-white border border-gray-100 hover:-translate-y-3 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 w-full">
              <div className="rounded-2xl w-full h-52 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-10"></div>
                <div className="text-white text-6xl font-bold opacity-80">
                  🌍
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold py-4 text-gray-800 group-hover:text-orange-600 transition-colors">
                History
              </h1>
              <p className="text-center text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                Journey through time and understand the events that shaped our
                world
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center shadow-xl hover:shadow-2xl transition-all duration-300 gap-6 w-[380px] rounded-3xl px-8 h-[420px] py-8 bg-white border border-gray-100 hover:-translate-y-3 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-transparent to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 w-full">
              <div className="rounded-2xl w-full h-52 bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-10"></div>
                <div className="text-white text-6xl font-bold opacity-80">
                  💻
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold py-4 text-gray-800 group-hover:text-teal-600 transition-colors">
                Computer Science
              </h1>
              <p className="text-center text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                Learn programming, web development, and digital literacy skills
                for the future
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center shadow-xl hover:shadow-2xl transition-all duration-300 gap-6 w-[380px] rounded-3xl px-8 h-[420px] py-8 bg-white border border-gray-100 hover:-translate-y-3 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-transparent to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 w-full">
              <div className="rounded-2xl w-full h-52 bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-10"></div>
                <div className="text-white text-6xl font-bold opacity-80">
                  🎨
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold py-4 text-gray-800 group-hover:text-yellow-600 transition-colors">
                Arts & Design
              </h1>
              <p className="text-center text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                Express creativity through visual arts, digital design, and
                creative thinking
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
