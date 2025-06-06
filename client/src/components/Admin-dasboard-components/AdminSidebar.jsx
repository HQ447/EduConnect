import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/authUtils";
import {
  Home,
  FolderOpen,
  Users,
  GraduationCap,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  User,
  ChevronRight,
} from "lucide-react";

function AdminSidebar() {
  const [profile, setprofile] = useState("");
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
        // Clear user data only
        // localStorage.removeItem("studentToken");
        // localStorage.removeItem("studentId");
        // localStorage.removeItem("studentName");
        handleLogout();
        expired = true;
        setImgPreview(null);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(
        `${domain}/tutor/getAdmin/${localStorage.getItem("adminId")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        const admin = data.admin;
        setprofile(admin);

        if (admin.img) {
          setImgPreview(admin.img);
        }
      } else {
        console.log("error in fetching admin profile");
      }
    } catch (error) {
      console.error("Error loading admin profile", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const menuItems = [
    { to: "", icon: Home, label: "Dashboard", color: "text-blue-600" },
    {
      to: "cat-management",
      icon: FolderOpen,
      label: "Categories",
      color: "text-purple-600",
    },
    {
      to: "student-management",
      icon: Users,
      label: "Students",
      color: "text-green-600",
    },
    {
      to: "teacher-management",
      icon: GraduationCap,
      label: "Teachers",
      color: "text-orange-600",
    },

    {
      to: "admin-notification",
      icon: Bell,
      label: "Notifications",
      color: "text-yellow-600",
    },
    {
      to: "admin-settings",
      icon: Settings,
      label: "Settings",
      color: "text-gray-600",
    },
  ];

  return (
    <div className="w-[22%]  max-h-screen  flex flex-col bg-white shadow-2xl h-screen border-r border-gray-100 relative">
      {/* Profile Section */}
      <div className="flex px-6 py-6 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="relative flex-shrink-0">
            {imgPreview ? (
              <img
                src={imgPreview}
                alt="Student Image"
                className="w-14 h-14 rounded-full object-cover ring-3 ring-blue-100 shadow-lg"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shadow-lg ring-3 ring-gray-100">
                <User className="w-7 h-7 text-white" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-3 border-white shadow-sm"></div>
          </div>
          <div className=" min-w-0">
            <h3 className="text-gray-900 font-bold text-sm truncate uppercase tracking-wide">
              {profile.adminName || "Administrator"}
            </h3>
            <p className="text-gray-500 text-xs truncate mt-1">
              {profile.email || "admin@system.com"}
            </p>
            <div className="flex items-center mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-xs text-gray-400 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-2 mt-3 px-5">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center rounded-xl justify-between px-4 py-1  text-xs font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r  from-blue-600 to-blue-700 text-blue-700 shadow-lg text-white border border-blue-200 transform"
                  : " hover:bg-gray-50 hover:text-gray-900 hover:shadow-md"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isActive
                        ? "bg-white shadow-sm"
                        : "bg-gray-100 group-hover:bg-white"
                    } transition-all duration-200`}
                  >
                    <item.icon
                      className={`w-4 h-4 ${
                        isActive
                          ? item.color
                          : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    />
                  </div>
                  <span className="font-medium tracking-wide">
                    {item.label}
                  </span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-all duration-200 ${
                    isActive
                      ? "text-blue-400 transform rotate-90"
                      : "text-gray-300 group-hover:text-gray-500"
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout Section */}
      <div className="px-4 pb-2 absolute w-full bottom-1 border-t border-gray-100 bg-gradient-to-t from-gray-25 to-white">
        <button
          onClick={handleLogout}
          className="w-full group flex items-center justify-center space-x-3 bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white rounded-xl py-3.5 px-4 text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 transform hover:scale-105"
        >
          <LogOut className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12" />
          <span className="tracking-wide">Sign Out</span>
        </button>

        {/* Footer Info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">© 2025 EduConnect</p>
          <p className="text-xs text-gray-300 mt-1">v2.1.0</p>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
