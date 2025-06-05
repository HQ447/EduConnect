/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";
import { isTokenExpired } from "../../utils/authUtils";

function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null); // can be "student", "teacher", "admin"

  useEffect(() => {
    if (localStorage.getItem("studentToken")) setRole("student");
    else if (localStorage.getItem("teacherToken")) setRole("teacher");
    else if (localStorage.getItem("adminToken")) setRole("admin");
    else setRole(null);
  }, []);

  useEffect(() => {
    const checkTokenExpiry = () => {
      const studentToken = localStorage.getItem("studentToken");
      const adminToken = localStorage.getItem("adminToken");
      const teacherToken = localStorage.getItem("teacherToken");

      let expired = false;

      if (studentToken && isTokenExpired(studentToken)) {
        // Clear user data only
        // localStorage.removeItem("studentToken");
        // localStorage.removeItem("studentId");
        // localStorage.removeItem("studentName");
        handleLogout();
        expired = true;
        //setImgPreview(null);
      }

      if (adminToken && isTokenExpired(adminToken)) {
        // Clear admin data only
        // localStorage.removeItem("adminToken");
        // localStorage.removeItem("adminId");
        // localStorage.removeItem("adminName");

        handleLogout();
        expired = true;
      }

      if (teacherToken && isTokenExpired(teacherToken)) {
        // Clear staff data only
        // localStorage.removeItem("teacherToken");
        // localStorage.removeItem("teacherId");
        // localStorage.removeItem("teacherName");

        handleLogout();
        expired = true;
      }

      if (expired) {
        // localStorage.getItem("studentId"),
        //   localStorage.getItem("studentName"),
        //   localStorage.getItem("adminId"),
        //   localStorage.getItem("adminName"),
        //   localStorage.getItem("teacherId"),
        //   localStorage.getItem("teacherName"),
        handleLogout();
        // Redirect user to product or login page as you prefer
        navigate("/");
      }
    };

    const interval = setInterval(checkTokenExpiry, 5000); // check every 5 seconds

    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear(); // remove all auth data
    setRole(null); // trigger re-render
    navigate("/"); // redirect to login
  };

  return (
    <div>
      <nav className="flex relative top-0 w-full bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 backdrop-blur-md justify-between items-center px-8 md:px-14 py-4 shadow-2xl border-b border-gray-700/30">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <div className="text-2xl md:text-3xl text-white font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text ">
            EduConnect
          </div>
        </div>

        {/* Navigation Menu */}
        <ul className="hidden lg:flex items-center gap-8 text-white text-sm font-medium">
          {/* Decorative Element */}

          <li className="hover:text-emerald-400 transition-all duration-300 hover:scale-105 cursor-pointer">
            <a href="#Home" className="relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li className="hover:text-emerald-400 transition-all duration-300 hover:scale-105 cursor-pointer">
            <a href="#About" className="relative group">
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li className="hover:text-emerald-400 transition-all duration-300 hover:scale-105 cursor-pointer">
            <a href="#Features" className="relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li className="hover:text-emerald-400 transition-all duration-300 hover:scale-105 cursor-pointer">
            <a href="#Top" className="relative group">
              Top Picks
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li className="hover:text-emerald-400 transition-all duration-300 hover:scale-105 cursor-pointer">
            <a href="#Contact" className="relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        </ul>
        <div>
          {/* User Profile Sections */}
          {role === "student" && (
            <div className="flex gap-3 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-md rounded-xl h-14 items-center justify-center px-4 border border-blue-400/20 shadow-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md">
                <span className="text-white font-semibold text-sm">
                  {localStorage.getItem("studentName")?.charAt(0) || "S"}
                </span>
              </div>
              <span className="text-white font-medium text-sm">
                {localStorage.getItem("studentName")}
              </span>
              <button
                onClick={() => navigate("/student-dashboard")}
                className="bg-gradient-to-r from-white to-gray-100 rounded-lg text-gray-800 px-4 py-2 text-sm font-medium hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Dashboard
              </button>
              <ImExit
                className="text-xl text-red-400 hover:text-red-300 cursor-pointer hover:scale-110 transition-all duration-300"
                onClick={handleLogout}
              />
            </div>
          )}

          {role === "teacher" && (
            <div className="flex gap-3 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-md rounded-xl h-14 items-center justify-center px-4 border border-emerald-400/20 shadow-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md">
                <span className="text-white font-semibold text-sm">
                  {localStorage.getItem("teacherName")?.charAt(0) || "T"}
                </span>
              </div>
              <span className="text-white font-medium text-sm">
                {localStorage.getItem("teacherName")}
              </span>
              <button
                onClick={() => navigate("/teacher-dashboard")}
                className="bg-gradient-to-r from-white to-gray-100 rounded-lg text-gray-800 px-4 py-2 text-sm font-medium hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Dashboard
              </button>
              <ImExit
                className="text-xl text-red-400 hover:text-red-300 cursor-pointer hover:scale-110 transition-all duration-300"
                onClick={handleLogout}
              />
            </div>
          )}

          {role === "admin" && (
            <div className="flex gap-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-xl h-14 items-center justify-center px-4 border border-purple-400/20 shadow-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-md">
                <span className="text-white font-semibold text-sm">
                  {localStorage.getItem("adminName")?.charAt(0) || "A"}
                </span>
              </div>
              <span className="text-white font-medium text-sm">
                {localStorage.getItem("adminName")}
              </span>
              <button
                onClick={() => navigate("/admin-dashboard")}
                className="bg-gradient-to-r from-white to-gray-100 rounded-lg text-gray-800 px-4 py-2 text-sm font-medium hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Dashboard
              </button>
              <ImExit
                className="text-xl text-red-400 hover:text-red-300 cursor-pointer hover:scale-110 transition-all duration-300"
                onClick={handleLogout}
              />
            </div>
          )}

          {!role && (
            <div className="flex gap-3 items-center">
              <button className="text-blue-400  border-blue-400 hover:border-blue-300 px-4 border py-2 rounded-sm font-medium text-sm hover:bg-blue-400/10 transition-all duration-300 hover:scale-105 shadow-md">
                <NavLink to="/login">Login</NavLink>
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-4 py-2  rounded-sm font-medium text-sm text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                <NavLink to="/register">Sign Up</NavLink>
              </button>
            </div>
          )}
        </div>
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button className="text-white hover:text-blue-400 transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
