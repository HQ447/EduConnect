/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/authUtils";

function TeacherSidebar() {
  const [profile, setProfile] = useState({
    teacherName: "",
    email: "",
    contact: "",
    degree: "",
    experience: "",
    subject: "",
    location: "",
    register: false,
  });
  const [imgPreview, setImgPreview] = useState(null);
  const domain = "http://localhost:8000";
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear(); // remove all auth data
    navigate("/"); // redirect to login
  };

  useEffect(() => {
    const checkTokenExpiry = () => {
      const studentToken = localStorage.getItem("studentToken");
      const adminToken = localStorage.getItem("adminToken");
      const teacherToken = localStorage.getItem("teacherToken");

      let expired = false;

      if (studentToken && isTokenExpired(studentToken)) {
        handleLogout();
        expired = true;
      }

      if (adminToken && isTokenExpired(adminToken)) {
        handleLogout();
        expired = true;
      }

      if (teacherToken && isTokenExpired(teacherToken)) {
        handleLogout();
        expired = true;
      }

      if (expired) {
        handleLogout();
        navigate("/");
      }
    };

    const interval = setInterval(checkTokenExpiry, 5000); // check every 5 seconds

    return () => clearInterval(interval);
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(
        `${domain}/tutor/getTeacher/${localStorage.getItem("teacherId")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("teacherToken")}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        const teacher = data.teacher;
        setProfile({
          teacherName: teacher.teacherName || "",
          email: teacher.email || "",
          location: teacher.location || "",
          subject: teacher.subject || "",
          contact: teacher.contact || "",
          degree: teacher.degree || "",
          experience: teacher.experience || "",
          register: teacher.register || false,
        });

        if (teacher.img) {
          setImgPreview(`${domain}/${teacher.img}`);
        }
      } else {
        console.log("error in fetching teacher profile");
      }
    } catch (error) {
      console.error("Error loading teacher profile", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="w-[22%] relative h-screen overflow-y-auto   shadow-xl ">
      {/* Profile Section */}
      <div className="px-3 py-3 pb-6">
        <div className="bg-gradient-to-br    ">
          <div className="text-center">
            <div className="relative inline-block">
              <img
                src={imgPreview || "../profile.png"}
                alt="Teacher Image"
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full  border-slate-800"></div>
            </div>

            <h3 className="font-bold text-xl   truncate">
              {profile.teacherName || "Teacher Name"}
            </h3>
            <p className="text-slate-400 text-sm  truncate">{profile.email}</p>

            {profile.register && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-emerald-400 text-xs font-semibold">
                  Verified Teacher
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="px-6 py-3 pb-13 flex-1 text-sm">
        <nav className="space-y-2">
          <NavLink
            to=""
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`
            }
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="font-medium">Dashboard</span>
            </div>
          </NavLink>

          <NavLink
            to="profile"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`
            }
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="font-medium">Profile Overview</span>
            </div>
          </NavLink>

          <NavLink
            to="chatSystem"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`
            }
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="font-medium">Messages</span>
              <div className="ml-auto">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </NavLink>

          <NavLink
            to="notification"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`
            }
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5V9a7 7 0 10-14 0v8"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 17h8m0 0V9a7 7 0 10-14 0v8a1 1 0 001 1h3"
                />
              </svg>
              <span className="font-medium">Notifications</span>
            </div>
          </NavLink>
          <NavLink
            to="feedbacks"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`
            }
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5V9a7 7 0 10-14 0v8"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 17h8m0 0V9a7 7 0 10-14 0v8a1 1 0 001 1h3"
                />
              </svg>
              <span className="font-medium">Feedback</span>
            </div>
          </NavLink>

          <NavLink
            to="settings"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`
            }
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="font-medium">Settings</span>
            </div>
          </NavLink>
        </nav>
      </div>

      {/* Logout Section */}
      <div className="px-6 pb-8 absolute bottom-0 w-full">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-red-600/25 group"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}

export default TeacherSidebar;
