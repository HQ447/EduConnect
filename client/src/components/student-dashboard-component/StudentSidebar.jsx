import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/authUtils";

function StudentSidebar() {
  const navigate = useNavigate();
  const [profile, setprofile] = useState("");
  const [imgPreview, setImgPreview] = useState(null);
  const domain = "http://localhost:8000";

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
        setImgPreview(null);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(
        `${domain}/tutor/getStudent/${localStorage.getItem("studentId")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("studentToken")}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        const student = data.student;
        setprofile(student);

        if (student.img) {
          setImgPreview(student.img);
        }
      } else {
        console.log("error in fetching student profile");
      }
    } catch (error) {
      console.error("Error loading student profile", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const menuItems = [
    { to: "", label: "Category", icon: "📚" },
    { to: "nearby", label: "Nearby Teachers", icon: "📍" },
    { to: "saved-teacher", label: "Saved Teachers", icon: "⭐" },
    { to: "studentChatSystem", label: "Messages", icon: "💬" },
    { to: "student-notification", label: "Notifications", icon: "🔔" },
    { to: "student-settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="w-[22%] flex flex-col bg-white shadow-lg h-screen border-r border-gray-100">
      {/* Header */}
      {/* <div className="px-6 py-2 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-blue-600">📖</div>
          <h2 className="text-xl font-bold text-gray-800">EduConnect</h2>
        </div>
      </div> */}

      {/* Profile Section */}
      <div className="pt-7 pb-5 ">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-2">
            <img
              src={imgPreview || "./profile.png"}
              alt="Student Profile"
              className="w-20 h-20 rounded-full object-cover border-3 border-blue-100 shadow-md"
            />
            <div className="absolute bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 capitalize">
            {profile.studentName || "Student"}
          </h3>
          <p className="text-xs text-gray-400 truncate max-w-full">
            {profile.email || "student@educonnect.com"}
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4  overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-r-3 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="px-4 py-2 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 px-4 text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default StudentSidebar;
